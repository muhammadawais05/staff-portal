import { Client } from '@staff-portal/graphql/staff'

import { successMutationMock } from '~integration/mocks/mutations'
import { companiesSharedStubs } from '~integration/mocks/request-stubs/companies/shared-stubs'
import {
  getClientSocialMediaResponse,
  getCompanyFinancialInformationResponse,
  getInDepthCompanyResearchResponse,
  getPendoVisitorResponse,
  getClientCurrentEmployeeCountResponse,
  getClientRevenueRangeResponse,
  getClientFoundingYearResponse,
  getClientRevenueRangesResponse,
  getClientIndustryResponse,
  getClientIndustriesResponse
} from '~integration/mocks/responses'

export const updateWebAndSocialTabMocks = (client = {}) => {
  cy.stubGraphQLRequests({
    ...companiesSharedStubs(),
    GetClientCurrentEmployeeCount: getClientCurrentEmployeeCountResponse(),
    GetClientFoundingYear: getClientFoundingYearResponse(),
    GetClientIndustry: getClientIndustryResponse(),
    GetClientIndustries: getClientIndustriesResponse(),
    GetClientRevenueRange: getClientRevenueRangeResponse(),
    GetClientRevenueRanges: getClientRevenueRangesResponse(),
    GetClientSocialMedia: getClientSocialMediaResponse(client),
    GetCompanyFinancialInformation:
      getCompanyFinancialInformationResponse(client),
    GetInDepthCompanyResearch: getInDepthCompanyResearchResponse(client),
    GetPendoVisitor: getPendoVisitorResponse()
  })
}

export const updatePatchClientProfileMutation = (client: Partial<Client>) =>
  cy.stubGraphQLRequests({
    SetPatchClientProfile: {
      data: {
        patchClientProfile: successMutationMock({
          client: getInDepthCompanyResearchResponse(client).data.node
        })
      }
    }
  })
