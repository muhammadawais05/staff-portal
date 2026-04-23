import { useMemo } from 'react'
import { gql, ABORT_KEY } from '@staff-portal/data-layer-service'
import { useGetSearchList } from '@staff-portal/error-handling'
import { QueryParams } from '@staff-portal/query-params-state'
import { UserVerticalFragment } from '@staff-portal/verticals'

import { TALENT_LIST_ITEMS_ABORT_KEY } from '../../constants'
import { GetTalentsListDocument } from './get-talents-list.staff.gql.types'
import { createGqlFilterVariables } from '../../services/create-gql-filter-variables/create-gql-filter-variables'

export default gql`
  query GetTalentsList(
    $filter: TalentFilter!
    $pagination: OffsetPagination!
    $order: TalentOrder!
  ) {
    talents(filter: $filter, pagination: $pagination, order: $order) {
      nodes {
        id
      }
      totalCount
    }
  }
`

export const useGetTalentsList = ({
  filterValues,
  page,
  verticals,
  skip
}: {
  filterValues: QueryParams
  page: number
  verticals?: UserVerticalFragment[]
  skip?: boolean
}) => {
  const variables = createGqlFilterVariables(filterValues, {
    verticals,
    page
  })
  const { data, ...restOptions } = useGetSearchList(GetTalentsListDocument, {
    variables,
    context: { [ABORT_KEY]: TALENT_LIST_ITEMS_ABORT_KEY },
    skip
  })

  const talentsData = useMemo(() => {
    if (!data?.talents) {
      return
    }

    const { nodes, totalCount } = data.talents

    return {
      talents: nodes.map(({ id }) => ({ talentId: id })),
      totalCount
    }
  }, [data])

  return { data: talentsData, ...restOptions }
}
