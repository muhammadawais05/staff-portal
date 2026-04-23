import { gql, useQuery } from '@staff-portal/data-layer-service'
import {
  MEETING_FRAGMENT,
  MEETING_PENDING_JOBS_FRAGMENT
} from '@staff-portal/meetings'

import {
  GetMeetingsListDocument,
  GetMeetingsListQueryVariables
} from './get-meetings-list.staff.gql.types'

export const GET_MEETINGS_LIST = gql`
  query GetMeetingsList(
    $pagination: OffsetPagination!
    $filter: MeetingFilter!
  ) {
    viewer {
      me {
        id
      }
      meetings(pagination: $pagination, filter: $filter) {
        totalCount
        nodes {
          ...MeetingFragment
          ...MeetingPendingJobsFragment
        }
      }
    }
  }

  ${MEETING_FRAGMENT}
  ${MEETING_PENDING_JOBS_FRAGMENT}
`

export const useGetMeetingsList = (
  variables: GetMeetingsListQueryVariables,
  skip?: boolean
) => {
  const { data, error, ...restOptions } = useQuery(GetMeetingsListDocument, {
    variables,
    skip
  })

  const transformedData = data?.viewer.meetings

  if (error && !transformedData) {
    throw error
  }

  return { data: transformedData, error, ...restOptions }
}
