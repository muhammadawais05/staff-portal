import { encodeEntityId } from '@staff-portal/data-layer-service'

import { successMutationMock } from '~integration/mocks/mutations'
import {
  getClientDataByClientIdResponse,
  getClientDataByRoleIdResponse,
  getJobCreateOpportunityResponse,
  getJobCreateVerticalsResponse,
  getPendoVisitorResponse,
  getClientRepresentativesResponse,
  getVerticalResponse,
  getVerticalSkillsAutcompleteResponse
} from '~integration/mocks/responses'

const createJobStubUpdates = ({ jobId }: { jobId: string }) =>
  cy.stubGraphQLRequests({
    GetPendoVisitor: getPendoVisitorResponse(),

    GetClientDataByRoleId: getClientDataByRoleIdResponse(),
    GetClientDataByClientId: getClientDataByClientIdResponse(),
    GetJobCreateOpportunity: getJobCreateOpportunityResponse(),
    GetJobCreateVerticals: getJobCreateVerticalsResponse(),
    GetClientRepresentatives: getClientRepresentativesResponse(),
    GetVertical: getVerticalResponse(),
    GetVerticalSkillsAutocomplete: getVerticalSkillsAutcompleteResponse(),
    GetValidateCreateJobWizardStep: {
      data: {
        newJobWizard: { errors: [], __typename: 'NewJobWizard' }
      }
    },
    SubmitNewJobWizard: {
      data: {
        submitNewJobWizard: {
          ...successMutationMock(),
          job: {
            id: jobId || encodeEntityId('123', 'Job')
          }
        }
      }
    }
  })

export default createJobStubUpdates
