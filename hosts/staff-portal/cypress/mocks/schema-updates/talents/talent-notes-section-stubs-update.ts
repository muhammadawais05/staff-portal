import { NoteQuestionKind } from '@staff-portal/graphql/staff'
import { OperationFragment } from '@staff-portal/operations'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getTalentOperations } from '~integration/mocks/fragments'
import { talentNotesStubs } from '~integration/mocks/request-stubs/talents/tabs/notes'
import { enabledOperationMock } from '~integration/mocks'
import { getCreateTechnicalOneCallTalentNoteResponse } from '~integration/mocks/responses'

const updateTalentNotesSectionStubs = (
  operations?: Record<string, OperationFragment>
) =>
  cy.stubGraphQLRequests({
    ...talentNotesStubs({
      operations: getTalentOperations(operations)
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: getTalentOperations({
            createActivity: enabledOperationMock(),
            createGeneralInformationTalentNote: enabledOperationMock(),
            createFeedbackCallTalentNote: enabledOperationMock(),
            addTalentSuspiciousActivityReportNote: enabledOperationMock(),
            createOnlineTestTalentNote: enabledOperationMock(),
            createTechnicalOneCallTalentNote: enabledOperationMock(),
            createTechnicalTwoCallTalentNote: enabledOperationMock(),
            createEnglishCallTalentNote: enabledOperationMock(),
            createPrescreeningTalentNote: enabledOperationMock(),
            createSourcingCallTalentNote: enabledOperationMock()
          }),
          __typename: 'Talent'
        }
      }
    },
    GetDefaultNoteAnswers: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          defaultNoteAnswers: {
            nodes: [
              {
                id: encodeEntityId('123', 'NoteAnswer'),
                label: 'N/A',
                value: ['N/A'],
                comment: null,
                displayText: 'N/A',
                __typename: 'NoteAnswer',
                option: {
                  id: encodeEntityId('123', 'NoteQuestionOption'),
                  __typename: 'NoteQuestionOption'
                },
                questionEdge: {
                  renderedLabel: 'Outcome',
                  node: {
                    kind: NoteQuestionKind.RADIO_BUTTONS,
                    hint: null,
                    commentType: null,
                    additionalCommentsHint: null,
                    required: true,
                    gradingWeight: null,
                    activeOptions: {
                      nodes: [
                        {
                          id: encodeEntityId('123', 'NoteQuestionOption'),
                          label: 'N/A',
                          value: 'N/A',
                          __typename: 'NoteQuestionOption'
                        },
                        {
                          id: encodeEntityId('456', 'NoteQuestionOption'),
                          label: 'Passed',
                          value: 'Passed',
                          __typename: 'NoteQuestionOption'
                        }
                      ],
                      __typename: 'NoteQuestionOptionConnection'
                    },
                    id: encodeEntityId('123', 'NoteQuestion'),
                    label: 'Outcome',
                    group: {
                      label: 'Details on the call',
                      __typename: 'NoteQuestionGroup'
                    },
                    __typename: 'NoteQuestion'
                  },
                  __typename: 'NoteQuestionEdge'
                }
              },
              {
                id: encodeEntityId('123', 'NoteAnswer'),
                label: null,
                value: null,
                comment: null,
                displayText: null,
                __typename: 'NoteAnswer',
                option: null,
                questionEdge: {
                  renderedLabel: 'Which areas need improvement?',
                  node: {
                    kind: NoteQuestionKind.TEXTBOX,
                    hint: null,
                    commentType: null,
                    additionalCommentsHint: null,
                    required: true,
                    activeOptions: {
                      nodes: [],
                      __typename: 'NoteQuestionOptionConnection'
                    },
                    id: encodeEntityId('456', 'NoteQuestion'),
                    label: 'Which areas need improvement?',
                    group: {
                      label: 'Details from the Call',
                      __typename: 'NoteQuestionGroup'
                    },
                    __typename: 'NoteQuestion'
                  },
                  __typename: 'NoteQuestionEdge'
                }
              }
            ],
            __typename: 'NoteAnswerConnection'
          },
          __typename: 'Talent'
        }
      }
    },
    GetSoftSkills: {
      data: {
        softSkills: {
          nodes: []
        }
      }
    },
    CreateTechnicalOneCallTalentNote:
      getCreateTechnicalOneCallTalentNoteResponse()
  })

export default updateTalentNotesSectionStubs
