import {
  ActivityType,
  OperationCallableTypes,
  NoteStatus
} from '@staff-portal/graphql/staff'
import { ActivityFragment } from '@staff-portal/activities'

import { NoteFragment } from '../../data/note-fragment'
import { getNotesFromNodes } from '.'

const NOTES: (ActivityFragment | NoteFragment)[] = [
  {
    __typename: 'Note',
    answers: {
      nodes: [
        {
          comment: null,
          displayText:
            "No team. The client oversees the project but doesn't directly contribute",
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjU5',
          label:
            "No team. The client oversees the project but doesn't directly contribute",
          questionEdge: {
            node: {
              group: {
                label: 'Questions'
              },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzEx',
              label: 'What is the structure of the team for this job?'
            }
          },
          value: [
            "No team. The client oversees the project but doesn't directly contribute"
          ]
        },
        {
          comment: null,
          displayText:
            'The client will manage talent on their own and has prior PM experience',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjYw',
          label:
            'The client will manage talent on their own and has prior PM experience',
          questionEdge: {
            node: {
              group: {
                label: 'Questions'
              },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzEy',
              label: 'Is there a need for a dedicated Project Manager?'
            }
          },
          value: [
            'The client will manage talent on their own and has prior PM experience'
          ]
        },
        {
          comment: null,
          displayText: 'Creating a new project from scratch',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjYx',
          label: 'Creating a new project from scratch',
          questionEdge: {
            node: {
              group: {
                label: 'Questions'
              },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzEz',
              label: 'Type of work to be performed:'
            }
          },
          value: ['Creating a new project from scratch']
        },
        {
          comment: null,
          displayText: 'As soon as possible',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjYy',
          label: 'As soon as possible',
          questionEdge: {
            node: {
              group: {
                label: 'Questions'
              },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE0',
              label: 'Job Urgency level:'
            }
          },
          value: ['As soon as possible']
        },
        {
          comment: null,
          displayText: 'Quality',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjYz',
          label: 'Quality',
          questionEdge: {
            node: {
              group: {
                label: 'Questions'
              },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE1',
              label:
                'What will be the deciding factor for this client? What did the client put the most emphasis on?'
            }
          },
          value: ['Quality']
        },
        {
          comment: null,
          displayText: 'High quality',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjY0',
          label: 'High quality',
          questionEdge: {
            node: {
              group: {
                label: 'Questions'
              },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE2',
              label: 'What is your impression of the client quality?'
            }
          },
          value: ['High quality']
        },
        {
          comment: null,
          displayText: 'Trial length was not discussed',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjY1',
          label: 'Trial length was not discussed',
          questionEdge: {
            node: {
              group: {
                label: 'Questions'
              },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE3',
              label:
                'Does the client have any expectations regarding the length of the trial period?'
            }
          },
          value: ['Trial length was not discussed']
        },
        {
          comment: null,
          displayText: 'Yes',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjY2',
          label: 'Yes',
          questionEdge: {
            node: {
              group: {
                label: 'Questions'
              },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE4',
              label: 'Special client needs (Travel)?'
            }
          },
          value: ['Yes']
        },
        {
          comment: null,
          displayText: 'No',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjY3',
          label: 'No',
          questionEdge: {
            node: {
              group: {
                label: 'Questions'
              },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE5',
              label: 'Special client needs (Equipment)?'
            }
          },
          value: ['No']
        },
        {
          comment: null,
          displayText: 'Yes',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjY4',
          label: 'Yes',
          questionEdge: {
            node: {
              group: {
                label: 'Questions'
              },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzIw',
              label: 'Special client needs (Background check)?'
            }
          },
          value: ['Yes']
        },
        {
          comment: null,
          displayText: null,
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjY5',
          label: null,
          questionEdge: {
            node: {
              group: {
                label: 'Questions'
              },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzIx',
              label: 'Special client needs: (Other)'
            }
          },
          value: null
        }
      ]
    },
    attachment: null,
    comment: 'test',
    createdAt: '2021-10-29T17:25:55+02:00',
    creator: {
      id: 'VjEtU3RhZmYtMTAwMDEw',
      webResource: {
        text: 'Alexander Danilenko',
        url: 'https://staging.toptal.net/platform/staff/staff/100010'
      }
    },
    id: 'VjEtTm90ZS0xNjcyMDUw',
    newSalesCall: false,
    checklistSalesCall: false,
    operations: {
      removeNote: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      removeNoteAttachment: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      updateNote: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    },
    softSkillRatings: {
      nodes: []
    },
    status: NoteStatus.ACTIVE,
    title: 'Matching Note',
    updatedAt: '2021-10-29T17:25:55+02:00'
  },
  {
    __typename: 'Note',
    answers: {
      nodes: []
    },
    attachment: null,
    comment: 'test note',
    createdAt: '2021-10-29T12:43:38+02:00',
    creator: {
      id: 'VjEtU3RhZmYtMTAwMDEw',
      webResource: {
        text: 'Alexander Danilenko',
        url: 'https://staging.toptal.net/platform/staff/staff/100010'
      }
    },
    id: 'VjEtTm90ZS0xNjcyMDQ5',
    newSalesCall: false,
    checklistSalesCall: false,
    operations: {
      removeNote: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      removeNoteAttachment: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      updateNote: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    },
    softSkillRatings: {
      nodes: []
    },
    status: NoteStatus.ACTIVE,
    title: 'new note test',
    updatedAt: '2021-10-29T12:43:38+02:00'
  },
  {
    __typename: 'Activity',
    activityContactRoles: {
      nodes: []
    },
    createdAt: '2021-10-28T19:55:05+02:00',
    details: 'dispute test',
    duration: 1,
    id: 'VjEtQWN0aXZpdHktMTAzMDg',
    occurredAt: '2021-10-28T19:54:48+02:00',
    operations: {
      removeActivity: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      updateActivity: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    },
    outcome: 'RESCHEDULED',
    role: {
      id: 'VjEtU3RhZmYtMTAwMDEw',
      webResource: {
        text: 'Alexander Danilenko',
        url: 'https://staging.toptal.net/platform/staff/staff/100010'
      }
    },
    subject: {
      id: 'VjEtQ2xpZW50LTQ5Mjc0Ng',
      representatives: {
        nodes: [
          {
            fullName: 'Martha Buckridge',
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI0MDQ1ODE',
            webResource: {
              text: 'Martha Buckridge',
              url: 'https://staging.toptal.net/platform/staff/company_representatives/2404581'
            }
          },
          {
            fullName: 'Lavone Crist',
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIzMjQ5MTc',
            webResource: {
              text: 'Lavone Crist',
              url: 'https://staging.toptal.net/platform/staff/company_representatives/2324917'
            }
          },
          {
            fullName: 'Ron Hettinger',
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIzNTgzNDQ',
            webResource: {
              text: 'Ron Hettinger',
              url: 'https://staging.toptal.net/platform/staff/company_representatives/2358344'
            }
          },
          {
            fullName: 'Tanya Kris',
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI2ODQ2ODg',
            webResource: {
              text: 'Tanya Kris',
              url: 'https://staging.toptal.net/platform/staff/company_representatives/2684688'
            }
          },
          {
            fullName: 'Garnett Bogan',
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI3ODM3OTQ',
            webResource: {
              text: 'Garnett Bogan',
              url: 'https://staging.toptal.net/platform/staff/company_representatives/2783794'
            }
          }
        ]
      }
    },
    subtype: 'DISPUTE_OR_INVESTIGATION',
    type: ActivityType.JOB_RELATED,
    updatedAt: '2021-10-28T19:55:05+02:00'
  }
]

