import { useMemo } from 'react'
import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import {
  SPECIALIST_ASSIGNMENT_FRAGMENT,
  TSS_TALENT_FRAGMENT
} from '@staff-portal/talents-screening-specialists'

import {
  GetTalentsWithScreeningSpecialistListDocument,
  GetTalentsWithScreeningSpecialistListQueryVariables
} from './get-talents-with-screening-specialist-list.staff.gql.types'

const TSS_TALENT_LIST_GQL_BATCH_KEY = 'TSS_TALENT_LIST_GQL_BATCH_KEY'

export const GET_TALENTS_WITH_SCREENING_SPECIALIST_LIST = gql`
  query GetTalentsWithScreeningSpecialistList(
    $filter: TalentFilter!
    $pagination: OffsetPagination!
    $order: TalentOrder!
  ) {
    talents(filter: $filter, pagination: $pagination, order: $order) {
      nodes {
        ...TssTalentFragment
        currentSpecialistAssignment {
          ...SpecialistAssignmentFragment
        }
      }
      totalCount
    }
  }
  ${TSS_TALENT_FRAGMENT}
  ${SPECIALIST_ASSIGNMENT_FRAGMENT}
`

export const useGetTalentsWithScreeningSpecialistList = (
  variables: GetTalentsWithScreeningSpecialistListQueryVariables,
  skip?: boolean
) => {
  const { data, error, loading, ...restOptions } = useQuery(
    GetTalentsWithScreeningSpecialistListDocument,
    {
      variables,
      skip,
      context: { [BATCH_KEY]: TSS_TALENT_LIST_GQL_BATCH_KEY },
      throwOnError: true
    }
  )

  const talentData = useMemo(() => {
    if (!data) {
      return
    }

    const { talents } = data

    return { talents: talents?.nodes, totalCount: talents?.totalCount }
  }, [data])

  return {
    talentData,
    loading,
    error,
    ...restOptions
  }
}
