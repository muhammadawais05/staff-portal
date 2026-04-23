import { encodeEntityId } from '@staff-portal/data-layer-service'

import { noteMock } from '~integration/mocks/fragments'
import { talentNotesStubs } from '~integration/mocks/request-stubs/talents/tabs/notes'
import { enabledOperationMock } from '../../enabled-operation-mock'

const updateTalentNoteStubs = () =>
  cy.stubGraphQLRequests({
    ...talentNotesStubs(),
    GetNote: {
      data: {
        node: noteMock()
      }
    },
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Note'),
          operations: {
            removeNote: enabledOperationMock(),
            __typename: 'NoteOperations'
          },
          __typename: 'Note'
        }
      }
    }
  })

export default updateTalentNoteStubs
