import { Interview } from '@staff-portal/graphql/staff'
import { UNDEFINED_VALUE } from '@staff-portal/date-time-utils'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import getEngagementDetailedStatus from './get-engagement-detailed-status'
import { EngagementDetailedStatusData } from '../../types'

const TALENT_TYPE = 'Finance Expert'

const arrangeTest = (
  status: EngagementCumulativeStatus,
  engagementPart: Partial<EngagementDetailedStatusData>
) => {
  const engagement = {
    cumulativeStatus: status,
    talent: {
      type: TALENT_TYPE
    },
    interviews: {
      totalCount: 0
    },
    ...engagementPart
  }

  return getEngagementDetailedStatus(engagement as EngagementDetailedStatusData)
}

const plainStatuses = [
  [EngagementCumulativeStatus.DRAFT, 'Draft'],
  [EngagementCumulativeStatus.READY_TO_SEND, 'Approved'],
  [EngagementCumulativeStatus.CANCELLED, 'Interview cancelled'],
  [EngagementCumulativeStatus.PENDING_APPROVAL, 'Pending Approval'],
  [EngagementCumulativeStatus.REJECTED_DRAFT, 'Rejected'],
  [EngagementCumulativeStatus.UNSAVED_DRAFT, 'Unsaved Draft'],
  [EngagementCumulativeStatus.EXPIRED, 'Interview expired'],
  [
    EngagementCumulativeStatus.EXPIRATION_POSTPONED,
    'Engagement expiration postponed'
  ],
  [EngagementCumulativeStatus.REJECTED_INTERVIEW, 'Rejected during interview'],
  [EngagementCumulativeStatus.INTERVIEW_PENDING, 'Not scheduled'],
  [EngagementCumulativeStatus.INTERVIEW_MISSED, 'Interview missed'],
  [EngagementCumulativeStatus.INTERVIEW_REJECTED, 'Rejected during interview'],
  [EngagementCumulativeStatus.INTERVIEW_EXPIRED, 'Interview expired']
]

