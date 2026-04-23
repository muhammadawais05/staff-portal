import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import {
  EngagementStatus,
  InterviewStatus,
  Scalars
} from '@staff-portal/graphql/staff'

import InterviewTimes, { Props } from './InterviewTimes'

jest.mock('../InterviewTime', () => ({
  __esModule: true,
  default: ({ interviewTime }: { interviewTime: string }) => (
    <div data-testid='interview-time'>{interviewTime}</div>
  )
}))

const arrangeTest = (props: Props) => render(<InterviewTimes {...props} />)

describe('InterviewTimes', () => {
  describe('when engagement is REVIEWED, and interview is PENDING', () => {
    it('renders nothing', () => {
      arrangeTest({
        engagement: { status: EngagementStatus.REVIEWED },
        interview: {
          status: InterviewStatus.PENDING,
          interviewTime: '2021-06-15T08:30:00-04:00',
          scheduledAtTimes: ['2021-06-15T08:30:00-04:00'],
          timeZone: {
            name: '',
            value: ''
          }
        }
      })

      expect(screen.queryByTestId('interview-time')).not.toBeInTheDocument()
    })
  })

  it('renders all scheduled interview times', () => {
    arrangeTest({
      engagement: { status: EngagementStatus.REVIEWED },
      interview: {
        status: InterviewStatus.SCHEDULED,
        interviewTime: '2021-06-15T08:30:00-04:00',
        scheduledAtTimes: [
          '2022-01-01T00:00:00+00:00',
          '2022-01-02T00:00:00+00:00'
        ],
        timeZone: {
          name: '',
          value: ''
        }
      }
    })

    expect(screen.getAllByTestId('interview-time')).toHaveLength(2)
  })

  it('renders one interview time', () => {
    const INTERVIEW_TIME: Scalars['Time'] = '2022-01-01T00:00:00+00:00'

    arrangeTest({
      engagement: { status: EngagementStatus.REVIEWED },
      interview: {
        status: InterviewStatus.SCHEDULED,
        interviewTime: INTERVIEW_TIME,
        scheduledAtTimes: ['2021-06-15T08:30:00-04:00'],
        timeZone: {
          name: '',
          value: ''
        }
      }
    })

    expect(screen.getByTestId('interview-time')).toHaveTextContent(
      INTERVIEW_TIME
    )
  })
})
