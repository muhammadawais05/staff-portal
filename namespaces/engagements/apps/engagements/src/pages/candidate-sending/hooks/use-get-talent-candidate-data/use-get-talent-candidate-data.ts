import { useQuery } from '@staff-portal/data-layer-service'

import { GetTalentCandidateDataDocument } from '../../data/get-talent-candidate-data'

const useGetTalentCandidateData = ({
  talentId,
  skip
}: {
  talentId: string | null
  skip: boolean
}) => {
  const { data, loading, ...restOptions } = useQuery(
    GetTalentCandidateDataDocument,
    {
      variables: { talentId },
      skip,
      fetchPolicy: 'cache-first'
    }
  )

  return {
    talentData: data?.staffNode,
    talentDataLoading: loading,
    ...restOptions
  }
}

export default useGetTalentCandidateData
