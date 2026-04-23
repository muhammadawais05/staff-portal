import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { jobOperationsMock } from '~integration/mocks/fragments/job-operations-mock'
import { jobPageStubs } from '../../request-stubs'
import { getJobNotesResponse } from '~integration/mocks/responses'
import { successMutationMock } from '~integration/mocks/mutations'
import {
  matchingNoteMock,
  matchingNoteQuestionsMock
} from '~integration/mocks/fragments'

const updateMatchingNoteStubs = () => {
  cy.stubGraphQLRequests({
    ...jobPageStubs(),
    GetLazyOperation: ({ variables: { nodeId } }) => {
      const noteId = encodeEntityId('123', 'Note')

      if (nodeId === noteId) {
        return {
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
      }

      return {
        data: {
          node: {
            id: encodeEntityId('123', 'Job'),
            operations: {
              addJobMatchingNote: enabledOperationMock(),
              __typename: 'JobOperations'
            },
            __typename: 'Job'
          }
        }
      }
    },
    AddJobMatchingNote: {
      data: {
        addJobMatchingNote: successMutationMock()
      }
    },
    RemoveNote: {
      data: {
        removeNote: successMutationMock()
      }
    },
    UpdateNote: {
      data: {
        updateNote: successMutationMock({
          note: matchingNoteMock()
        })
      }
    },
    GetJobNotes: getJobNotesResponse({
      operations: jobOperationsMock({
        addJobMatchingNote: enabledOperationMock(),
        createActivity: enabledOperationMock()
      }),
      matchingNoteQuestions: matchingNoteQuestionsMock(),
      notes: {
        operations: {
          createNote: enabledOperationMock()
        },
        nodes: [],
        totalCount: 0
      },
      activitiesAndNotes: {
        totalCount: 1,
        nodes: [matchingNoteMock()]
      }
    }),
    GetNote: {
      data: {
        node: matchingNoteMock()
      }
    }
  })
}

export default updateMatchingNoteStubs
