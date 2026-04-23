import { gql } from '@staff-portal/data-layer-service'

export const COMPANY_BUYING_SIGNALS_FRAGMENT = gql`
  fragment CompanBuyingSignalsFragment on Client {
    buyingSignalsService {
      currentEmployeeCount
      foundingYear
      industry
      revenueRange
      stage
      totalFunding
      acquiredBy
      acquiredCompanies
      linkedin {
        text
        url
      }
      twitter {
        text
        url
      }
      facebook {
        text
        url
      }
      crunchbase {
        text
        url
      }
    }
  }
`
