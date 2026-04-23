import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client, ClientCumulativeStatus } from '@staff-portal/graphql/staff'

import {
  getClientOperations,
  getNoteOperations
} from '~integration/mocks/fragments'

export const getClientBillingInformationNotesResponse = (
  client?: Partial<Client>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      cumulativeStatus: ClientCumulativeStatus.PENDING_TOS,
      fullName: 'DuBuque, Cruickshank and Volkman',
      operations: getClientOperations(),
      billingInformationNotes: {
        nodes: [
          {
            comment: '',
            createdAt: '2020-06-09T19:31:59-03:00',
            creator: {
              fullName: 'Meagon Ortiz',
              id: 'VjEtU3RhZmYtMTIyNzE4Mg',
              email: 'meag-f70bccd8bd5ddf2d@toptal.io',
              __typename: 'Staff',
              webResource: {
                text: 'Meagon Ortiz',
                url: 'https://staging.toptal.net/platform/staff/staff/1227182',
                __typename: 'Link'
              }
            },
            id: 'VjEtTm90ZS0xMTA4NzQ4',
            newSalesCall: false,
            checklistSalesCall: false,
            operations: getNoteOperations(),
            screeningCall: false,
            title: 'Billing information: ',
            updatedAt: '2020-06-09T19:31:59-03:00',
            __typename: 'Note',
            status: 'ACTIVE',
            attachment: null,
            answers: {
              nodes: [
                {
                  id: 'VjEtTm90ZUFuc3dlci00MTQwOTI0',
                  comment: '',
                  label: 'Platform',
                  value: ['Platform'],
                  displayText: 'Platform',
                  question: {
                    id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMjUz',
                    label: 'Billing per platform or custom?',
                    group: {
                      label: 'Billing Information',
                      __typename: 'NoteQuestionGroup'
                    },
                    __typename: 'NoteQuestion'
                  },
                  __typename: 'NoteAnswer'
                }
              ],
              __typename: 'NoteAnswerConnection'
            },
            softSkillRatings: {
              nodes: [],
              __typename: 'SoftSkillRatingConnection'
            }
          }
        ],
        __typename: 'NoteConnection'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
