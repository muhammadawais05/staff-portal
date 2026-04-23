import { encodeEntityId } from '@staff-portal/data-layer-service'
import { ActivityOperations, Activity } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '.'

const talentActivitiesAndNotesMock = () => ({
  nodes: [
    {
      __typename: 'Activity',
      id: encodeEntityId('221', 'Activity'),
      type: 'JOB_RELATED',
      subtype: 'TALENT_CHECK_IN',
      activityContactRoles: {
        nodes: [],
        __typename: 'RoleConnection'
      },
      outcome: 'OTHER',
      createdAt: '2022-03-02T21:28:53+03:00',
      updatedAt: '2022-03-03T07:57:40+03:00',
      occurredAt: '2022-03-02T06:00:00+03:00',
      details:
        'Vel consectetur autem sed et asperiores. Consequatur quo alias inventore ut esse iusto. Ullam amet reprehenderit autem perferendis. Nulla id est aut aut dolorem debitis ipsum. Quis natus dolor et dolores.',
      duration: 10,
      subject: {
        id: encodeEntityId('444', 'Client'),
        representatives: {
          nodes: [
            {
              id: encodeEntityId('222', 'CompanyRepresentative'),
              webResource: {
                text: 'Shavonne Torphy',
                url: 'https://staging.toptal.net/platform/staff/company_representatives/2908672',
                __typename: 'Link'
              },
              __typename: 'CompanyRepresentative',
              fullName: 'Shavonne Torphy'
            }
          ],
          __typename: 'ClientRepresentativesConnection'
        },
        __typename: 'Client'
      },
      operations: {
        updateActivity: enabledOperationMock(),
        removeActivity: enabledOperationMock(),
        __typename: 'ActivityOperations'
      } as ActivityOperations,
      role: {
        id: encodeEntityId('555', 'Staff'),
        webResource: {
          text: 'Santiago Quiroga Ponce',
          url: 'https://staging.toptal.net/platform/staff/staff/2782233',
          __typename: 'Link'
        },
        __typename: 'Staff'
      }
    } as unknown as Activity
  ],
  totalCount: 1
})

export default talentActivitiesAndNotesMock
