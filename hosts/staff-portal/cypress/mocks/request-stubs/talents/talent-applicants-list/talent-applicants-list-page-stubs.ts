import { Talent } from '@staff-portal/graphql/staff'

import {
  getPendoVisitorResponse,
  getCountriesResponse,
  getChroniclesTokenResponse,
  getSearchChroniclesResponse,
  getModelDescriptionsResponse
} from '~integration/mocks/responses'
import { getTalentActivationDataResponse, getTalentApplicantItemResponse, getTalentScreeningDataResponse } from '~integration/mocks/responses/talents/applicant-list'
import { getTalentApplicantsListResponse } from '~integration/mocks/responses/talents/applicant-list/get-talent-applicants-list-response'
import {
  getClaimersResponse,
  getTalentTypesResponse,
  getFlagsResponse,
  getSourcersResponse,
  getTalentsListFilterOptionsResponse
} from '~integration/mocks/responses/talents/talent-list'

export const talentApplicantsPageStub = (talent?: Partial<Talent>) => ({
  GetTalentApplicantsList: getTalentApplicantsListResponse(),
  GetTalentApplicantItem: getTalentApplicantItemResponse(talent),
  GetPendoVisitor: getPendoVisitorResponse(),
  GetClaimers: getClaimersResponse(),
  GetCountries: getCountriesResponse(),
  GetTalentTypes: getTalentTypesResponse(),
  GetFlags: getFlagsResponse(),
  GetSourcers: getSourcersResponse(),
  GetTopscreenClients: {
    data: {
      topscreenClients: {
        nodes: [
          {
            name: 'Predovic-Wolff TP',
            id: 'VjEtVG9wc2NyZWVuQ2xpZW50LTE',
            __typename: 'TopscreenClient'
          }
        ],
        __typename: 'TopscreenClientConnection'
      }
    }
  },
  TouchCounter: {
    data: {
      touchCounter: {
        success: true,
        errors: [],
        __typename: 'TouchCounterPayload',
        counter: {
          name: 'callback_requests_unclaimed',
          total: 9,
          unread: 0,
          __typename: 'Counter'
        }
      }
    }
  },
  GetChroniclesToken: getChroniclesTokenResponse(),
  SearchChronicles: getSearchChroniclesResponse(),
  GetTalentsListFilterOptions: getTalentsListFilterOptionsResponse(),
  ModelDescriptions: getModelDescriptionsResponse(),
  GetTalentActivationData: getTalentActivationDataResponse(),
  GetTalentScreeningData: getTalentScreeningDataResponse()
})
