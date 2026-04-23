import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { getTalentOfacStatusDataResponse } from '~integration/mocks/responses'
import { getTalentOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { OperationValue } from '~integration/types'

const updateTalentProfileChangeOFACStatusStubs = (
  operationValues: { [key: string]: OperationValue } | undefined = {}
) => {
  return cy.stubGraphQLRequests({
    ...talentProfileStubs({
      unavailableAllocatedHoursChangeRequest: null
    }),
    GetOfacStatusData: getTalentOfacStatusDataResponse({
      operations: {
        ...getTalentOperations(),
        updateRoleOfacStatus: enabledOperationMock()
      }
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: {
            updateRoleOfacStatus: enabledOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    },
    UpdateRoleOfacStatus: {
      data: {
        updateRoleOfacStatus: successMutationMock()
      }
    },
    ...operationValues
  })
}

export default updateTalentProfileChangeOFACStatusStubs
