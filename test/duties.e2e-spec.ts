import * as process from 'process';

import { LoggerModule, nullTransport } from '@lido-nestjs/logger';
import { Test } from '@nestjs/testing';

import { ConfigModule } from 'common/config';
import { PrometheusModule } from 'common/prometheus/prometheus.module';
import { ClickhouseService } from 'storage';
import { RegistryModule, RegistryService } from 'validators-registry';

import { ValStatus } from '../src/common/consensus-provider';
import { allSettled } from '../src/common/functions/allSettled';
import { DutyModule, DutyService } from '../src/duty';

const testProposerMember = {
  index: 389499,
  pubkey: '0x88cb7b40e37964130a2c3b1b2a0a37658ca53bd914881244b836257132132f734613f0450fe59528baa0a3e10bd37dd7',
  registry_index: 0,
  operator_index: 1,
  operator_name: 'test2',
  performance_summary: {
    epoch: Number(process.env['TEST_EPOCH_NUMBER']),
    ///
    val_id: 389499,
    val_pubkey: '0x88cb7b40e37964130a2c3b1b2a0a37658ca53bd914881244b836257132132f734613f0450fe59528baa0a3e10bd37dd7',
    val_nos_module_id: 1,
    val_nos_id: 1,
    val_nos_name: 'test2',
    val_slashed: false,
    val_status: ValStatus.ActiveOngoing,
    val_balance: '32521190450',
    val_stuck: false,
    ///
    is_proposer: true,
    block_to_propose: 4895297,
    block_proposed: true,
    ///
    att_happened: true,
    att_inc_delay: 1,
    att_valid_head: false,
    att_valid_target: true,
    att_valid_source: true,
    // rewards
    att_earned_reward: 10673,
    att_missed_reward: 3590,
    att_penalty: 0,
    val_effective_balance: '32000000000',
    propose_earned_reward: '29021765',
    propose_missed_reward: '0',
    propose_penalty: '0',
  },
};

const testValidators = [testProposerMember];

describe('Duties', () => {
  jest.setTimeout(360 * 1000);

  let dutyService: DutyService;
  let validatorsRegistryService: RegistryService;
  let clickhouseService: ClickhouseService;

  let epochNumber, stateSlot;
  let summaryToSave = [];

  process.env['DB_HOST'] = 'http://localhost'; // stub to avoid lib validator
  const keysMap = new Map();
  const updateKeysRegistryMock = jest.fn().mockImplementation(async () => {
    testValidators.forEach((v) =>
      keysMap.set(v.pubkey, {
        index: v.registry_index,
        moduleIndex: 1,
        operatorIndex: v.operator_index,
        operatorName: v.operator_name,
        key: v.pubkey,
      }),
    );
  });
  const getOperatorKeyMock = jest.fn().mockImplementation((key: string) => {
    return keysMap.get(key);
  });
  jest.spyOn(ClickhouseService.prototype, 'writeSummary');

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        LoggerModule.forRoot({
          transports: [nullTransport()],
        }),
        ConfigModule,
        PrometheusModule,
        DutyModule,
        RegistryModule,
      ],
    }).compile();

    dutyService = moduleRef.get<DutyService>(DutyService);
    validatorsRegistryService = moduleRef.get<RegistryService>(RegistryService);
    clickhouseService = moduleRef.get<ClickhouseService>(ClickhouseService);
    validatorsRegistryService.updateKeysRegistry = updateKeysRegistryMock;
    validatorsRegistryService.getOperatorKey = getOperatorKeyMock;
    // stub writing to db
    Object.defineProperty(clickhouseService, 'db', {
      value: {
        insert: () => [],
        query: () => {
          return {
            json: () => [],
          };
        },
      },
    });

    stateSlot = Number(process.env['TEST_STATE_SLOT']);
    epochNumber = Number(process.env['TEST_EPOCH_NUMBER']);

    await allSettled([dutyService['prefetch'](epochNumber), dutyService['checkAll'](epochNumber, stateSlot)]);
    summaryToSave = [...dutyService['summary'].epoch(epochNumber).values()].map((v) => {
      return {
        ...v,
        val_balance: v.val_balance.toString(),
        val_effective_balance: v.val_effective_balance.toString(),
        propose_earned_reward: v.propose_earned_reward?.toString(),
        propose_missed_reward: v.propose_missed_reward?.toString(),
        propose_penalty: v.propose_penalty?.toString(),
      };
    });
    await dutyService['writeSummary'](epochNumber);
  });

  describe('should be processes validators info', () => {
    it('saving to summary table should be performed only once', () => {
      expect(clickhouseService.writeSummary).toBeCalledTimes(1);
    });

    it('summary content to save should contains right tested proposer validator performance info', () => {
      const toSaveTestedProposer = summaryToSave.find(
        (v) => v.val_id == testProposerMember.index && v.val_pubkey == testProposerMember.pubkey,
      );
      expect(toSaveTestedProposer).toBeDefined();
      expect(toSaveTestedProposer).toEqual(testProposerMember.performance_summary);
    });
  });
});
