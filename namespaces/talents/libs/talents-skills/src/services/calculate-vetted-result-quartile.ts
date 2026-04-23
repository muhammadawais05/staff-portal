import { VettedResultQuartiles } from '../types'

const calculateVettedResultQuartile = (
  value: number,
  threshold25: number,
  threshold75: number
) => {
  if (value >= threshold75) {
    return VettedResultQuartiles.Top25
  } else if (value >= threshold25) {
    return VettedResultQuartiles.Between25And75
  }

  return VettedResultQuartiles.Bottom25
}

export default calculateVettedResultQuartile
