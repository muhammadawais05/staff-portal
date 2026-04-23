export enum VettedResultQuartiles {
  Top25,
  Between25And75,
  Bottom25
}

export const VettedResultQuartileDescription = {
  [VettedResultQuartiles.Top25]: 'Top 25%',
  [VettedResultQuartiles.Between25And75]: '25-75%',
  [VettedResultQuartiles.Bottom25]: 'Bottom 25%'
}

export const VettedResultQuartileColor = {
  [VettedResultQuartiles.Top25]: 'green',
  [VettedResultQuartiles.Between25And75]: 'yellow',
  [VettedResultQuartiles.Bottom25]: 'red'
} as const
