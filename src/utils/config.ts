export let defaultGameIds: number[] = [1, 29, 6, 13];

export const LOTTERY_TYPES = {
  SSC: 'ssc',
  G11X5: '11x5',
  PK10: 'pk10',
  K3: 'k3',
  HC6: 'hc6'
}

export const lotteryTypes = [LOTTERY_TYPES.SSC, LOTTERY_TYPES.G11X5, LOTTERY_TYPES.PK10, LOTTERY_TYPES.K3, LOTTERY_TYPES.HC6];

export const gameTypes = [
  {type: LOTTERY_TYPES.SSC, name: '时时彩', s: false},
  {type: LOTTERY_TYPES.G11X5, name: '11选5', s: false},
  {type: LOTTERY_TYPES.PK10, name: 'PK10', s: false},
  {type: LOTTERY_TYPES.K3, name: 'K3', s: false},
  {type: LOTTERY_TYPES.HC6, name: '六合彩', s: false}
];
