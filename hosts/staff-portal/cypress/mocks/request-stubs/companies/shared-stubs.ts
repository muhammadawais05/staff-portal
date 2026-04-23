import { Client } from '@staff-portal/graphql/staff'

import { timeZoneMock } from '~integration/mocks/fragments/time-zone-mock'
import {
  getAvailableTimeZonesResponse,
  getCompanyStatusMessagesResponse,
  getClientResponse,
  getClientPurchaseOrdersResponse,
  getCompanyTabsInfoResponse,
  getCompanyOverviewDataResponse,
  getClientAboutAndOperationResponse,
  getClientMissionAndOperationResponse,
  getInternalTeamDataResponse,
  getOpportunitiesResponse,
  getClientScheduledMeetingsResponse,
  getCompanyCallbackRequestsResponse,
  getLinkedClientResponse,
  getRelatedTasksResponse,
  getRoleFlagsResponse,
  getPossibleDuplicatesResponse,
  getClaimClientContactsResponse,
  getCreateTaskOperationResponse,
  getUserVerticalsResponse,
  getLegalStaTermsExperimentsResponse,
  getTeamsWithEmailTrackingResponse,
  getEmailContactsResponse,
  getPendoVisitorResponse
} from '~integration/mocks/responses'

export const companiesSharedStubs = (client?: Partial<Client>) => ({
  GetClient: getClientResponse(client),
  GetClientPurchaseOrders: getClientPurchaseOrdersResponse(),
  GetCompanyTabsInfo: getCompanyTabsInfoResponse(client),
  GetNodeStatusMessages: getCompanyStatusMessagesResponse(),
  GetCompanyOverviewData: getCompanyOverviewDataResponse(client),
  GetClientAboutAndOperation: getClientAboutAndOperationResponse(client),
  GetClientMissionAndOperation: getClientMissionAndOperationResponse(client),
  GetInternalTeamData: getInternalTeamDataResponse(client),
  GetOpportunities: getOpportunitiesResponse(client),
  GetClientScheduledMeetings: getClientScheduledMeetingsResponse(client),
  GetCompanyCallbackRequests: getCompanyCallbackRequestsResponse(client),
  GetLinkedClient: getLinkedClientResponse(client),
  GetRelatedTasks: getRelatedTasksResponse(client),
  GetRoleFlags: getRoleFlagsResponse(),
  GetClientPossibleDuplicates: getPossibleDuplicatesResponse(),
  GetUserVerticals: getUserVerticalsResponse(),
  GetAvailableTimeZones: getAvailableTimeZonesResponse([timeZoneMock()]),
  GetClientContacts: getClaimClientContactsResponse(),
  GetCreateTaskOperation: getCreateTaskOperationResponse(),
  GetLegalStaTermsExperiments: getLegalStaTermsExperimentsResponse(),
  GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
  GetEmailContacts: getEmailContactsResponse(),
  GetPendoVisitor: getPendoVisitorResponse()
})