const EXPECTED_RESULT = [
  {
    __typename: 'Note',
    answers: {
      nodes: [
        {
          comment: null,
          displayText:
            "No team. The client oversees the project but doesn't directly contribute",
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjU5',
          label:
            "No team. The client oversees the project but doesn't directly contribute",
          questionEdge: {
            node: {
              group: { label: 'Questions' },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzEx',
              label: 'What is the structure of the team for this job?'
            }
          },
          value: [
            "No team. The client oversees the project but doesn't directly contribute"
          ]
        },
        {
          comment: null,
          displayText:
            'The client will manage talent on their own and has prior PM experience',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjYw',
          label:
            'The client will manage talent on their own and has prior PM experience',
          questionEdge: {
            node: {
              group: { label: 'Questions' },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzEy',
              label: 'Is there a need for a dedicated Project Manager?'
            }
          },
          value: [
            'The client will manage talent on their own and has prior PM experience'
          ]
        },
        {
          comment: null,
          displayText: 'Creating a new project from scratch',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjYx',
          label: 'Creating a new project from scratch',
          questionEdge: {
            node: {
              group: { label: 'Questions' },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzEz',
              label: 'Type of work to be performed:'
            }
          },
          value: ['Creating a new project from scratch']
        },
        {
          comment: null,
          displayText: 'As soon as possible',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjYy',
          label: 'As soon as possible',
          questionEdge: {
            node: {
              group: { label: 'Questions' },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE0',
              label: 'Job Urgency level:'
            }
          },
          value: ['As soon as possible']
        },
        {
          comment: null,
          displayText: 'Quality',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjYz',
          label: 'Quality',
          questionEdge: {
            node: {
              group: { label: 'Questions' },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE1',
              label:
                'What will be the deciding factor for this client? What did the client put the most emphasis on?'
            }
          },
          value: ['Quality']
        },
        {
          comment: null,
          displayText: 'High quality',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjY0',
          label: 'High quality',
          questionEdge: {
            node: {
              group: { label: 'Questions' },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE2',
              label: 'What is your impression of the client quality?'
            }
          },
          value: ['High quality']
        },
        {
          comment: null,
          displayText: 'Trial length was not discussed',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjY1',
          label: 'Trial length was not discussed',
          questionEdge: {
            node: {
              group: { label: 'Questions' },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE3',
              label:
                'Does the client have any expectations regarding the length of the trial period?'
            }
          },
          value: ['Trial length was not discussed']
        },
        {
          comment: null,
          displayText: 'Yes',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjY2',
          label: 'Yes',
          questionEdge: {
            node: {
              group: { label: 'Questions' },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE4',
              label: 'Special client needs (Travel)?'
            }
          },
          value: ['Yes']
        },
        {
          comment: null,
          displayText: 'No',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjY3',
          label: 'No',
          questionEdge: {
            node: {
              group: { label: 'Questions' },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzE5',
              label: 'Special client needs (Equipment)?'
            }
          },
          value: ['No']
        },
        {
          comment: null,
          displayText: 'Yes',
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjY4',
          label: 'Yes',
          questionEdge: {
            node: {
              group: { label: 'Questions' },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzIw',
              label: 'Special client needs (Background check)?'
            }
          },
          value: ['Yes']
        },
        {
          comment: null,
          displayText: null,
          id: 'VjEtTm90ZUFuc3dlci03NjY3MjY5',
          label: null,
          questionEdge: {
            node: {
              group: { label: 'Questions' },
              id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzIx',
              label: 'Special client needs: (Other)'
            }
          },
          value: null
        }
      ]
    },
    attachment: null,
    comment: 'test',
    createdAt: '2021-10-29T17:25:55+02:00',
    creator: {
      id: 'VjEtU3RhZmYtMTAwMDEw',
      webResource: {
        text: 'Alexander Danilenko',
        url: 'https://staging.toptal.net/platform/staff/staff/100010'
      }
    },
    id: 'VjEtTm90ZS0xNjcyMDUw',
    newSalesCall: false,
    checklistSalesCall: false,
    operations: {
      removeNote: { callable: 'ENABLED', messages: [] },
      removeNoteAttachment: { callable: 'ENABLED', messages: [] },
      updateNote: { callable: 'ENABLED', messages: [] }
    },
    softSkillRatings: { nodes: [] },
    status: 'ACTIVE',
    title: 'Matching Note',
    updatedAt: '2021-10-29T17:25:55+02:00'
  },
  {
    __typename: 'Note',
    answers: { nodes: [] },
    attachment: null,
    comment: 'test note',
    createdAt: '2021-10-29T12:43:38+02:00',
    creator: {
      id: 'VjEtU3RhZmYtMTAwMDEw',
      webResource: {
        text: 'Alexander Danilenko',
        url: 'https://staging.toptal.net/platform/staff/staff/100010'
      }
    },
    id: 'VjEtTm90ZS0xNjcyMDQ5',
    newSalesCall: false,
    checklistSalesCall: false,
    operations: {
      removeNote: { callable: 'ENABLED', messages: [] },
      removeNoteAttachment: { callable: 'ENABLED', messages: [] },
      updateNote: { callable: 'ENABLED', messages: [] }
    },
    softSkillRatings: { nodes: [] },
    status: 'ACTIVE',
    title: 'new note test',
    updatedAt: '2021-10-29T12:43:38+02:00'
  },
  {
    __typename: 'Activity',
    activityContactRoles: { nodes: [] },
    createdAt: '2021-10-28T19:55:05+02:00',
    details: 'dispute test',
    duration: 1,
    id: 'VjEtQWN0aXZpdHktMTAzMDg',
    occurredAt: '2021-10-28T19:54:48+02:00',
    operations: {
      removeActivity: { callable: 'ENABLED', messages: [] },
      updateActivity: { callable: 'ENABLED', messages: [] }
    },
    outcome: 'RESCHEDULED',
    role: {
      id: 'VjEtU3RhZmYtMTAwMDEw',
      webResource: {
        text: 'Alexander Danilenko',
        url: 'https://staging.toptal.net/platform/staff/staff/100010'
      }
    },
    subject: {
      id: 'VjEtQ2xpZW50LTQ5Mjc0Ng',
      representatives: {
        nodes: [
          {
            fullName: 'Martha Buckridge',
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI0MDQ1ODE',
            webResource: {
              text: 'Martha Buckridge',
              url: 'https://staging.toptal.net/platform/staff/company_representatives/2404581'
            }
          },
          {
            fullName: 'Lavone Crist',
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIzMjQ5MTc',
            webResource: {
              text: 'Lavone Crist',
              url: 'https://staging.toptal.net/platform/staff/company_representatives/2324917'
            }
          },
          {
            fullName: 'Ron Hettinger',
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIzNTgzNDQ',
            webResource: {
              text: 'Ron Hettinger',
              url: 'https://staging.toptal.net/platform/staff/company_representatives/2358344'
            }
          },
          {
            fullName: 'Tanya Kris',
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI2ODQ2ODg',
            webResource: {
              text: 'Tanya Kris',
              url: 'https://staging.toptal.net/platform/staff/company_representatives/2684688'
            }
          },
          {
            fullName: 'Garnett Bogan',
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI3ODM3OTQ',
            webResource: {
              text: 'Garnett Bogan',
              url: 'https://staging.toptal.net/platform/staff/company_representatives/2783794'
            }
          }
        ]
      }
    },
    subtype: 'DISPUTE_OR_INVESTIGATION',
    type: 'JOB_RELATED',
    updatedAt: '2021-10-28T19:55:05+02:00'
  }
]

describe('getNotesFromNodes', () => {
  it('merges the notes based on __typename', () => {
    const result = getNotesFromNodes(NOTES)

    expect(result).toStrictEqual(EXPECTED_RESULT)
  })
})
