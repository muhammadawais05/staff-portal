import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { COMPANY_OVERVIEW_FRAGMENT } from './company-overview-fragment.staff.gql'
import { GetCompanyOverviewDataDocument } from './get-company-overview-data.staff.gql.types'

export default gql`
  query GetCompanyOverviewData($nodeId: ID!) {
    node(id: $nodeId) {
      ...CompanyOverviewFragment
    }
  }
  ${COMPANY_OVERVIEW_FRAGMENT}
`

export const useGetCompanyOverview = (nodeId: string) => {
  const { data: company, ...restOptions } = useGetNode(
    GetCompanyOverviewDataDocument
  )({ nodeId })

  return { ...restOptions, company }
}
