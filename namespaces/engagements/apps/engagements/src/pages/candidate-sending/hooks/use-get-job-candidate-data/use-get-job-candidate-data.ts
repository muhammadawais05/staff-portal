import { useQuery } from '@staff-portal/data-layer-service'

import { GetJobCandidateDataDocument } from '../../data/get-job-candidate-data'

const useGetJobCandidateData = ({
  jobId,
  skip
}: {
  jobId: string | null
  skip?: boolean
}) => {
  const { data, loading, ...restOptions } = useQuery(
    GetJobCandidateDataDocument,
    {
      variables: { jobId },
      skip,
      fetchPolicy: 'cache-first'
    }
  )

  return {
    jobData: data?.node,
    jobDataLoading: loading,
    ...restOptions
  }
}

export default useGetJobCandidateData
