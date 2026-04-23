import { getGetParentCompaniesResponse } from '../responses'
import { getJobListResponse, getJobListItemResponse, getJobListViewerPermitsResponse, getJobSkillTagPermissionsResponse } from '../responses/job'
import { getClaimersResponse, getTalentTypesResponse } from '../responses/talents/talent-list'

export const jobListPageStubs = () => ({
  GetJobList: () => getJobListResponse(),
  GetJobListItem: () => getJobListItemResponse(),
  GetJobListViewerPermits: () => getJobListViewerPermitsResponse(),
  GetJobSkillTagPermissions: () => getJobSkillTagPermissionsResponse(),
  GetTalentTypes: () => getTalentTypesResponse(),
  GetClaimers: () => getClaimersResponse(),
  GetParentCompanies: () => getGetParentCompaniesResponse()
})
