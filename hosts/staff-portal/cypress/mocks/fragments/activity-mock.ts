import { ActivityType } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { ActivityFragment } from '@staff-portal/activities'

import { WithTypename } from '~integration/types'
import { webResourceMock } from '.'
import { enabledOperationMock } from '../enabled-operation-mock'

export const activityMock = (
  activity?: Partial<ActivityFragment>
): WithTypename<ActivityFragment> => ({
  __typename: 'Activity',
  id: encodeEntityId('123', 'Activity'),
  type: ActivityType.JOB_RELATED,
  subtype: 'TALENT_INTERVIEW',
  activityContactRoles: {
    nodes: []
  },
  outcome: 'COMPLETED',
  createdAt: '2021-05-26T00:46:24+03:00',
  updatedAt: '2021-10-12T07:49:34+03:00',
  occurredAt: '2021-05-25T06:00:00+03:00',
  details: 'Nisi officiis et accusantium enim.',
  duration: 5,
  subject: {
    id: 'VjEtQ2xpZW50LTQ5MTg1Mg',
    representatives: {
      nodes: [
        {
          id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIzMjE1ODY',
          ...webResourceMock(),
          fullName: 'Sterling Daniel'
        }
      ]
    }
  },
  operations: {
    updateActivity: enabledOperationMock(),
    removeActivity: enabledOperationMock()
  },
  role: {
    id: 'VjEtU3RhZmYtNDAzNDYx',
    ...webResourceMock()
  },
  ...activity
})
