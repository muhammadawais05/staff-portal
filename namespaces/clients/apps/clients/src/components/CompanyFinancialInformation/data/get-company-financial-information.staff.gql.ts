import { gql } from '@staff-portal/data-layer-service'

import { COMPANY_FINANCIAL_INFORMATION_FRAGMENT } from './company-financial-information-fragment.staff.gql'

export default gql`
  query GetCompanyFinancialInformation($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        ...CompanyFinancialInformationFragment
      }
    }
  }

  ${COMPANY_FINANCIAL_INFORMATION_FRAGMENT}
`
