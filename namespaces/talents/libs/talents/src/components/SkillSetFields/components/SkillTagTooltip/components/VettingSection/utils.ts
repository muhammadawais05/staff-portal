import {
  VettedResultQuartiles,
  VettedResultQuartileColor,
  VettedResultQuartileDescription
} from './config'

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

export const calculateVettedResultQuartileInformation = (
  value: number,
  threshold25: number,
  threshold75: number
) => {
  const vettedResultQuartile = calculateVettedResultQuartile(
    value,
    threshold25,
    threshold75
  )

  return {
    color: VettedResultQuartileColor[vettedResultQuartile],
    description: VettedResultQuartileDescription[vettedResultQuartile]
  }
}
