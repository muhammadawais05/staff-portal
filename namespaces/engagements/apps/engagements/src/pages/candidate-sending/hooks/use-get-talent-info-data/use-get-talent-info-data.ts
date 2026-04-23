import { useGetNode } from '@staff-portal/data-layer-service'

import { GetTalentInfoDataDocument } from '../../data/get-talent-info-data/get-talent-info-data.staff.gql.types'

export const useGetTalentInfoData = (talentId: string) => {
  const { data, loading } = useGetNode(GetTalentInfoDataDocument)(
    {
      talentId
    },
    { fetchPolicy: 'cache-first' }
  )

  return {
    talent: data,
    loading
  }
}
