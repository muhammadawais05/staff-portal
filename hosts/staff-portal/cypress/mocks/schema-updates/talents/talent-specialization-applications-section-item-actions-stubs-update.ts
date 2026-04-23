import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { enabledOperationMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'

const updateTalentSpecializationApplicationsItemActionsStubs = (
  talent?: Partial<Talent>
) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talent
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'SpecializationApplication'),
          operations: {
            rejectSpecializationApplication: enabledOperationMock(),
            convertSpecializationApplication: enabledOperationMock(),
            restoreSpecializationApplication: enabledOperationMock()
          },
          __typename: 'SpecializationApplication'
        }
      }
    },
    RejectSpecializationApplication: {
      data: {
        rejectSpecializationApplication: {
          emailTemplate: { id: encodeEntityId('123', 'EmailTemplate') },
          nextActionPerformable: false,
          ...successMutationMock()
        }
      }
    },
    ConvertSpecializationApplication: {
      data: {
        convertSpecializationApplication: successMutationMock()
      }
    },
    RestoreTalentSpecializationApplication: {
      data: {
        restoreSpecializationApplication: {
          specializationApplication: {
            id: encodeEntityId('123', 'SpecializationApplication')
          },
          ...successMutationMock()
        }
      }
    }
  })

export default updateTalentSpecializationApplicationsItemActionsStubs
