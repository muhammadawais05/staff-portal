import {
  CumulativeJobStatus,
  PendingTalentStatus
} from '@staff-portal/graphql/staff'
import MockDate from 'mockdate'

import { toGqlVariables } from './job-list-filter-values'
import { PostedAtRadioOptionValues } from '../../types'

describe('JobListFilterValues', () => {
  beforeAll(() => MockDate.set('2020-12-30T00:20:00-03:00'))

  it('should return default GQL variables to filter the job list', () => {
    const pagination = {
      limit: 50,
      offset: 0
    }

    expect(toGqlVariables({}, pagination)).toStrictEqual({
      filter: {
        postedAt: {
          from: '2020-12-16',
          till: '2020-12-30'
        }
      },
      pagination,
      order: {
        field: 'POSTED_AT',
        direction: 'ASC'
      }
    })
  })

  it('should return custom GQL variables to filter the job list', () => {
    const pagination = {
      limit: 50,
      offset: 100
    }

    expect(
      toGqlVariables(
        {
          cumulative_statuses: [
            CumulativeJobStatus.PENDING_CLAIM.toLocaleLowerCase(),
            CumulativeJobStatus.PENDING_ENGINEER.toLocaleLowerCase()
          ],
          pending_talent_status: [
            PendingTalentStatus.ACCEPTED.toLocaleLowerCase()
          ],
          posted_at: PostedAtRadioOptionValues.LAST_30_DAYS
        },
        pagination
      )
    ).toStrictEqual({
      filter: {
        cumulativeStatuses: [
          CumulativeJobStatus.PENDING_CLAIM,
          CumulativeJobStatus.PENDING_ENGINEER
        ],
        pendingTalentStatus: [PendingTalentStatus.ACCEPTED],
        postedAt: {
          from: '2020-11-30',
          till: '2020-12-30'
        }
      },
      pagination,
      order: {
        direction: 'ASC',
        field: 'POSTED_AT'
      }
    })
  })

  it('should not include pendingTalentStatus if cumulative_status does not have PENDING_ENGINEER', () => {
    const pagination = {
      limit: 50,
      offset: 100
    }

    expect(
      toGqlVariables(
        {
          cumulative_statuses: [
            CumulativeJobStatus.PENDING_CLAIM.toLocaleLowerCase()
          ],
          pending_talent_status: [PendingTalentStatus.ACCEPTED],
          posted_at: PostedAtRadioOptionValues.LAST_30_DAYS
        },
        pagination
      )
    ).toStrictEqual({
      filter: {
        cumulativeStatuses: [CumulativeJobStatus.PENDING_CLAIM],
        postedAt: {
          from: '2020-11-30',
          till: '2020-12-30'
        }
      },
      pagination,
      order: {
        field: 'POSTED_AT',
        direction: 'ASC'
      }
    })
  })

  it('order query params are handled correctly when malformed', () => {
    const pagination = {
      limit: 50,
      offset: 0
    }

    expect(
      toGqlVariables({ sort: { order: 'ASC' } }, pagination)
    ).toStrictEqual({
      order: {
        direction: 'ASC',
        field: 'POSTED_AT'
      },
      filter: {
        postedAt: {
          from: '2020-12-16',
          till: '2020-12-30'
        }
      },
      pagination
    })
  })
})
