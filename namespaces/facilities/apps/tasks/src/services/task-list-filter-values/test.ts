import {
  TaskFilterStatus,
  TaskOrderField,
  OrderDirection
} from '@staff-portal/graphql/staff'
import { SortOrder } from '@staff-portal/filters'

import { TaskSortOption } from '../../enums'
import { toGqlVariables } from './task-list-filter-values'

const PERFORMER_ID = 'performer-test-id'
const WATCHER_ID = 'watcher-test-id'
const FLAG_IDS = ['abc', 'def']

describe('TaskListFilterValues', () => {
  it('returns default GQL variables to filter the task list', () => {
    expect(toGqlVariables({}, { offset: 0, limit: 50 })).toStrictEqual({
      filter: {
        performerIds: undefined,
        statuses: undefined
      },
      loadCounters: false,
      loadDisputeOperations: false,
      pagination: {
        limit: 50,
        offset: 0
      },
      order: {
        field: TaskOrderField.DUE_DATE,
        direction: OrderDirection.ASC
      }
    })
  })

  it('returns custom GQL variables to filter the task list', () => {
    const pagination = { offset: 100, limit: 50 }

    expect(
      toGqlVariables(
        {
          performer_id: PERFORMER_ID,
          watcher_id: WATCHER_ID,
          flag_ids: FLAG_IDS,
          statuses: [TaskFilterStatus.PENDING],
          sort: {
            target: TaskSortOption.COMPLETED_AT,
            order: SortOrder.DESC
          }
        },
        pagination
      )
    ).toStrictEqual({
      filter: {
        performerIds: [PERFORMER_ID],
        statuses: [TaskFilterStatus.PENDING],
        watcherId: WATCHER_ID,
        flagIds: FLAG_IDS
      },
      loadCounters: false,
      loadDisputeOperations: false,
      pagination: {
        limit: 50,
        offset: 100
      },
      order: {
        field: TaskOrderField.COMPLETED_AT,
        direction: OrderDirection.DESC
      }
    })
  })

  it('works with wrong sort values', () => {
    const pagination = { offset: 100, limit: 50 }

    expect(
      toGqlVariables(
        {
          performer_id: PERFORMER_ID,
          watcher_id: WATCHER_ID,
          statuses: [TaskFilterStatus.PENDING],
          sort: {
            target: 'wrong_target',
            order: 'wrong_order'
          }
        },
        pagination
      )
    ).toStrictEqual({
      filter: {
        performerIds: [PERFORMER_ID],
        statuses: [TaskFilterStatus.PENDING],
        watcherId: WATCHER_ID
      },
      loadCounters: true,
      loadDisputeOperations: false,
      pagination: {
        limit: 50,
        offset: 100
      },
      order: {
        field: TaskOrderField.DUE_DATE,
        direction: OrderDirection.ASC
      }
    })
  })
})
