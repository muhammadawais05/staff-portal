import { ColorType } from '@toptal/picasso'

import { VettedResultQuartileMapping, VettedResultQuartiles } from './types'

export const VettedResultQuartileDescription: VettedResultQuartileMapping<string> =
  {
    [VettedResultQuartiles.Top25]: 'Top 25%',
    [VettedResultQuartiles.Between25And75]: '25-75%',
    [VettedResultQuartiles.Bottom25]: 'Bottom 25%'
  }

export const VettedResultQuartileColor: VettedResultQuartileMapping<ColorType> =
  {
    [VettedResultQuartiles.Top25]: 'green',
    [VettedResultQuartiles.Between25And75]: 'yellow',
    [VettedResultQuartiles.Bottom25]: 'red'
  }
