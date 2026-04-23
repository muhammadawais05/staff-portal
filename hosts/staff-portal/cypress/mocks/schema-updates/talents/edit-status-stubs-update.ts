import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  SpecializationApplicationRejectionReasonValue,
  TalentSpecializationApplicationStatus
} from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import talentSpecializationApplicationsMock from '~integration/mocks/talent-specialization-applications-mock'

const specializationApplication = {
  status: TalentSpecializationApplicationStatus.REJECTED,
  rejectionReason: {
    id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvblJlamVjdGlvblJlYXNvbi04MDYwNzM',
    comment: SpecializationApplicationRejectionReasonValue.NO_SHOW.toString(),
    place: 'english',
    reason: SpecializationApplicationRejectionReasonValue.NO_SHOW,
    operations: {
      id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvblJlamVjdGlvblJlYXNvbk9wZXJhdGlvbnMtODA2MDcz',
      updateSpecializationApplicationRejectionReason: enabledOperationMock()
    }
  }
}

const updateEditStatusStubs = (
  reason?: SpecializationApplicationRejectionReasonValue
) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talentSpecializationApplicationsMock({
        specializationApplication
      })
    }),
    GetTalentRejectionReason: {
      data: {
        node: {
          ...talentSpecializationApplicationsMock({
            talent: {
              id: encodeEntityId('123', 'Talent')
            },
            specializationApplication
          }),
          __typeName: 'Talent'
        }
      }
    },
    UpdateSpecializationApplicationRejectionReason: {
      data: {
        updateSpecializationApplicationRejectionReason: {
          success: true,
          errors: [],
          specializationApplicationRejectionReason: {
            comment: 'Unresponsive',
            id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvblJlamVjdGlvblJlYXNvbi04MzI0ODc',
            place: 'english',
            reason,
            __typename: 'SpecializationApplicationRejectionReason'
          }
        }
      }
    }
  })

export default updateEditStatusStubs
