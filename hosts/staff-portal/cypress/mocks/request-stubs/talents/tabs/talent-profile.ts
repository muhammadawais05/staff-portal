import { Talent } from '@staff-portal/graphql/staff'

import {
  getTalentProfileGeneralDataResponse,
  getTalentProfileOperationsResponse,
  getTalentPaymentOptionsResponse,
  getTalentStatusResponse,
  getClientWillHireAgainResponse,
  getTalentEngagementRatesResponse,
  getTalentPortfolioResponse,
  getTalentPortfolioUrlResponse,
  getTalentRejectForInactivityResponse,
  getTalentSkillSetsResponse,
  getTalentAboutDataResponse,
  getTalentSoftSkillsResponse,
  getTalentOfacStatusDataResponse,
  getTalentScreeningRoleStepsResponse,
  getTalentActivationStepsResponse,
  getTalentSpecializationApplicationsResponse,
  getTalentOnlineTestsResponse,
  getTalentFeedbackStatsResponse,
  getTalentContractsResponse,
  getTalentRoleFlagsResponse,
  getTalentResumeFilesResponse,
  getTalentNPSScoreResponse,
  getTalentRelatedTasksResponse,
  getTalentRoleScheduledMeetingsResponse,
  getTalentQAResponse,
  getTalentJobCommissionsPermissionsResponse,
  getTalentWithScreeningSpecialistResponse,
  getCreateTalentTaskOperationResponse,
  getTalentCommissionResponse,
  getCommunityLeaderResponse,
  getTalentEmailContactsResponse,
  getTalentProfileTabPermissionsResponse,
  getTalentTeamsWithEmailTrackingResponse
} from '~integration/mocks/responses'
import { getAvailableTalentSpecializationsResponse } from '~integration/mocks/responses/talents/get-available-talent-specializations-response'
import { getRejectApplicationDataResponse } from '~integration/mocks/responses/talents/get-reject-application-data-response'
import { getTalentBillingNotes } from '~integration/mocks/responses/talents/get-talent-billing-notes-response'
import { talentsSharedStubs } from '../shared-stubs'

export const talentProfileStubs = (talent?: Partial<Talent>) => ({
  ...talentsSharedStubs(talent),
  GetTalentProfileGeneralData: getTalentProfileGeneralDataResponse(talent),
  GetTalentProfileTabPermissions:
    getTalentProfileTabPermissionsResponse(talent),
  GetTalentProfileOperations: getTalentProfileOperationsResponse(talent),
  GetTalentPaymentOptions: getTalentPaymentOptionsResponse(talent),
  GetTalentStatus: getTalentStatusResponse(talent),
  GetClientWillHireAgain: getClientWillHireAgainResponse(),
  GetTalentEngagementsRates: getTalentEngagementRatesResponse(talent),
  GetTalentPortfolioUrl: getTalentPortfolioUrlResponse(talent),
  GetTalentPortfolio: getTalentPortfolioResponse(talent),
  GetTalentRejectForInactivity: getTalentRejectForInactivityResponse(talent),
  GetTalentSkillSets: getTalentSkillSetsResponse(talent),
  GetTalentAboutData: getTalentAboutDataResponse(talent),
  GetTalentSoftSkills: getTalentSoftSkillsResponse(),
  GetOfacStatusData: getTalentOfacStatusDataResponse(talent),
  GetTalentScreeningRoleSteps: getTalentScreeningRoleStepsResponse(talent),
  GetTalentActivationSteps: getTalentActivationStepsResponse(talent),
  GetTalentSpecializationApplications:
    getTalentSpecializationApplicationsResponse(talent),
  GetAvailableTalentSpecializations:
    getAvailableTalentSpecializationsResponse(talent),
  GetRejectApplicationData: getRejectApplicationDataResponse(talent),
  GetTalentOnlineTests: getTalentOnlineTestsResponse(talent),
  GetTalentFeedbackStats: getTalentFeedbackStatsResponse(talent),
  GetTalentContracts: getTalentContractsResponse(talent),
  GetRoleFlags: getTalentRoleFlagsResponse(talent),
  GetTalentResumeFiles: getTalentResumeFilesResponse(talent),
  GetTalentNPSScore: getTalentNPSScoreResponse(talent),
  GetRelatedTasks: getTalentRelatedTasksResponse(talent),
  GetRoleScheduledMeetings: getTalentRoleScheduledMeetingsResponse(talent),
  GetTalentQA: getTalentQAResponse(talent),
  GetTalentJobCommissionsPermissions:
    getTalentJobCommissionsPermissionsResponse(),
  GetTalentWithScreeningSpecialist:
    getTalentWithScreeningSpecialistResponse(talent),
  GetCreateTaskOperation: getCreateTalentTaskOperationResponse(talent),
  GetCommission: getTalentCommissionResponse(talent),
  GetCommunityLeader: getCommunityLeaderResponse(talent),
  GetBillingNotes: getTalentBillingNotes(),
  GetEmailContacts: getTalentEmailContactsResponse(talent),
  GetTeamsWithEmailTracking: getTalentTeamsWithEmailTrackingResponse(talent)
})
