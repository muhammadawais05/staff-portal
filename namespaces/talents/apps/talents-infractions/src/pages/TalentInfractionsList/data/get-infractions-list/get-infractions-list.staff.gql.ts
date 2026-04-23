import { useMemo } from 'react'
import { gql, useQuery } from '@staff-portal/data-layer-service'
import { TALENT_INFRACTION_FRAGMENT } from '@staff-portal/talents-infractions'

import {
  GetTalentInfractionsListDocument,
  GetTalentInfractionsListQueryVariables
} from './get-infractions-list.staff.gql.types'

export const GET_TALENT_INFRACTIONS_LIST = gql`
  query GetTalentInfractionsList(
    $filter: TalentInfractionFilter
    $order: TalentInfractionOrder!
    $pagination: OffsetPagination!
  ) {
    talentInfractions(filter: $filter, pagination: $pagination, order: $order) {
      nodes {
        ...TalentInfractionFragment
      }
      totalCount
    }
    viewer {
      permits {
        createTalentInfractions
      }
    }
  }

  ${TALENT_INFRACTION_FRAGMENT}
`

export const useGetTalentInfractionsList = (
  variables: GetTalentInfractionsListQueryVariables,
  skip?: boolean
) => {
  const { data, error, loading, ...restOptions } = useQuery(
    GetTalentInfractionsListDocument,
    { variables, skip, throwOnError: true }
  )

  const infractionsData = useMemo(() => {
    if (!data?.talentInfractions) {
      return
    }

    const { nodes, totalCount } = data.talentInfractions

    return { talentInfractions: nodes, totalCount }
  }, [data])
  const canCreateTalentInfractions =
    data?.viewer.permits.createTalentInfractions ?? false

  return {
    data: infractionsData,
    canCreateTalentInfractions,
    loading,
    error,
    ...restOptions
  }
}
