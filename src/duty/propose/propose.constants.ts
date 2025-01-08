// from https://eth2book.info/bellatrix/part2/incentives/rewards/

const LIGHT_LAYER_WEIGHT = 8;
export const PROPOSER_WEIGHT = 8; // Wp
export const WEIGHT_DENOMINATOR = 64; // W sigma

export const proposerAttPartReward = (
  r: number, // total rewards to the attesters in this block
) => {
  return r / (((WEIGHT_DENOMINATOR - PROPOSER_WEIGHT - LIGHT_LAYER_WEIGHT) * WEIGHT_DENOMINATOR) / PROPOSER_WEIGHT);
};
