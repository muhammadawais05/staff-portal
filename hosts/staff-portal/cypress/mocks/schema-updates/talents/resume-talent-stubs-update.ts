import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Talent } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { getTalentOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'

const updateResumeTalentStubs = (talent?: Partial<Talent>) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talent,
      operations: {
        ...getTalentOperations(),
        resumeTalent: enabledOperationMock()
      }
    }),
    ResumeTalent: {
      data: {
        resumeTalent: successMutationMock()
      }
    },
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: {
            resumeTalent: enabledOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    }
  })

export default updateResumeTalentStubs
