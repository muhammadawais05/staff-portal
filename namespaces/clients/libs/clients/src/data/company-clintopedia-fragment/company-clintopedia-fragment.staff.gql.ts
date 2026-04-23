import { gql } from '@staff-portal/data-layer-service'

export const COMPANY_CLIENTOPEDIA_FRAGMENT = gql`
  fragment CompanyClientopediaFragment on Client {
    clientopedia {
      totalFundingAmount
      employeeCount
      foundingYear
      industries
      revenueRange
      revenue
      linkedinUrl {
        text
        url
      }
      zoominfoUrl {
        text
        url
      }
    }
  }
`
