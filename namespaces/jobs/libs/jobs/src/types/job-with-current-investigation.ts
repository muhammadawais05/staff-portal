import { Maybe } from '@staff-portal/graphql/staff'

import { CurrentInvestigation } from './current-investigation'

export type JobWithCurrentInvestigation = {
  currentInvestigation?: Maybe<CurrentInvestigation>
}
