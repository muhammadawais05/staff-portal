/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  NoteQuestion,
  NoteQuestionConnection,
  NoteQuestionKind,
  NoteQuestionCommentType
} from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'

export const matchingNoteQuestionsMock = (
  questions?: Partial<NoteQuestionConnection>
): WithTypename<NoteQuestionConnection> => ({
  __typename: 'NoteQuestionConnection',
  nodes: [
    {
      kind: NoteQuestionKind.RADIO_BUTTONS,
      hint: null,
      commentType: NoteQuestionCommentType.LONG,
      additionalCommentsHint: 'Add comment',
      required: true,
      activeOptions: {
        nodes: [
          {
            id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODM0',
            label: 'Small team of 2 - 6 talent',
            value: 'Small team of 2 - 6 talent',
            __typename: 'NoteQuestionOption'
          },
          {
            id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODM1',
            label: 'Large team of 7 or more talent',
            value: 'Large team of 7 or more talent',
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
    } as unknown as NoteQuestion,
    {
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
          },
          {
            id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODQx',
            label:
              "The job doesn't require management and talent can self-manage",
            value:
              "The job doesn't require management and talent can self-manage",
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
    } as unknown as NoteQuestion,
    {
      kind: NoteQuestionKind.RADIO_BUTTONS,
      hint: null,
      commentType: NoteQuestionCommentType.LONG,
      additionalCommentsHint: 'Add comment',
      required: true,
      activeOptions: {
        nodes: [
          {
            id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODQ5',
            label: 'Short-term fix',
            value: 'Short-term fix',
            __typename: 'NoteQuestionOption'
          },
          {
            id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODUw',
            label: 'Consultancy',
            value: 'Consultancy',
            __typename: 'NoteQuestionOption'
          },
          {
            id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODUx',
            label: 'Other',
            value: 'Other',
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
    } as unknown as NoteQuestion,
    {
      kind: NoteQuestionKind.RADIO_BUTTONS,
      hint: null,
      commentType: NoteQuestionCommentType.LONG,
      additionalCommentsHint: 'Add comment',
      required: true,
      activeOptions: {
        nodes: [
          {
            id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODUz',
            label: 'Within 1 week',
            value: 'Within 1 week',
            __typename: 'NoteQuestionOption'
          },
          {
            id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODU0',
            label: 'Within 2 / 3 weeks',
            value: 'Within 2 / 3 weeks',
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
    } as unknown as NoteQuestion,
    {
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
    } as unknown as NoteQuestion,
    {
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
          },
          {
            id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODYx',
            label: 'Medium quality',
            value: 'Medium quality',
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
    } as unknown as NoteQuestion,
    {
      kind: NoteQuestionKind.RADIO_BUTTONS,
      hint: null,
      commentType: null,
      additionalCommentsHint: null,
      required: true,
      activeOptions: {
        nodes: [
          {
            id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODY2',
            label: '1-3 days',
            value: '1-3 days',
            __typename: 'NoteQuestionOption'
          },
          {
            id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODY3',
            label: '4-5 days',
            value: '4-5 days',
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
    } as unknown as NoteQuestion,
    {
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
    } as unknown as NoteQuestion
  ],
  totalCount: 12,
  ...questions
})
