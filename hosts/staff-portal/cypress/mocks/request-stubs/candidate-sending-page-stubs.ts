import {
  getAdditionalStatusMessagesDataResponse,
  getContentStatusMessageDataResponse,
  getEmailContactsResponse,
  getInitialNewEngagementWizardResponse,
  getNewEngagementWizardForNextStepResponse,
  getPendoVisitorResponse,
  getRoleTitleDataResponse,
  getTalentUnfilledCallsResponse,
  getTeamsWithEmailTrackingResponse
} from '~integration/mocks/responses'

export const candidateSendingPageStubs = () => ({
  GetUnfilledCallsCount: getTalentUnfilledCallsResponse(),
  GetEmailContacts: getEmailContactsResponse(),
  GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
  GetAdditionalStatusMessagesData: getAdditionalStatusMessagesDataResponse(),
  GetContentStatusMessageData: getContentStatusMessageDataResponse(),
  GetInitialNewEngagementWizard: getInitialNewEngagementWizardResponse(),
  GetNewEngagementWizardForNextStep:
    getNewEngagementWizardForNextStepResponse(),
  GetPendoVisitor: getPendoVisitorResponse(),
  GetRoleTitleData: getRoleTitleDataResponse()
})
