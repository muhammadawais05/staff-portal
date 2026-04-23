import { ColorType } from '@toptal/picasso'
import { ReferredRoleStatusCategory } from '@staff-portal/graphql/staff'

export const DASHBOARD_GQL_BATCH_KEY = 'DASHBOARD_GQL_BATCH_KEY'

export const REFERRAL_STATUS_COLOR_MAPPING: Record<
  ReferredRoleStatusCategory,
  ColorType
> = {
  [ReferredRoleStatusCategory.ACTIVE]: 'green',
  [ReferredRoleStatusCategory.APPLIED]: 'yellow',
  [ReferredRoleStatusCategory.EVALUATING]: 'yellow',
  [ReferredRoleStatusCategory.NOT_GOOD]: 'black',
  [ReferredRoleStatusCategory.REJECTED]: 'red',
  [ReferredRoleStatusCategory.REMOVED]: 'grey',
  [ReferredRoleStatusCategory.SCREENING]: 'dark-grey',
  [ReferredRoleStatusCategory.UNKNOWN]: 'black'
}
