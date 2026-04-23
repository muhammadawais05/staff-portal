import { encodeEntityId } from '@staff-portal/data-layer-service'
import { CallbackRequest, ContactType } from '@staff-portal/graphql/staff'

import { timeZoneMock } from '~integration/mocks/fragments/time-zone-mock'
import { hiddenOperationMock } from '../hidden-operation-mock'
import { getCallRequestOperationsMock } from './get-call-request-operations-mock'

export const getCallRequestMock = (callRequest?: Partial<CallbackRequest>) => ({
  id: encodeEntityId('123', 'CallbackRequest'),
  claimedAt: null,
  createdAt: '2022-02-09T22:56:17+03:00',
  purpose: 'Sales',
  requestedStartTime: '2022-02-10T09:30:00+03:00',
  name: 'Mithilesh',
  status: 'pending',
  type: 'scheduled',
  late: true,
  isNew: false,
  overlappingMeetings: null,
  obscureLead: false,
  job: null,
  claimer: null,
  contacts: {
    nodes: [
      {
        id: 'VjEtQ29udGFjdC1waG9uZSMrOTE5NDUzOTk2NTMy',
        type: ContactType.PHONE,
        value: '+919453996532',
        __typename: 'Contact'
      }
    ],
    __typename: 'ContactConnection'
  },
  inWorkingHours: true,
  client: {
    id: 'VjEtQ2xpZW50LTYxODI0Nw',
    roleFlags: {
      nodes: [
        {
          id: 'VjEtUm9sZUZsYWctODMyMDAw',
          comment: 'This part was obfuscated, some content was here.',
          flaggedBy: null,
          createdAt: '2022-02-09T22:55:28+03:00',
          updatedAt: '2022-02-09T22:55:28+03:00',
          flag: {
            id: 'VjEtRmxhZy0yMA',
            color: null,
            title: 'Geofix',
            __typename: 'Flag'
          },
          operations: {
            removeRoleFlag: hiddenOperationMock(),
            updateRoleFlag: hiddenOperationMock(),
            __typename: 'RoleFlagOperations'
          },
          __typename: 'RoleFlag'
        }
      ],
      __typename: 'RoleFlagConnection'
    },
    claimer: null,
    contact: {
      id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTMyMjU1MDI',
      fullName: 'Floyd Torp',
      contacts: {
        nodes: [
          {
            id: 'VjEtQ29udGFjdC0zNTUzNTgz',
            type: 'PHONE',
            value: '+919453996532',
            __typename: 'Contact'
          }
        ],
        __typename: 'ContactConnection'
      },
      __typename: 'CompanyRepresentative'
    },
    createdAt: '2022-02-09T22:55:28+03:00',
    timeZone: timeZoneMock({
      name: '(UTC+02:00) Europe - Berlin',
      value: 'Europe/Berlin'
    }),
    fullName: 'Hartmann-Sawayn RC',
    photo: null,
    netTerms: 30,
    country: {
      name: 'India',
      id: 'VjEtQ291bnRyeS0xMDI',
      __typename: 'Country'
    },
    webResource: {
      __typename: 'Link',
      url: 'https://staging.toptal.net/platform/staff/engagements/123',
      text: 'test'
    },
    __typename: 'Client'
  },
  ...callRequest,
  operations: getCallRequestOperationsMock(callRequest?.operations),
  __typename: 'CallbackRequest'
})
