import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  Link,
  Staff,
  TalentHealthStatus,
  TalentHealthStatusValue
} from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'

export const getTalentHealthStatusMock = (
  talentHealthStatus?: Partial<TalentHealthStatus> | null
): WithTypename<TalentHealthStatus> => ({
  comment: 'a',
  createdAt: '2022-03-11T02:10:29-05:00',
  healthStatus: TalentHealthStatusValue.NONE,
  performer: {
    id: encodeEntityId('123', 'Staff'),
    webResource: {
      text: 'Alexander Danilenko',
      url: 'https://staging.toptal.net/platform/staff/staff/100010',
      __typename: 'Link'
    } as Link,
    __typename: 'Staff',
    ...talentHealthStatus?.performer
  } as Staff,
  __typename: 'TalentHealthStatus'
})
