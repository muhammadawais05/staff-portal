import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'
import {
  CommitmentAvailability,
  EngagementStatus,
  InterviewStatus,
  Maybe
} from '@staff-portal/graphql/staff'

import getQuestionText from './get-question-text'
import { PreviousTalentEngagementForClientFragment } from '../../../../../../data/get-availability-step-data'

const renderComponent = ({
  previousTalentEngagementForClient,
  talentFullName,
  talentProfileLink
}: {
  previousTalentEngagementForClient: PreviousTalentEngagementForClientFragment
  talentFullName: string
  talentProfileLink?: Maybe<string>
}) => {
  return render(
    <TestWrapper>
      {getQuestionText({
        previousTalentEngagementForClient,
        talentFullName,
        talentProfileLink
      })}
    </TestWrapper>
  )
}

describe('getQuestionText', () => {
  const confirmationPart =
    'Are you sure you want to send this candidate to the client?'

  const baseProps = {
    previousTalentEngagementForClient: {
      id: '123',
      currentCommitment: {
        availability: CommitmentAvailability.hourly,
        adjustedCompanyRate: {
          value: 15
        },
        adjustedTalentRate: {
          value: 10
        }
      },
      job: {
        id: '123',
        webResource: {
          text: 'Job Name',
          url: ''
        }
      },
      status: EngagementStatus.ACTIVE
    } as unknown as PreviousTalentEngagementForClientFragment,
    talentFullName: 'Timofei Kachalov',
    talentProfileLink:
      'https://staging.toptal.net/platform/staff/talents/3037748'
  }

  describe.each([
    EngagementStatus.ACTIVE,
    EngagementStatus.ON_BREAK,
    EngagementStatus.END_SCHEDULED,
    EngagementStatus.CLOSED,
    EngagementStatus.ON_TRIAL
  ])(
    'when engagement status in `EngagementSuccessful` relationship (`%s`)',
    status => {
      it('returns question text for hourly availability', () => {
        const questionText = `Client and Timofei Kachalov worked together for the hourly job titled Job Name at the rate of $15.00/hour for client and $10.00/hour for talent. ${confirmationPart}`

        renderComponent({
          ...baseProps,
          previousTalentEngagementForClient: {
            ...baseProps.previousTalentEngagementForClient,
            status
          }
        })

        expect(
          screen.getAllByText(
            (_, element) =>
              element?.textContent?.includes(questionText) ?? false
          )[0]
        ).toBeInTheDocument()
      })
    }
  )

  describe('when status is `REJECTED_TRIAL`', () => {
    it('returns question text', () => {
      const questionText = `Client and Timofei Kachalov had a failed trial during the hourly job titled Job Name at the rate of $15.00/hour for client and $10.00/hour for talent. ${confirmationPart}`

      renderComponent({
        ...baseProps,
        previousTalentEngagementForClient: {
          ...baseProps.previousTalentEngagementForClient,
          status: EngagementStatus.REJECTED_TRIAL
        }
      })

      expect(
        screen.getAllByText(
          (_, element) => element?.textContent?.includes(questionText) ?? false
        )[0]
      ).toBeInTheDocument()
    })
  })

  describe('when status is `REJECTED_INTERVIEW`', () => {
    describe('when external interview status is `REJECTED`', () => {
      it('returns question text', () => {
        const questionText = `Timofei Kachalov was rejected after an interview for the hourly job titled Job Name at the rate of $15.00/hour for client and $10.00/hour for talent. ${confirmationPart}`

        renderComponent({
          ...baseProps,
          previousTalentEngagementForClient: {
            ...baseProps.previousTalentEngagementForClient,
            status: EngagementStatus.REJECTED_INTERVIEW,
            newExternalInterview: {
              id: '123',
              status: InterviewStatus.REJECTED
            }
          }
        })

        expect(
          screen.getAllByText(
            (_, element) =>
              element?.textContent?.includes(questionText) ?? false
          )[0]
        ).toBeInTheDocument()
      })
    })

    describe('when external interview status is not `REJECTED`', () => {
      it('returns question text', () => {
        const questionText = `Timofei Kachalov was rejected before an interview for the hourly job titled Job Name at the rate of $15.00/hour for client and $10.00/hour for talent. ${confirmationPart}`

        renderComponent({
          ...baseProps,
          previousTalentEngagementForClient: {
            ...baseProps.previousTalentEngagementForClient,
            status: EngagementStatus.REJECTED_INTERVIEW,
            newExternalInterview: {
              id: '123',
              status: InterviewStatus.ACCEPTED
            }
          }
        })

        expect(
          screen.getAllByText(
            (_, element) =>
              element?.textContent?.includes(questionText) ?? false
          )[0]
        ).toBeInTheDocument()
      })
    })
  })

  describe.each([EngagementStatus.CANCELLED, EngagementStatus.CANCELLED_DRAFT])(
    'when status is `%s`',
    status => {
      describe('when external interview status in `ACCEPTED`, `REJECTED`, or `MISSED`', () => {
        it.each([
          InterviewStatus.ACCEPTED,
          InterviewStatus.REJECTED,
          InterviewStatus.MISSED
        ])('returns question text', interviewStatus => {
          const questionText = `Client and Timofei Kachalov had a cancelled engagement for the hourly job titled Job Name at the rate of $15.00/hour for client and $10.00/hour for talent. ${confirmationPart}`

          renderComponent({
            ...baseProps,
            previousTalentEngagementForClient: {
              ...baseProps.previousTalentEngagementForClient,
              status,
              newExternalInterview: {
                id: '123',
                status: interviewStatus
              }
            }
          })

          expect(
            screen.getAllByText(
              (_, element) =>
                element?.textContent?.includes(questionText) ?? false
            )[0]
          ).toBeInTheDocument()
        })
      })

      describe('when external interview status in other statuses', () => {
        it.each([
          InterviewStatus.PENDING,
          InterviewStatus.SCHEDULED,
          InterviewStatus.TIME_ACCEPTED,
          InterviewStatus.TIME_REJECTED
        ])('returns question text', interviewStatus => {
          const questionText = `Client and Timofei Kachalov did not have an interview for the hourly job titled Job Name at the rate of $15.00/hour for client and $10.00/hour for talent. ${confirmationPart}`

          renderComponent({
            ...baseProps,
            previousTalentEngagementForClient: {
              ...baseProps.previousTalentEngagementForClient,
              status,
              newExternalInterview: {
                id: '123',
                status: interviewStatus
              }
            }
          })

          expect(
            screen.getAllByText(
              (_, element) =>
                element?.textContent?.includes(questionText) ?? false
            )[0]
          ).toBeInTheDocument()
        })
      })
    }
  )

  describe.each([
    EngagementStatus.DRAFT,
    EngagementStatus.ON_HOLD,
    EngagementStatus.PENDING_LEGAL,
    EngagementStatus.READY_TO_SEND
  ])(
    'when engagement status is in `TalentWasPreviouslyIntroduced` relationship (`%s`)',
    status => {
      it('returns question text', () => {
        const questionText = `Timofei Kachalov was already introduced to the client for the hourly job titled Job Name at the rate of $15.00/hour for client and $10.00/hour for talent. ${confirmationPart}`

        renderComponent({
          ...baseProps,
          previousTalentEngagementForClient: {
            ...baseProps.previousTalentEngagementForClient,
            status
          }
        })

        expect(
          screen.getAllByText(
            (_, element) =>
              element?.textContent?.includes(questionText) ?? false
          )[0]
        ).toBeInTheDocument()
      })
    }
  )

  describe.each([
    {
      availability: CommitmentAvailability.full_time,
      questionText: `Client and Timofei Kachalov worked together for the full-time job titled Job Name at the rate of $15.00/hour for client and $10.00/hour for talent. ${confirmationPart}`
    },
    {
      availability: CommitmentAvailability.part_time,
      questionText: `Client and Timofei Kachalov worked together for the part-time job titled Job Name at the rate of $15.00/hour for client and $10.00/hour for talent. ${confirmationPart}`
    },
    {
      availability: undefined,
      questionText: `Client and Timofei Kachalov worked together for the job titled Job Name at the rate of $15.00/hour for client and $10.00/hour for talent. ${confirmationPart}`
    }
  ])('when availability is %s', ({ availability, questionText }) => {
    it('returns question text', () => {
      renderComponent({
        ...baseProps,
        previousTalentEngagementForClient: {
          ...baseProps.previousTalentEngagementForClient,
          currentCommitment: {
            ...baseProps.previousTalentEngagementForClient.currentCommitment,
            availability
          },
          status: EngagementStatus.ACTIVE
        } as unknown as PreviousTalentEngagementForClientFragment
      })

      expect(
        screen.getAllByText(
          (_, element) => element?.textContent?.includes(questionText) ?? false
        )[0]
      ).toBeInTheDocument()
    })
  })
})
