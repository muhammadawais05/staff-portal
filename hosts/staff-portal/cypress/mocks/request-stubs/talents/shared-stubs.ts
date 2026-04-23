import { Talent } from '@staff-portal/graphql/staff'

import {
  getTalentResponse,
  getTalentTabsPermissionsResponse,
  getTalentHeaderDataResponse,
  getTalentStatusMessagesResponse,
  getTalentPossibleDuplicatesResponse,
  getTalentTabsCountersResponse,
  getTalentWebResourceResponse,
  getPendoVisitorResponse,
  getTalentUnfilledCallsResponse,
  getTalentViewerPermissionsResponse,
  getTalentResumeJobsResponse
} from '~integration/mocks/responses'

export const talentsSharedStubs = (talent?: Partial<Talent>) => ({
  GetTalentWebResource: getTalentWebResourceResponse(talent),
  GetTalent: getTalentResponse(talent),
  GetTalentTabsPermissions: getTalentTabsPermissionsResponse(talent),
  GetTalentTabsCounters: getTalentTabsCountersResponse(talent),
  GetTalentHeaderData: getTalentHeaderDataResponse(talent),
  GetNodeStatusMessages: getTalentStatusMessagesResponse(talent),
  GetPossibleDuplicates: getTalentPossibleDuplicatesResponse(talent),
  GetUnfilledCallsCount: getTalentUnfilledCallsResponse(),
  GetPendoVisitor: getPendoVisitorResponse(),
  GetTalentViewerPermissions: getTalentViewerPermissionsResponse(),
  GetTalentResumeJobs: getTalentResumeJobsResponse(talent)
})
