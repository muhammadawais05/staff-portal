import {
  ActivityType,
  ActivityOutcome,
  ClientRelatedActivitySubtype,
  OperationCallableTypes,
  Client
} from '@staff-portal/graphql/staff'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import { ActivityFragment } from '../data/activity-fragment/activity-fragment.staff.gql.types'
import { getActivityContentMapping } from './get-activity-content-mapping'

jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  parseAndFormatDate: jest.fn()
}))

jest.mock('../components', () => ({
  ActivityContacts: jest.fn()
}))

const TEST_TIME_ZONE_VALUE = 'Europe/Moscow'

const activity = {
  id: 'test-id',
  type: ActivityType.CLIENT_RELATED,
  subtype: ClientRelatedActivitySubtype.PRE_SALES_CALL,
  activityContactRoles: {
    nodes: [
      {
        id: '123sd234asd12',
        fullName: 'Laurena Kassulke',
        webResource: {
          text: 'Laurena Kassulke',
          url: 'https://test.link'
        }
      },
      {
        id: '123sd234asd12',
        fullName: 'Berta Bauch',
        webResource: {
          text: 'Berta Bauch',
          url: 'https://test.link'
        }
      }
    ],
    __typename: 'RoleConnection'
  },
  subject: {
    representatives: {
      nodes: [
        {
          id: '123sd234asd12',
          fullName: 'Laurena Kassulke',
          webResource: {
            text: 'Laurena Kassulke',
            url: 'https://test.link'
          }
        }
      ]
    }
  } as Client,
  outcome: ActivityOutcome.COMPLETED,
  occurredAt: '2020-07-16T04:41:00+10:00',
  updatedAt: '2020-07-16T04:41:00+10:00',
  createdAt: '2020-07-16T04:41:00+10:00',
  details: 'Test test',
  duration: 30,
  operations: {
    updateActivity: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    removeActivity: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'ActivityOperations'
  },
  role: {
    id: '123sd234asd13',
    webResource: {
      text: 'Jane Kassulke',
      url: 'https://test.link'
    }
  },
  __typename: 'Activity'
} as ActivityFragment

describe('get-activity-content-mapping', () => {
  it('should correctly map activity schema', () => {
    const activityContent = getActivityContentMapping(
      activity,
      TEST_TIME_ZONE_VALUE
    )
    const activityContentValues = Object.values(activityContent)

    const activityType = activityContentValues.find(
      item => item.label === 'Activity Type'
    )
    const activitySubtype = activityContentValues.find(
      item => item.label === 'Activity Sub Type'
    )
    const outcome = activityContentValues.find(item => item.label === 'Outcome')

    expect(activityType?.value).toBe('Client-related')
    expect(activitySubtype?.value).toBe('Pre-sales call')
    expect(outcome?.value).toBe('Completed')
    expect(parseAndFormatDate).toHaveBeenCalledTimes(1)
    expect(parseAndFormatDate).toHaveBeenLastCalledWith(
      '2020-07-16T04:41:00+10:00',
      {
        timeZone: TEST_TIME_ZONE_VALUE
      }
    )
  })
})
