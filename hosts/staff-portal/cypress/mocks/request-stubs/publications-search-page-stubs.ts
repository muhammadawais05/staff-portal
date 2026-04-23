import {
  getCandidateJobsResponse,
  getCandidateListItemResponse,
  getRequestForCandidateListResponse,
  getTalentsListResponse,
  createGigReachOutResponse,
  getServerTimezoneResponse,
  getOperationalIssuesCountResponse,
  getCandidateEmploymentsResponse,
  getCountriesResponse,
  getGigReachOutMessageMetaResponse
} from '../responses'
import {
  getTalentsListFilterOptionsResponse,
  getClaimersResponse,
  getTalentTypesResponse,
  getSourcersResponse,
  getFlagsResponse
} from '~integration/mocks/responses/talents/talent-list'

export const publicationsSearchPageStubs = ({
  candidateId,
  requestId,
  requestTitle,
  description
}: {
  candidateId: string
  requestId: string
  requestTitle: string
  description: string
}) => ({
  GetCandidateJobs: getCandidateJobsResponse(candidateId),
  GetCandidateListItem: getCandidateListItemResponse(candidateId),
  GetRequestForCandidateList: getRequestForCandidateListResponse(
    requestId,
    description,
    requestTitle
  ),
  GetTalentsListFilterOptions: getTalentsListFilterOptionsResponse(),
  GetTalentsList: getTalentsListResponse(candidateId),
  CreateGigReachOut: createGigReachOutResponse(),
  GetOperationalIssuesCount: getOperationalIssuesCountResponse(),
  GetCandidateEmployments: getCandidateEmploymentsResponse(),
  GetServerTimeZone: getServerTimezoneResponse(),
  GetClaimers: getClaimersResponse(),
  GetCountries: getCountriesResponse(),
  GetSourcers: getSourcersResponse(),
  GetFlags: getFlagsResponse(),
  GetTalentTypes: getTalentTypesResponse(),
  GetGigReachOutMessageMeta: getGigReachOutMessageMetaResponse()
})
