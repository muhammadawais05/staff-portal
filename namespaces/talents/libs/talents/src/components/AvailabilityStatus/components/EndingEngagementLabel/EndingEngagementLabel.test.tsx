import React, { ComponentProps } from 'react'
import { formatDistanceToNow, parseISO } from '@staff-portal/date-time-utils'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import MockDate from 'mockdate'

import { createEndingEngagementMock } from '../../../../data/talent-availability-fragment/mocks'
import EndingEngagementLabel from './EndingEngagementLabel'

const arrangeTest = (props: ComponentProps<typeof EndingEngagementLabel>) =>
  render(
    <TestWrapper>
      <EndingEngagementLabel {...props} />
    </TestWrapper>
  )

const endingEngagement = createEndingEngagementMock({
  commitment: EngagementCommitmentEnum.FULL_TIME,
  endDate: '2022-01-02',
  proposedEnd: null
})

describe('EndingEngagementLabel', () => {
  beforeAll(() => {
    MockDate.set('2022-01-01')
  })

  it('shows message with commitment, engagement, end date, and claimer', () => {
    const { container } = arrangeTest({
      endingEngagement
    })
    const engagement = endingEngagement.webResource
    const endPeriod = formatDistanceToNow(
      parseISO(endingEngagement.endDate ?? '')
    )
    const claimer = endingEngagement.job?.claimer?.fullName ?? ''
    const claimerUrl = endingEngagement.job?.claimer?.webResource?.url

    expect(container).toHaveTextContent(
      `Current full-time engagement ${engagement.text} ends in ${endPeriod}. Contact ${claimer}.`
    )
    expect(screen.getByText(engagement.text)).toHaveAttribute(
      'href',
      engagement.url
    )
    expect(screen.getByText(claimer)).toHaveAttribute('href', claimerUrl)
  })

  it('shows proposed date if end date is not defined', () => {
    const endingEngagementWithProposedEnd: ComponentProps<
      typeof EndingEngagementLabel
    >['endingEngagement'] = {
      ...endingEngagement,
      endDate: null,
      proposedEnd: {
        endDate: '2022-01-06'
      }
    }
    const { container } = arrangeTest({
      endingEngagement: endingEngagementWithProposedEnd
    })
    const endPeriod = formatDistanceToNow(
      parseISO(endingEngagementWithProposedEnd.proposedEnd?.endDate ?? '')
    )

    expect(container).toHaveTextContent(endPeriod)
  })

  it('renders nothing if engagement has no end date', () => {
    const endingEngagementWithNoEndDate = {
      ...endingEngagement,
      endDate: null,
      proposedEnd: null
    }
    const { container } = arrangeTest({
      endingEngagement: endingEngagementWithNoEndDate
    })

    expect(container.firstChild).toBeEmptyDOMElement()
  })

  it('renders nothing if engagement job has no claimer', () => {
    const endingEngagementWithNoclaimer = {
      ...endingEngagement,
      job: {
        ...endingEngagement.job,
        id: '312',
        claimer: null
      }
    }
    const { container } = arrangeTest({
      endingEngagement: endingEngagementWithNoclaimer
    })

    expect(container.firstChild).toBeEmptyDOMElement()
  })
})
