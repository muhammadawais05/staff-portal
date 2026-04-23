import { gql, useGetNode, BATCH_KEY } from '@staff-portal/data-layer-service'

import {
  GetJobFavoriteTalentsDocument,
  GetJobFavoriteTalentsQueryVariables
} from './get-job-favorite-talents.staff.gql.types'
import { JOB_FAVORITE_TALENTS_FRAGMENT } from './job-favorite-talents-fragment.staff.gql'
import { SUMMARY_SIDEBAR_BATCH_KEY } from '../../../config'

export const GET_JOB_FAVORITE_TALENTS = gql`
  query GetJobFavoriteTalents($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        ...JobFavoriteTalentsFragment
      }
    }
  }
  ${JOB_FAVORITE_TALENTS_FRAGMENT}
`

export const useGetJobFavoriteTalents = (
  variables: GetJobFavoriteTalentsQueryVariables
) => {
  const { data, ...restOptions } = useGetNode(GetJobFavoriteTalentsDocument)(
    variables,
    {
      throwOnError: true,
      fetchPolicy: 'cache-first',
      context: { [BATCH_KEY]: SUMMARY_SIDEBAR_BATCH_KEY }
    }
  )

  return { ...restOptions, data: data?.favoriteTalents?.nodes }
}
