import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { successOperationMock } from '~integration/mocks/operations'
import { getTalentOperations } from '~integration/mocks/fragments'

const updateRestoreOnboardingTalentStubs = (talent?: Partial<Talent>) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talent,
      operations: getTalentOperations({
        restoreOnboardingTalent: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: {
            restoreOnboardingTalent: enabledOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    },
    RestoreOnboardingTalent: {
      data: {
        restoreOnboardingTalent: {
          nextAction: null,
          emailTemplate: null,
          ...successOperationMock(),
          __typename: 'ResumeTalentApplicationPayload'
        }
      }
    }
  })

export default updateRestoreOnboardingTalentStubs
