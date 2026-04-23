import { gql, useGetData, BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetNumberOfActiveJobsDocument } from './get-number-of-active-jobs.staff.gql.types'
import { SUMMARY_SIDEBAR_BATCH_KEY } from '../../config'

export const GET_NUMBER_OF_ACTIVE_JOBS = gql`
  query GetNumberOfActiveJobs($companyClaimer: SearchableNoneMeId!) {
    jobs(
      filter: { cumulativeStatuses: [ACTIVE], companyClaimer: $companyClaimer }
      pagination: { offset: 0, limit: 0 }
    ) {
      totalCount
    }
  }
`

export const useGetNumberOfActiveJobs = (companyClaimer?: string) =>
  useGetData(GetNumberOfActiveJobsDocument, 'jobs')(
    { companyClaimer: companyClaimer as string },
    {
      throwOnError: true,
      skip: !companyClaimer,
      context: { [BATCH_KEY]: SUMMARY_SIDEBAR_BATCH_KEY }
    }
  )