describe('getEngagementDetailedStatus', () => {
  it.each(plainStatuses)(
    'returns a correct text for status %p',
    (state, copy) => {
      expect(arrangeTest(state as EngagementCumulativeStatus, {})).toBe(copy)
    }
  )

  it('returns a correct text for status PENDING, when just createdAt', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.PENDING, {
        createdAt: '2021-09-24T08:45:00-04:00'
      })
    ).toBe('Sent on Sep 24, 2021 at 8:45 AM - pending review')
  })

  it('returns a correct text for status PENDING, when just restoredAt', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.PENDING, {
        restoredAt: '2021-09-24T08:45:00-04:00'
      })
    ).toBe('Sent on Sep 24, 2021 at 8:45 AM - pending review')
  })

  it('returns a correct text for status PENDING_LEGAL, when no trial period', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.PENDING_LEGAL, {
        trialLength: 1,
        startDate: '2021-08-21'
      })
    ).toBe('Pending legal. Trial scheduled to begin Aug 21, 2021')
  })

  it('returns a correct text for status PENDING_LEGAL, when trial period', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.PENDING_LEGAL, {
        trialLength: 0,
        startDate: '2021-08-21'
      })
    ).toBe('Pending legal. Start date scheduled for Aug 21, 2021')
  })

  it('returns a correct text for status PENDING_EXPIRATION, when no interview', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.PENDING_EXPIRATION, {
        interview: null
      })
    ).toBe('Interview pending expiration, never scheduled')
  })

  it('returns a correct text for status PENDING_EXPIRATION, when no interview time', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.PENDING_EXPIRATION, {
        interview: {
          interviewTime: undefined
        } as Interview
      })
    ).toBe('Interview pending expiration, never scheduled')
  })

  it('returns a correct text for status PENDING_EXPIRATION, when interview time presents', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.PENDING_EXPIRATION, {
        interview: {
          interviewTime: '2021-08-21T00:00:00+00:00'
        } as unknown as Interview
      })
    ).toBe('Interview pending expiration, was scheduled for Aug 21, 2021')
  })

  it('returns a correct text for status SCHEDULED, when no trial period', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.SCHEDULED, {
        trialLength: 1,
        startDate: '2021-08-21'
      })
    ).toBe('Trial period starts on Aug 21, 2021')
  })

  it('returns a correct text for status SCHEDULED, when trial period', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.SCHEDULED, {
        trialLength: 0,
        startDate: '2021-08-21'
      })
    ).toBe('Start date scheduled for Aug 21, 2021')
  })

  it('returns a correct text for status ON_TRIAL', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.ON_TRIAL, {
        startDate: '2021-08-21',
        trialEndDate: '2021-09-21'
      })
    ).toBe('On trial since Aug 21, 2021 to Sep 21, 2021')
  })

  it('returns a correct text for status ON_HOLD', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.ON_HOLD, {
        onHoldStartDate: '2021-08-21'
      })
    ).toBe('On hold since Aug 21, 2021')
  })

  it('returns a correct text for status ACTIVE', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.ACTIVE, {
        startDate: '2021-08-21'
      })
    ).toBe('Active since Aug 21, 2021')
  })

  it('returns a correct text for status END_SCHEDULED', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.END_SCHEDULED, {
        startDate: '2021-08-21',
        endDate: '2021-09-21'
      })
    ).toBe('Active since Aug 21, 2021 to Sep 21, 2021')
  })

  it('returns a correct text for status CLOSED', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.CLOSED, {
        startDate: '2021-08-21',
        endDate: '2021-09-21'
      })
    ).toBe('Was active from Aug 21, 2021 to Sep 21, 2021')
  })

  it('returns a correct text for status REJECTED_TRIAL', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.REJECTED_TRIAL, {
        startDate: '2021-08-21',
        rejectDate: '2021-09-21'
      })
    ).toBe('Rejected trial from Aug 21, 2021 to Sep 21, 2021')
  })

  it('returns a correct text for status ON_BREAK', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.ON_BREAK, {
        currentEngagementBreak: {
          startDate: '2021-08-21T09:00:00-04:00',
          endDate: '2021-09-21T09:00:00-04:00'
        }
      })
    ).toBe('On break since Aug 21, 2021 till Sep 21, 2021')
  })

  it('returns a broken text for status ON_BREAK, when no Break object', () => {
    expect(arrangeTest(EngagementCumulativeStatus.ON_BREAK, {})).toBe(
      `On break since ${UNDEFINED_VALUE} till ${UNDEFINED_VALUE}`
    )
  })

  it('returns a correct text for status INTERVIEW_TIME_REJECTED', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.INTERVIEW_TIME_REJECTED, {})
    ).toBe('Interview time rejected by finance expert')
  })

  it('returns a correct text for status INTERVIEW_SCHEDULED', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.INTERVIEW_SCHEDULED, {
        interview: {
          scheduledAtTimes: [
            '2021-10-18T09:00:00-04:00',
            '2021-10-18T09:00:00-05:00',
            '2021-10-19T09:00:00-01:00',
            '2021-10-20T09:00:00-20:00'
          ]
        } as unknown as Interview
      })
    ).toBe(
      'Interview time proposed on Oct 18, 2021 and Oct 19, 2021 and Oct 20, 2021'
    )
  })

  it('returns a broken text for status INTERVIEW_SCHEDULED, when no interview', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.INTERVIEW_SCHEDULED, {
        interview: null
      })
    ).toBe(`Interview time proposed on ${UNDEFINED_VALUE}`)
  })

  it('returns a broken text for status INTERVIEW_TIME_REJECTED', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.INTERVIEW_TIME_REJECTED, {})
    ).toBe('Interview time rejected by finance expert')
  })

  it('returns a correct text for status INTERVIEW_TIME_ACCEPTED and for Top Scheduler', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.INTERVIEW_TIME_ACCEPTED, {
        interview: {
          interviewTime: '2021-09-24T09:00:00-04:00',
          meeting: {
            topSchedulerMeeting: true
          }
        } as unknown as Interview
      })
    ).toBe(
      'Interview scheduled for Sep 24, 2021 at 9:00 AM (confirmed by Top Scheduler)'
    )
  })

  it('returns a correct text for status INTERVIEW_TIME_ACCEPTED and not Top Scheduler', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.INTERVIEW_TIME_ACCEPTED, {
        interview: {
          interviewTime: '2021-09-24T09:00:00-04:00',

          meeting: {
            topSchedulerMeeting: false
          }
        } as unknown as Interview
      })
    ).toBe(
      'Interview scheduled for Sep 24, 2021 at 9:00 AM (confirmed by Finance Expert)'
    )
  })

  describe('when multiple interviews are scheduled', () => {
    it('returns a correct text for status INTERVIEW_TIME_ACCEPTED and not Top Scheduler with indication of number of interviews', () => {
      expect(
        arrangeTest(EngagementCumulativeStatus.INTERVIEW_TIME_ACCEPTED, {
          interviews: {
            totalCount: 3
          },
          interview: {
            interviewTime: '2021-09-24T09:00:00-04:00',

            meeting: {
              topSchedulerMeeting: false
            }
          } as unknown as Interview
        })
      ).toBe(
        'Interview scheduled (3) for Sep 24, 2021 at 9:00 AM (confirmed by Finance Expert)'
      )
    })
  })

  it('returns a correct text for status INTERVIEW_ACCEPTED', () => {
    expect(arrangeTest(EngagementCumulativeStatus.INTERVIEW_ACCEPTED, {})).toBe(
      'Finance Expert accepted (start date not set yet)'
    )
  })

  it('returns a correct text for status INTERVIEW_OCCURRED', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.INTERVIEW_OCCURRED, {
        interview: {
          interviewTime: '2021-09-24T09:00:00-04:00',
          verifierName: 'Jhon Dow'
        } as unknown as Interview
      })
    ).toBe(
      'Interview occurred on Sep 24, 2021 at 9:00 AM (verified by Jhon Dow)'
    )
  })

  it('returns a correct text for status INTERVIEW_OCCURRED_VERIFIED_BY_STAFF', () => {
    expect(
      arrangeTest(
        EngagementCumulativeStatus.INTERVIEW_OCCURRED_VERIFIED_BY_STAFF,
        {
          interview: {
            interviewTime: '2021-09-24T09:00:00-04:00',
            verifierName: 'Jhon Dow'
          } as unknown as Interview
        }
      )
    ).toBe(
      'Interview occurred on Sep 24, 2021 at 9:00 AM (verified by Jhon Dow)'
    )
  })

  it('returns a correct text for status INTERVIEW_NOT_OCCURRED', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.INTERVIEW_NOT_OCCURRED, {
        interview: {
          interviewTime: '2021-09-24T09:00:00-04:00',
          verifierName: 'Jhon Dow'
        } as unknown as Interview
      })
    ).toBe(
      "Interview didn't occur on Sep 24, 2021 at 9:00 AM (verified by Jhon Dow)"
    )
  })

  it('returns a correct text for status INTERVIEW_INTERNAL', () => {
    expect(
      arrangeTest(EngagementCumulativeStatus.INTERVIEW_INTERNAL, {
        internalInterview: {
          interviewTime: '2021-09-24T09:00:00-04:00',
          verifierName: 'Jhon Dow'
        } as unknown as Interview
      })
    ).toBe('Internal Interview scheduled on Sep 24, 2021')
  })
})
