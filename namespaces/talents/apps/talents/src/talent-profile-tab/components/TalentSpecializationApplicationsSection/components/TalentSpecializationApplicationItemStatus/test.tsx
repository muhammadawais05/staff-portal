import React from 'react'
import { render, screen, within } from '@testing-library/react'
import {
  SpecializationApplicationRejectionReasonValue,
  TalentSpecializationApplicationStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper, assertOnTooltip } from '@staff-portal/test-utils'
import { titleize } from '@staff-portal/string'

import TalentSpecializationApplicationItemStatus, {
  Props,
  TALENT_SPECIALIZATION_APPLICATION_STATUS_MAPPING
} from './TalentSpecializationApplicationItemStatus'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <TalentSpecializationApplicationItemStatus
        status={props.status}
        rejectionReason={props.rejectionReason}
      />
    </TestWrapper>
  )

describe('TalentSpecializationApplicationItemStatus', () => {
  it('shows the status', () => {
    const props = {
      status: TalentSpecializationApplicationStatus.APPROVED
    }

    arrangeTest(props)

    expect(
      screen.getByText(
        TALENT_SPECIALIZATION_APPLICATION_STATUS_MAPPING[props.status].text
      )
    ).toBeInTheDocument()
  })

  describe('when the status is rejected and reason is OTHER', () => {
    it('shows a tooltip with the rejection comment', () => {
      const props = {
        status: TalentSpecializationApplicationStatus.REJECTED,
        rejectionReason: {
          id: '459',
          comment: 'This is the comment',
          place: 'online_test',
          reason: SpecializationApplicationRejectionReasonValue.OTHER
        }
      }

      arrangeTest(props)

      const icon = screen.getByTestId('rejection-reason-tooltip-icon')

      assertOnTooltip(icon, tooltip => {
        expect(
          within(tooltip).getByText(
            `Rejected at ${titleize(props.rejectionReason.place)}.`
          )
        ).toBeInTheDocument()
        expect(
          within(tooltip).getByText(`Comment: ${props.rejectionReason.comment}`)
        ).toBeInTheDocument()
      })
    })
  })

  describe('when the status is rejected and the reason is not OTHER', () => {
    it('shows a tooltip with the rejection reason', () => {
      const props = {
        status: TalentSpecializationApplicationStatus.REJECTED,
        rejectionReason: {
          id: '459',
          comment: 'This is the comment',
          place: 'online_test',
          reason:
            SpecializationApplicationRejectionReasonValue.LACK_OF_EXPERIENCE
        }
      }

      arrangeTest(props)

      const icon = screen.getByTestId('rejection-reason-tooltip-icon')

      assertOnTooltip(icon, tooltip => {
        expect(
          within(tooltip).getByText(
            `Rejected at ${titleize(props.rejectionReason.place)}.`
          )
        ).toBeInTheDocument()
        expect(
          within(tooltip).getByText(
            `Reason: ${titleize(props.rejectionReason.reason)}.`
          )
        ).toBeInTheDocument()
      })
    })
  })
})
