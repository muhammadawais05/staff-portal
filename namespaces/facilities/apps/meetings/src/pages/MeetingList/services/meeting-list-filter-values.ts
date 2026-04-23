import { MeetingPeriodEnum } from '@staff-portal/graphql/staff'

import { GetMeetingsListQueryVariables } from '../data/get-meetings-list'

export const toGqlVariables = (
  category: MeetingPeriodEnum,
  pagination: { offset: number; limit: number }
): GetMeetingsListQueryVariables => {
  return {
    filter: { periods: [category] },
    pagination
  }
}
