import {
  gql,
  useQuery,
  isNetworkLoading
} from '@staff-portal/data-layer-service'

import { TALENT_WORKLOAD_FRAGMENT } from '../../../../data'
import { GetTalentWorkloadDocument } from './get-talent-workload.staff.gql.types'

export default gql`
  query GetTalentWorkload($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        ...TalentWorkloadFragment
      }
    }
  }

  ${TALENT_WORKLOAD_FRAGMENT}
`

export const useGetTalentWorkload = (talentId: string) => {
  const { data, loading, networkStatus, ...restOptions } = useQuery(
    GetTalentWorkloadDocument,
    { variables: { talentId } }
  )

  return {
    data: data?.node,
    loading,
    networkLoading: isNetworkLoading({ data, loading, networkStatus }),
    ...restOptions
  }
}
