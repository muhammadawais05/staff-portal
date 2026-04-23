import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  Activity,
  ActivityType,
  ClientRelatedActivitySubtype
} from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '../hidden-operation-mock'

export const getActivityNote = (activity?: Partial<Activity>) => ({
  id: encodeEntityId('123', 'Activity'),
  type: ActivityType.CLIENT_RELATED,
  subtype: ClientRelatedActivitySubtype.CLIENT_FOLLOW_UP,
  activityContactRoles: {
    nodes: [
      {
        id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTE1NDQ4NDQ',
        webResource: {
          text: "Ruben D'Amore",
          url: 'https://staging.toptal.net/platform/staff/company_representatives/1544844',
          __typename: 'Link'
        },
        __typename: 'CompanyRepresentative',
        fullName: "Ruben D'Amore"
      }
    ],
    __typename: 'RoleConnection'
  },
  outcome: 'CANCELLED',
  createdAt: '2021-12-07T14:44:06+03:00',
  updatedAt: '2021-12-07T14:44:06+03:00',
  occurredAt: '2021-12-07T14:43:57+03:00',
  details: '',
  duration: 1,
  subject: {
    id: 'VjEtQ2xpZW50LTMzNzkzOQ',
    representatives: {
      nodes: [
        {
          id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTE1NDQ4NDQ',
          webResource: {
            text: "Ruben D'Amore",
            url: 'https://staging.toptal.net/platform/staff/company_representatives/1544844',
            __typename: 'Link'
          },
          __typename: 'CompanyRepresentative',
          fullName: "Ruben D'Amore"
        }
      ],
      __typename: 'ClientRepresentativesConnection'
    },
    __typename: 'Client'
  },
  operations: {
    updateActivity: hiddenOperationMock(),
    removeActivity: hiddenOperationMock(),
    __typename: 'ActivityOperations'
  },
  role: {
    id: encodeEntityId('123', 'Staff'),
    webResource: {
      text: 'Alexander Danilenko',
      url: 'https://staging.toptal.net/platform/staff/staff/100010',
      __typename: 'Link'
    },
    __typename: 'Staff'
  },
  ...activity,
  __typename: 'Activity'
})
