import { gql, useGetNode, ApolloError } from '@staff-portal/data-layer-service'

import { GetTalentsListJobFilterOptionsDocument } from './get-talents-list-job-filter-options.staff.gql.types'

export const GET_TALENTS_LIST_JOB_FILTER_OPTIONS = gql`
  query GetTalentsListJobFilterOptions($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        preferHoursOverlapping
        talentMaxHourlyRateLimit
        client {
          id
          enterprise
        }
      }
    }
  }
`
interface Props {
  jobId?: string
  onError?: (error: ApolloError) => void
}

export const useGetTalentsListJobFilterOptions = ({ jobId, onError }: Props) =>
  useGetNode(GetTalentsListJobFilterOptionsDocument)(
    { jobId: jobId as string },
    {
      skip: !jobId,
      onError,
      fetchPolicy: 'cache-first'
    }
  )
