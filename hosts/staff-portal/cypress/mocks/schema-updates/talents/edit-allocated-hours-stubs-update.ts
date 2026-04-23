import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { getTalentOperations } from '~integration/mocks/fragments'
import { talentWorkloadStubs } from '~integration/mocks/request-stubs/talents/tabs/workload'
import { successMutationMock } from '~integration/mocks/mutations'

const updateEditAllocatedHoursStubs = (talent?: Partial<Talent>) =>
  cy.stubGraphQLRequests({
    ...talentWorkloadStubs(talent),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: getTalentOperations({
            updateTalentAllocatedHours: enabledOperationMock()
          }),
          __typename: 'Talent'
        }
      }
    },
    UpdateTalentAllocatedHours: {
      data: {
        updateTalentAllocatedHours: successMutationMock()
      }
    }
  })

export default updateEditAllocatedHoursStubs
