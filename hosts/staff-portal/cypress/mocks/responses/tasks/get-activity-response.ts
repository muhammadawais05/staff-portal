import { Activity } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'

type Props = {
  activity?: Partial<Activity>
}

export const getActivityResponse = ({ activity }: Props = {}) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Activity'),
      __typename: 'Activity',
      type: 'CLIENT_RELATED',
      subtype: 'MATCHING_CALL',
      activityContactRoles: {
        nodes: [
          {
            id: encodeEntityId('123', 'CompanyRepresentative'),
            webResource: {
              text: 'Lillie Deckow',
              url: 'https://staging.toptal.net/platform/staff/company_representatives/908944',
              __typename: 'Link'
            },
            __typename: 'CompanyRepresentative',
            fullName: 'Lillie Deckow'
          }
        ],
        __typename: 'RoleConnection'
      },
      outcome: 'RESCHEDULED',
      createdAt: '2022-01-19T08:39:15+03:00',
      updatedAt: '2022-01-19T08:39:15+03:00',
      occurredAt: '2022-01-19T08:38:51+03:00',
      details: 'some info',
      duration: 11,
      subject: {
        id: encodeEntityId('123', 'Client'),
        representatives: {
          nodes: [],
          __typename: 'ClientRepresentativesConnection'
        },
        __typename: 'Client'
      },
      operations: {
        updateActivity: enabledOperationMock(),
        removeActivity: enabledOperationMock(),
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
      ...activity
    }
  }
})
