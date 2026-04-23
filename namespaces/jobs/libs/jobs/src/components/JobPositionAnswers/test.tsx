import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobPositionAnswers, { JobPositionAnswer } from './JobPositionAnswers'

const jobPositionAnswersMock = [
  {
    id: 'a-id-1',
    jobPositionQuestion: {
      id: 'job-pos-q-id-x',
      template: {
        id: 'template-id-x',
        slug: 'working_engagement'
      },
      updatedAt: '2021-07-28T21:06:39+03:00'
    },
    value: 'This part was obfuscated, some content was here.',
    jobPositionQuestionFullRender:
      "What's the soonest time that you would be available for an interview?",
    updatedAt: '2021-07-28T22:11:06+03:00',
    talent: {
      id: 'VjEtVGFsZW50LTI1Njc0MDk',
      mainBookingPage: {
        id: 'main-booking-id-1',
        slug: 'BookingPage9177',
        __typename: 'BookingPage'
      }
    }
  },
  {
    id: 'a-id-2',
    jobPositionQuestion: {
      id: 'job-pos-q-id-y',
      template: {
        id: 'template-id-y',
        slug: 'confirm_availability'
      },
      updatedAt: '2021-07-28T21:06:39+03:00'
    },
    value: 'This part was obfuscated, some content was here.',
    jobPositionQuestionFullRender:
      'This job expects you to be available for 40 hours per week. Please confirm that you can guarantee that availability.',
    updatedAt: '2021-07-28T22:11:06+03:00',
    talent: {
      id: 'VjEtVGFsZW50LTI1Njc0MDk',
      mainBookingPage: {
        id: 'main-booking-id-2',
        slug: 'BookingPage9177',
        __typename: 'BookingPage'
      }
    }
  },
  {
    id: 'a-id-3',
    jobPositionQuestion: {
      id: 'job-pos-q-id-z',
      template: {
        id: 'template-id-z',
        slug: 'working_engagement'
      },
      updatedAt: '2021-07-28T21:06:39+03:00'
    },
    value: 'This part was obfuscated, some content was here.',
    jobPositionQuestionFullRender:
      'How soon can you start working on this role/position?',
    updatedAt: '2021-07-28T22:11:06+03:00',
    talent: {
      id: 'VjEtVGFsZW50LTI1Njc0MDk',
      mainBookingPage: {
        id: 'main-booking-id-3',
        slug: 'BookingPage9177'
      }
    }
  }
]

interface Props {
  jobPositionAnswers?: JobPositionAnswer[]
}
const arrangeTest = ({ jobPositionAnswers }: Props) =>
  render(
    <TestWrapper>
      <JobPositionAnswers jobPositionAnswers={jobPositionAnswers} />
    </TestWrapper>
  )

describe('JobPositionAnswers', () => {
  it('renders questions and answers', async () => {
    const { getByTestId, getAllByTestId } = arrangeTest({
      jobPositionAnswers: jobPositionAnswersMock as [JobPositionAnswer]
    })

    expect(getByTestId('job-position-answers-note-card')).toBeInTheDocument()
    expect(getAllByTestId('matcher-question')).toHaveLength(
      jobPositionAnswersMock.length
    )
  })

  it('hides the section if answers are not provided', async () => {
    const { queryByTestId } = arrangeTest({})

    expect(queryByTestId('job-position-answers-note-card')).toBeNull()
  })

  it('shows extra info when question template slug is [time_interview]`', async () => {
    const jobPositionAnswer = {
      id: 'a-id-5',
      talent: {
        id: 'VjEtVGFsZW50LTI1Njc0MDk',
        mainBookingPage: {
          id: 'booking-page-id',
          slug: 'BookingPage9177'
        }
      },
      jobPositionQuestion: {
        id: 'yyy',
        template: {
          id: 'xxx',
          slug: 'time_interview'
        },
        updatedAt: '2021-07-28T21:06:39+03:00'
      }
    }

    const { getByTestId } = arrangeTest({
      jobPositionAnswers: [jobPositionAnswer as JobPositionAnswer]
    })

    expect(getByTestId('booking-page')).toBeInTheDocument()
  })
})
