import { APP_NAME } from 'app';

export const METRICS_URL = '/metrics';
export const METRICS_PREFIX = `${APP_NAME.replace(/[- ]/g, '_')}_`;

export const METRIC_BUILD_INFO = `build_info`;

export const METRIC_OUTGOING_EL_REQUESTS_DURATION_SECONDS = `outgoing_el_requests_duration_seconds`;
export const METRIC_OUTGOING_EL_REQUESTS_COUNT = `outgoing_el_requests_count`;
export const METRIC_OUTGOING_CL_REQUESTS_DURATION_SECONDS = `outgoing_cl_requests_duration_seconds`;
export const METRIC_OUTGOING_CL_REQUESTS_COUNT = `outgoing_cl_requests_count`;
export const METRIC_OUTGOING_KEYSAPI_REQUESTS_DURATION_SECONDS = `outgoing_keysapi_requests_duration_seconds`;
export const METRIC_OUTGOING_KEYSAPI_REQUESTS_COUNT = `outgoing_keysapi_requests_count`;
export const METRIC_TASK_DURATION_SECONDS = `task_duration_seconds`;
export const METRIC_TASK_RESULT_COUNT = `task_result_count`;
export const METRIC_DATA_ACTUALITY = `data_actuality`;

export const METRIC_USER_OPERATORS_IDENTIFIES = `user_operators_identifies`;
export const METRIC_VALIDATORS = `validators`;
export const METRIC_USER_VALIDATORS = `user_validators`;
export const METRIC_FETCH_INTERVAL = `fetch_interval`;
export const METRIC_VALIDATOR_BALANCES_DELTA = `validator_balances_delta`;
export const METRIC_OPERATOR_REAL_BALANCE_DELTA = `operator_real_balance_delta`;
export const METRIC_OPERATOR_CALCULATED_BALANCE_DELTA = `operator_calculated_balance_delta`;
export const METRIC_OPERATOR_CALCULATED_BALANCE_CALCULATION_ERROR = `operator_calculated_balance_calculation_error`;
export const METRIC_VALIDATOR_QUANTILE_001_BALANCES_DELTA = `validator_quantile_001_balances_delta`;
export const METRIC_VALIDATOR_COUNT_WITH_NEGATIVE_BALANCES_DELTA = `validator_count_with_negative_balances_delta`;
export const METRIC_OTHER_VALIDATOR_COUNT_PERFECT_ATTESTATION = `other_validator_count_perfect_attestation`;
export const METRIC_VALIDATOR_COUNT_PERFECT_ATTESTATION = `validator_count_perfect_attestation`;
export const METRIC_OTHER_VALIDATOR_COUNT_MISS_ATTESTATION = `other_validator_count_miss_attestation`;
export const METRIC_VALIDATOR_COUNT_MISS_ATTESTATION = `validator_count_miss_attestation`;
export const METRIC_OTHER_VALIDATOR_COUNT_INVALID_ATTESTATION = `other_validator_count_invalid_attestation`;
export const METRIC_VALIDATOR_COUNT_INVALID_ATTESTATION = `validator_count_invalid_attestation`;
export const METRIC_VALIDATOR_COUNT_MISS_ATTESTATION_LAST_N_EPOCH = `validator_count_miss_attestation_last_n_epoch`;
export const METRIC_VALIDATOR_COUNT_INVALID_ATTESTATION_LAST_N_EPOCH = `validator_count_invalid_attestation_last_n_epoch`;
export const METRIC_VALIDATOR_COUNT_HIGH_INC_DELAY_ATTESTATION_LAST_N_EPOCH = `validator_count_high_inc_delay_last_n_epoch`;
export const METRIC_VALIDATOR_COUNT_INVALID_ATTESTATION_PROPERTY_LAST_N_EPOCH = `validator_count_invalid_attestation_property_last_n_epoch`;
export const METRIC_HIGH_REWARD_VALIDATOR_COUNT_MISS_ATTESTATION_LAST_N_EPOCH = `high_reward_validator_count_miss_attestation_last_n_epoch`;
export const METRIC_OTHER_VALIDATOR_COUNT_GOOD_PROPOSE = `other_validator_count_good_propose`;
export const METRIC_VALIDATOR_COUNT_GOOD_PROPOSE = `validator_count_good_propose`;
export const METRIC_OTHER_VALIDATOR_COUNT_MISS_PROPOSE = `other_validator_count_miss_propose`;
export const METRIC_VALIDATOR_COUNT_MISS_PROPOSE = `validator_count_miss_propose`;
export const METRIC_HIGH_REWARD_VALIDATOR_COUNT_MISS_PROPOSE = `high_reward_validator_count_miss_propose`;
export const METRIC_EPOCH_NUMBER = `epoch_number`;
export const METRIC_TOTAL_BALANCE_24H_DIFFERENCE = `total_balance_24h_difference`;
export const METRIC_OPERATOR_BALANCE_24H_DIFFERENCE = `operator_balance_24h_difference`;
export const METRIC_AVG_CHAIN_REWARD = `avg_chain_reward`;
export const METRIC_OPERATOR_REWARD = `operator_reward`;
export const METRIC_AVG_CHAIN_MISSED_REWARD = `avg_chain_missed_reward`;
export const METRIC_OPERATOR_MISSED_REWARD = `operator_missed_reward`;
export const METRIC_AVG_CHAIN_PENALTY = `avg_chain_penalty`;
export const METRIC_OPERATOR_PENALTY = `operator_penalty`;
export const METRIC_OPERATOR_WITHDRAWALS_SUM = `operator_withdrawals_sum`;
export const METRIC_OTHER_CHAIN_WITHDRAWALS_SUM = `other_chain_withdrawals_sum`;
export const METRIC_OPERATOR_WITHDRAWALS_COUNT = `operator_withdrawals_count`;
export const METRIC_OTHER_CHAIN_WITHDRAWALS_COUNT = `other_chain_withdrawals_count`;

export const METRIC_CONTRACT_KEYS_TOTAL = `contract_keys_total`;
export const METRIC_STETH_BUFFERED_ETHER_TOTAL = `steth_buffered_ether_total`;
