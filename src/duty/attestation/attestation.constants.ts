// from https://eth2book.info/bellatrix/part2/incentives/rewards/
// and modified for Over Protocol.
// See https://github.com/overprotocol/chronos/blob/0414ea20f92807b810b1ca980c14985ac5cf6960/config/params/mainnet_config.go#L215-L221
const LIGHT_LAYER_WEIGHT = 8;
export const TIMELY_SOURCE_WEIGHT = 12; // Ws
export const TIMELY_TARGET_WEIGHT = 24; // Wt
export const TIMELY_HEAD_WEIGHT = 12 + LIGHT_LAYER_WEIGHT; // Wh
const WEIGHT_DENOMINATOR = 64; // W sigma

const timelySource = (attIncDelay: number, attValidSource: boolean): boolean => {
  return attValidSource && attIncDelay <= 5;
};

const timelyTarget = (attValidSource: boolean, attValidTarget: boolean): boolean => {
  return attValidSource && attValidTarget;
};

const timelyHead = (attIncDelay: number, attValidSource: boolean, attValidTarget: boolean, attValidHead: boolean): boolean => {
  return attValidSource && attValidTarget && attValidHead && attIncDelay === 1;
};

export const getFlags = (attIncDelay: number, attValidSource: boolean, attValidTarget: boolean, attValidHead: boolean) => {
  return {
    source: timelySource(attIncDelay, attValidSource),
    target: timelyTarget(attValidSource, attValidTarget),
    head: timelyHead(attIncDelay, attValidSource, attValidTarget, attValidHead),
  };
};

// Rewards
export const getRewards = (flags: {
  source: boolean;
  target: boolean;
  head: boolean;
}): { source: number; target: number; head: number } => {
  return {
    source: flags.source ? TIMELY_SOURCE_WEIGHT / WEIGHT_DENOMINATOR : 0,
    target: flags.target ? TIMELY_TARGET_WEIGHT / WEIGHT_DENOMINATOR : 0,
    head: flags.head ? TIMELY_HEAD_WEIGHT / WEIGHT_DENOMINATOR : 0,
  };
};

// Penalties
export const getPenalties = (flags: {
  source: boolean;
  target: boolean;
  head: boolean;
}): { source: number; target: number; head: number } => {
  return {
    source: flags.source ? 0 : TIMELY_SOURCE_WEIGHT / WEIGHT_DENOMINATOR,
    target: flags.target ? 0 : TIMELY_TARGET_WEIGHT / WEIGHT_DENOMINATOR,
    head: 0,
  };
};
