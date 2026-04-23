import { gql, useQuery } from '@staff-portal/data-layer-service'
import { QueryParams } from '@staff-portal/query-params-state'
import { OffsetPagination } from '@staff-portal/graphql/staff'
import { UserVerticalFragment } from '@staff-portal/verticals'

import { GetTalentApplicantsListDocument } from './get-talent-applicants-list.staff.gql.types'
import { createGqlFilterVariables } from '../../utils'

export default gql`
  query GetTalentApplicantsList(
    $filter: TalentApplicantsFilter
    $order: TalentApplicantsOrder!
    $pagination: OffsetPagination!
  ) {
    talentApplicants(filter: $filter, pagination: $pagination, order: $order) {
      nodes {
        id
      }
      totalCount
    }
  }
`

interface Props {
  filterValues: QueryParams
  pagination: OffsetPagination
  verticals?: UserVerticalFragment[]
  skip?: boolean
}

export const useGetTalentApplicantsList = ({
  filterValues,
  pagination,
  verticals,
  skip
}: Props) => {
  const variables = createGqlFilterVariables(
    filterValues,
    pagination,
    verticals
  )

  const { data, ...restOptions } = useQuery(GetTalentApplicantsListDocument, {
    variables,
    throwOnError: true,
    skip
  })

  return {
    ...restOptions,
    totalCount: data?.talentApplicants?.totalCount,
    talentApplicants: data?.talentApplicants?.nodes
  }
}
