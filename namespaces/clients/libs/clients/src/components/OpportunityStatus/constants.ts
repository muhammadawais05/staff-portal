import { OpportunityStatus } from '@staff-portal/graphql/staff'
import { ColorType } from '@toptal/picasso'

export const OPPORTUNITIES_STATUS_COLOR_MAPPING: Record<
  OpportunityStatus,
  ColorType
> = {
  [OpportunityStatus.IDENTIFIED]: 'dark-grey',

  [OpportunityStatus.QUALIFYING]: 'yellow',
  [OpportunityStatus.SOLUTIONING]: 'yellow',
  [OpportunityStatus.CLOSING]: 'yellow',

  [OpportunityStatus.CLOSED_WON]: 'green',
  [OpportunityStatus.FULFILLMENT]: 'green',
  [OpportunityStatus.ENDED]: 'green',

  [OpportunityStatus.CLOSED_LOST]: 'red',
  [OpportunityStatus.WITHDRAWN]: 'red',

  [OpportunityStatus.PLANNING]: 'black',
  [OpportunityStatus.MAINTENANCE]: 'black',
  [OpportunityStatus.IMPLEMENTATION]: 'black'
}
