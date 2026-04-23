/* eslint-disable max-lines */
import {
  Note,
  NoteStatus,
  NoteAnswer,
  RoleOrClient,
  NoteAnswerConnection,
  NoteQuestionKind,
  NoteQuestionCommentType
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { WithTypename } from '~integration/types'
import { enabledOperationMock } from '../enabled-operation-mock'
import { webResourceMock } from './web-resource-mock'

// eslint-disable-next-line max-lines-per-function
export const matchingNoteMock = (note?: Partial<Note>): WithTypename<Note> => ({
  __typename: 'Note',
  id: encodeEntityId('123', 'Note'),
  title: 'Matching Note',
  comment: 'This part was obfuscated, some content was here.',
  status: NoteStatus.ACTIVE,
  updatedAt: '2021-12-15T14:36:14+03:00',
  createdAt: '2021-12-15T14:36:14+03:00',
  newSalesCall: false,
  checklistSalesCall: false,
  screeningCall: false,
  attachment: null,
  creator: {
    id: 'VjEtU3RhZmYtMjYwMzc0OA',
    ...webResourceMock()
  } as RoleOrClient,
  operations: {
    removeNote: enabledOperationMock(),
    removeNoteAttachment: enabledOperationMock(),
    updateNote: enabledOperationMock()
  },
  answers: {
    nodes: [
      {
        id: 'VjEtTm90ZUFuc3dlci04MDY3MDE2',
        label: 'Small team of 2 - 6 talent',
        value: ['Small team of 2 - 6 talent'],
        comment: null,
        displayText: 'Small team of 2 - 6 talent',
        __typename: 'NoteAnswer',
        option: {
          id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODM0',
          __typename: 'NoteQuestionOption'
        },
        questionEdge: {
          renderedLabel: 'What is the structure of the team for this job?',
          node: {
            kind: NoteQuestionKind.RADIO_BUTTONS,
            hint: null,
            commentType: NoteQuestionCommentType.LONG,
            additionalCommentsHint: 'Add comment',
            required: true,
            activeOptions: {
              nodes: [
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODMy',
                  label:
                    "No team. The client oversees the project but doesn't directly contribute",
                  value:
                    "No team. The client oversees the project but doesn't directly contribute",
                  __typename: 'NoteQuestionOption'
                },
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODMz',
                  label:
                    'No team, but the client is actively contributing to the project',
                  value:
                    'No team, but the client is actively contributing to the project',
                  __typename: 'NoteQuestionOption'
                },
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODM0',
                  label: 'Small team of 2 - 6 talent',
                  value: 'Small team of 2 - 6 talent',
                  __typename: 'NoteQuestionOption'
                }
              ],
              __typename: 'NoteQuestionOptionConnection'
            },
            id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzEx',
            label: 'What is the structure of the team for this job?',
            group: {
              label: 'Questions',
              __typename: 'NoteQuestionGroup'
            },
            __typename: 'NoteQuestion'
          },
          __typename: 'NoteQuestionEdge'
        }
      } as unknown as NoteAnswer,
      {
        id: 'VjEtTm90ZUFuc3dlci04MDY3MDE3',
        label:
          "There is already a PM on the client's team who will manage the talent",
        value: [
          "There is already a PM on the client's team who will manage the talent"
        ],
        comment: null,
        displayText:
          "There is already a PM on the client's team who will manage the talent",
        __typename: 'NoteAnswer',
        option: {
          id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODQw',
          __typename: 'NoteQuestionOption'
        },
        questionEdge: {
          renderedLabel: 'Is there a need for a dedicated Project Manager?',
          node: {
            kind: NoteQuestionKind.RADIO_BUTTONS,
            hint: null,
            commentType: NoteQuestionCommentType.LONG,
            additionalCommentsHint: 'Add comment',
            required: true,
            activeOptions: {
              nodes: [
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODQw',
                  label:
                    "There is already a PM on the client's team who will manage the talent",
                  value:
                    "There is already a PM on the client's team who will manage the talent",
                  __typename: 'NoteQuestionOption'
                }
              ],
              __typename: 'NoteQuestionOptionConnection'
            },
            id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzEy',
            label: 'Is there a need for a dedicated Project Manager?',
            group: {
              label: 'Questions',
              __typename: 'NoteQuestionGroup'
            },
            __typename: 'NoteQuestion'
          },
          __typename: 'NoteQuestionEdge'
        }
      } as unknown as NoteAnswer,
      {
        id: 'VjEtTm90ZUFuc3dlci04MDY3MDE4',
        label: 'Providing support or enhancements on an existing project',
        value: ['Providing support or enhancements on an existing project'],
        comment: null,
        displayText: 'Providing support or enhancements on an existing project',
        __typename: 'NoteAnswer',
        option: {
          id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODQ3',
          __typename: 'NoteQuestionOption'
        },
        questionEdge: {
          renderedLabel: 'Type of work to be performed:',
          node: {
            kind: NoteQuestionKind.RADIO_BUTTONS,
            hint: null,
            commentType: NoteQuestionCommentType.LONG,
            additionalCommentsHint: 'Add comment',
            required: true,
            activeOptions: {
              nodes: [
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODQ3',
                  label:
                    'Providing support or enhancements on an existing project',
                  value:
                    'Providing support or enhancements on an existing project',
                  __typename: 'NoteQuestionOption'
                }
              ],
              __typename: 'NoteQuestionOptionConnection'
            },
            id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzEz',
            label: 'Type of work to be performed:',
            group: {
              label: 'Questions',
              __typename: 'NoteQuestionGroup'
            },
            __typename: 'NoteQuestion'
          },
          __typename: 'NoteQuestionEdge'
        }
      } as unknown as NoteAnswer,
      {
        id: 'VjEtTm90ZUFuc3dlci04MDY3MDE5',
        label: 'As soon as possible',
        value: ['As soon as possible'],
        comment: null,
        displayText: 'As soon as possible',
        __typename: 'NoteAnswer',
        option: {
          id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODUy',
          __typename: 'NoteQuestionOption'
        },
        questionEdge: {
          renderedLabel: 'Job Urgency level:',
          node: {
            kind: NoteQuestionKind.RADIO_BUTTONS,
            hint: null,
            commentType: NoteQuestionCommentType.LONG,
            additionalCommentsHint: 'Add comment',
            required: true,
            activeOptions: {
              nodes: [
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODUy',
                  label: 'As soon as possible',
                  value: 'As soon as possible',
                  __typename: 'NoteQuestionOption'
                }
              ],
              __typename: 'NoteQuestionOptionConnection'
            },
            id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE0',
            label: 'Job Urgency level:',
            group: {
              label: 'Questions',
              __typename: 'NoteQuestionGroup'
            },
            __typename: 'NoteQuestion'
          },
          __typename: 'NoteQuestionEdge'
        }
      } as unknown as NoteAnswer,
      {
        id: 'VjEtTm90ZUFuc3dlci04MDY3MDIw',
        label: 'Quality',
        value: ['Quality'],
        comment: null,
        displayText: 'Quality',
        __typename: 'NoteAnswer',
        option: {
          id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODU2',
          __typename: 'NoteQuestionOption'
        },
        questionEdge: {
          renderedLabel:
            'What will be the deciding factor for this client? What did the client put the most emphasis on?',
          node: {
            kind: NoteQuestionKind.RADIO_BUTTONS,
            hint: null,
            commentType: NoteQuestionCommentType.LONG,
            additionalCommentsHint: 'Add comment',
            required: true,
            activeOptions: {
              nodes: [
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODU2',
                  label: 'Quality',
                  value: 'Quality',
                  __typename: 'NoteQuestionOption'
                },
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODU3',
                  label: 'Speed',
                  value: 'Speed',
                  __typename: 'NoteQuestionOption'
                }
              ],
              __typename: 'NoteQuestionOptionConnection'
            },
            id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE1',
            label:
              'What will be the deciding factor for this client? What did the client put the most emphasis on?',
            group: {
              label: 'Questions',
              __typename: 'NoteQuestionGroup'
            },
            __typename: 'NoteQuestion'
          },
          __typename: 'NoteQuestionEdge'
        }
      } as unknown as NoteAnswer,
      {
        id: 'VjEtTm90ZUFuc3dlci04MDY3MDIx',
        label: 'High quality',
        value: ['High quality'],
        comment: null,
        displayText: 'High quality',
        __typename: 'NoteAnswer',
        option: {
          id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODYw',
          __typename: 'NoteQuestionOption'
        },
        questionEdge: {
          renderedLabel: 'What is your impression of the client quality?',
          node: {
            kind: NoteQuestionKind.RADIO_BUTTONS,
            hint: null,
            commentType: NoteQuestionCommentType.LONG,
            additionalCommentsHint: 'Add comment',
            required: true,
            activeOptions: {
              nodes: [
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODYw',
                  label: 'High quality',
                  value: 'High quality',
                  __typename: 'NoteQuestionOption'
                }
              ],
              __typename: 'NoteQuestionOptionConnection'
            },
            id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE2',
            label: 'What is your impression of the client quality?',
            group: {
              label: 'Questions',
              __typename: 'NoteQuestionGroup'
            },
            __typename: 'NoteQuestion'
          },
          __typename: 'NoteQuestionEdge'
        }
      } as unknown as NoteAnswer,
      {
        id: 'VjEtTm90ZUFuc3dlci04MDY3MDIy',
        label: '5-10 day',
        value: ['5-10 day'],
        comment: null,
        displayText: '5-10 day',
        __typename: 'NoteAnswer',
        option: {
          id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODY4',
          __typename: 'NoteQuestionOption'
        },
        questionEdge: {
          renderedLabel:
            'Does the client have any expectations regarding the length of the trial period?',
          node: {
            kind: NoteQuestionKind.RADIO_BUTTONS,
            hint: null,
            commentType: null,
            additionalCommentsHint: null,
            required: true,
            activeOptions: {
              nodes: [
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODY4',
                  label: '5-10 day',
                  value: '5-10 day',
                  __typename: 'NoteQuestionOption'
                },
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODY5',
                  label: 'More than 10 days',
                  value: 'More than 10 days',
                  __typename: 'NoteQuestionOption'
                }
              ],
              __typename: 'NoteQuestionOptionConnection'
            },
            id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE3',
            label:
              'Does the client have any expectations regarding the length of the trial period?',
            group: {
              label: 'Questions',
              __typename: 'NoteQuestionGroup'
            },
            __typename: 'NoteQuestion'
          },
          __typename: 'NoteQuestionEdge'
        }
      } as unknown as NoteAnswer,
      {
        id: 'VjEtTm90ZUFuc3dlci04MDY3MDIz',
        label: 'No',
        value: ['No'],
        comment: null,
        displayText: 'No',
        __typename: 'NoteAnswer',
        option: {
          id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODcx',
          __typename: 'NoteQuestionOption'
        },
        questionEdge: {
          renderedLabel: 'Special client needs (Travel)?',
          node: {
            kind: NoteQuestionKind.RADIO_BUTTONS,
            hint: null,
            commentType: null,
            additionalCommentsHint: null,
            required: true,
            activeOptions: {
              nodes: [
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODcw',
                  label: 'Yes',
                  value: 'Yes',
                  __typename: 'NoteQuestionOption'
                },
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODcx',
                  label: 'No',
                  value: 'No',
                  __typename: 'NoteQuestionOption'
                }
              ],
              __typename: 'NoteQuestionOptionConnection'
            },
            id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE4',
            label: 'Special client needs (Travel)?',
            group: {
              label: 'Questions',
              __typename: 'NoteQuestionGroup'
            },
            __typename: 'NoteQuestion'
          },
          __typename: 'NoteQuestionEdge'
        }
      } as unknown as NoteAnswer,
      {
        id: 'VjEtTm90ZUFuc3dlci04MDY3MDI0',
        label: 'Yes',
        value: ['Yes'],
        comment: null,
        displayText: 'Yes',
        __typename: 'NoteAnswer',
        option: {
          id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODcy',
          __typename: 'NoteQuestionOption'
        },
        questionEdge: {
          renderedLabel: 'Special client needs (Equipment)?',
          node: {
            kind: NoteQuestionKind.RADIO_BUTTONS,
            hint: null,
            commentType: null,
            additionalCommentsHint: null,
            required: true,
            activeOptions: {
              nodes: [
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODcy',
                  label: 'Yes',
                  value: 'Yes',
                  __typename: 'NoteQuestionOption'
                },
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODcz',
                  label: 'No',
                  value: 'No',
                  __typename: 'NoteQuestionOption'
                }
              ],
              __typename: 'NoteQuestionOptionConnection'
            },
            id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE5',
            label: 'Special client needs (Equipment)?',
            group: {
              label: 'Questions',
              __typename: 'NoteQuestionGroup'
            },
            __typename: 'NoteQuestion'
          },
          __typename: 'NoteQuestionEdge'
        }
      } as unknown as NoteAnswer,
      {
        id: 'VjEtTm90ZUFuc3dlci04MDY3MDI1',
        label: 'No',
        value: ['No'],
        comment: null,
        displayText: 'No',
        __typename: 'NoteAnswer',
        option: {
          id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODc1',
          __typename: 'NoteQuestionOption'
        },
        questionEdge: {
          renderedLabel: 'Special client needs (Background check)?',
          node: {
            kind: NoteQuestionKind.RADIO_BUTTONS,
            hint: null,
            commentType: null,
            additionalCommentsHint: null,
            required: true,
            activeOptions: {
              nodes: [
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODc0',
                  label: 'Yes',
                  value: 'Yes',
                  __typename: 'NoteQuestionOption'
                },
                {
                  id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODc1',
                  label: 'No',
                  value: 'No',
                  __typename: 'NoteQuestionOption'
                }
              ],
              __typename: 'NoteQuestionOptionConnection'
            },
            id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzIw',
            label: 'Special client needs (Background check)?',
            group: {
              label: 'Questions',
              __typename: 'NoteQuestionGroup'
            },
            __typename: 'NoteQuestion'
          },
          __typename: 'NoteQuestionEdge'
        }
      } as unknown as NoteAnswer,
      {
        id: 'VjEtTm90ZUFuc3dlci04MDY3MDI2',
        label: null,
        value: null,
        comment: 'test',
        displayText: null,
        __typename: 'NoteAnswer',
        option: null,
        questionEdge: {
          renderedLabel: 'Special client needs: (Other)',
          node: {
            kind: NoteQuestionKind.RADIO_BUTTONS,
            hint: null,
            commentType: NoteQuestionCommentType.LONG,
            additionalCommentsHint: 'Add comment',
            required: false,
            activeOptions: {
              nodes: [],
              __typename: 'NoteQuestionOptionConnection'
            },
            id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzIx',
            label: 'Special client needs: (Other)',
            group: {
              label: 'Questions',
              __typename: 'NoteQuestionGroup'
            },
            __typename: 'NoteQuestion'
          },
          __typename: 'NoteQuestionEdge'
        }
      } as unknown as NoteAnswer
    ],
    __typename: 'NoteAnswerConnection'
  } as NoteAnswerConnection,
  softSkillRatings: {
    nodes: [],
    totalCount: 0
  },
  ...note
})
