import { gql } from '@staff-portal/data-layer-service'
import {
  COMPANY_BUYING_SIGNALS_FRAGMENT,
  COMPANY_CLIENTOPEDIA_FRAGMENT
} from '@staff-portal/clients'

import { GET_CAREER_PAGES_FRAGMENT } from './get-career-pages-fragment.staff.gql'

export const GET_IN_DEPTH_COMPANY_RESEARCH_CLIENT = gql`
  fragment GetInDepthCompanyResearchClient on Client {
    id
    foundingYear
    industry
    revenueRange
    annualRevenue
    careerPages {
      ...CareerPagesFragment
    }
    employeeCountEstimation
    currentEmployeeCount
    secondaryIndustry
    businessModels
    giorgioEmployeeRange
    internalEmployeeCount
    ...CompanyClientopediaFragment
    ...CompanBuyingSignalsFragment
    operations {
      patchClientProfile {
        callable
        messages
      }
    }
  }

  ${GET_CAREER_PAGES_FRAGMENT}
  ${COMPANY_CLIENTOPEDIA_FRAGMENT}
  ${COMPANY_BUYING_SIGNALS_FRAGMENT}
`
