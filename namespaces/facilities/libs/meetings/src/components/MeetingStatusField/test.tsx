import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MeetingStatus, MeetingOutcome } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { OUTCOME_MAPPING, STATUS_MAPPING } from '../../config'
import MeetingStatusField, { Props } from './MeetingStatusField'

const ORGANIZER_NAME = 'test'
const STATUS = MeetingStatus.COMPLETED
const STATUS_TEXT = STATUS_MAPPING[STATUS].text

const createMockProps = (props?: Partial<Props>): Props => ({
  status: props?.status || STATUS,
  outcome: null,
  comment: null,
  organizer: {
    id: '1',
    fullName: ORGANIZER_NAME,
    webResource: { url: '', text: '' }
  },
  ...props
})

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <MeetingStatusField {...props} />
    </TestWrapper>
  )

describe('MeetingStatusField', () => {
  it('should show status without outcome', () => {
    arrangeTest(createMockProps())

    expect(screen.getByText(STATUS_TEXT)).toBeInTheDocument()
  })

  it('should show status', async () => {
    arrangeTest(createMockProps({ status: MeetingStatus.COMPLETED }))
    expect(screen.getByText(STATUS_TEXT)).toBeInTheDocument()
  })

  it('should show status, outcome and comment for failed meeting', async () => {
    const COMMENT = 'test comment'
    const OUTCOME = MeetingOutcome.RESCHEDULING_REQUIRED
    const OUTCOME_TEXT = OUTCOME_MAPPING[OUTCOME]
    const statusText = STATUS_MAPPING[MeetingStatus.FAILED].text
    const COMBINED_STATUS = `${statusText} - ${OUTCOME_TEXT}`

    arrangeTest(
      createMockProps({
        status: MeetingStatus.FAILED,
        outcome: OUTCOME,
        comment: COMMENT
      })
    )

    expect(screen.getByText(COMBINED_STATUS)).toBeInTheDocument()

    fireEvent.mouseOver(screen.getByText(COMBINED_STATUS))

    expect(
      await screen.findByText(`Reason: ${OUTCOME_TEXT}`)
    ).toBeInTheDocument()
    expect(
      screen.getByText(`Comment by ${ORGANIZER_NAME}: ${COMMENT}`)
    ).toBeInTheDocument()
  })

  it('should show No comment in tooltip when there is no comment', async () => {
    const COMMENT = ''
    const OUTCOME = MeetingOutcome.RESCHEDULING_REQUIRED
    const statusText = STATUS_MAPPING[MeetingStatus.FAILED].text
    const COMBINED_STATUS = `${statusText} - ${OUTCOME_MAPPING[OUTCOME]}`

    arrangeTest(
      createMockProps({
        status: MeetingStatus.FAILED,
        outcome: OUTCOME,
        comment: COMMENT
      })
    )

    fireEvent.mouseOver(screen.getByText(COMBINED_STATUS))

    expect(
      await screen.findByText(
        `Comment by ${ORGANIZER_NAME}: No comment was provided`
      )
    ).toBeInTheDocument()
  })
})
