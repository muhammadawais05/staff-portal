import { GET_NUMBER_OF_ACTIVE_JOBS } from './get-number-of-active-jobs.staff.gql'

export const createGetNumberOfActiveJobsMock = ({
  companyClaimer,
  totalCount
}: { companyClaimer?: string; totalCount?: number } = {}) => ({
  request: {
    query: GET_NUMBER_OF_ACTIVE_JOBS,
    variables: {
      companyClaimer
    }
  },
  result: {
    data: { jobs: { totalCount: totalCount || 0, __typename: 'TotalCount' } }
  }
})
