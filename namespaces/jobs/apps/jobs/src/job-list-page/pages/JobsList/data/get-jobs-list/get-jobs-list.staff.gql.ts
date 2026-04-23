import { gql, useGetData } from '@staff-portal/data-layer-service'
import { QueryParams } from '@staff-portal/query-params-state'
import { UserVerticalFragment } from '@staff-portal/verticals'

import { GetJobListDocument } from './get-jobs-list.staff.gql.types'
import createGqlFilterVariables from '../../../../utils/create-gql-filter-variables'

export default gql`
  query GetJobList(
    $filter: JobFilter
    $order: JobOrder
    $pagination: OffsetPagination!
  ) {
    jobs(filter: $filter, pagination: $pagination, order: $order) {
      nodes {
        id
      }
      totalCount
    }
  }
`

export const useGetJobsList = ({
  filterValues,
  pagination,
  verticals,
  skip
}: {
  filterValues: QueryParams
  pagination: { offset: number; limit: number }
  verticals?: UserVerticalFragment[]
  skip?: boolean
}) => {
  const variables = createGqlFilterVariables(filterValues, {
    pagination,
    verticals
  })

  const { data, loading, ...restOptions } = useGetData(
    GetJobListDocument,
    'jobs'
  )(variables, { skip })

  return {
    ...restOptions,
    loading,
    data: data?.nodes,
    totalCount: data?.totalCount ?? 0
  }
}
