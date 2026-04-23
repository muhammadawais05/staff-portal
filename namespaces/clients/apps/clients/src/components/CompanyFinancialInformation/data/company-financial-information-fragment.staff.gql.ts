import { gql } from '@staff-portal/data-layer-service'
import {
  COMPANY_BUYING_SIGNALS_FRAGMENT,
  COMPANY_CLIENTOPEDIA_FRAGMENT
} from '@staff-portal/clients'

export const COMPANY_FINANCIAL_INFORMATION_FRAGMENT = gql`
  fragment CompanyFinancialInformationFragment on Client {
    id
    stage
    totalFunding
    acquiredBy
    acquiredCompanies
    ...CompanyClientopediaFragment
    ...CompanBuyingSignalsFragment
    operations {
      patchClientProfile {
        callable
        messages
      }
    }
  }

  ${COMPANY_CLIENTOPEDIA_FRAGMENT}
  ${COMPANY_BUYING_SIGNALS_FRAGMENT}
`
