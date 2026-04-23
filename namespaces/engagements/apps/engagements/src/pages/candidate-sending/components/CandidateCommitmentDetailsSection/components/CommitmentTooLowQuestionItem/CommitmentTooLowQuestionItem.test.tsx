import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

import CommitmentTooLowQuestionItem, {
  Props
} from './CommitmentTooLowQuestionItem'
import { AvailabilityStepTalentAvailabilityDataFragment } from '../../../../data/get-availability-step-talent-availability-data'

const renderComponent = ({
  availabilityData,
  commitment,
  commitmentTooLow
}: Props) => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <CommitmentTooLowQuestionItem
          availabilityData={availabilityData}
          commitment={commitment}
          commitmentTooLow={commitmentTooLow}
        />
      </Form>
    </TestWrapper>
  )
}

describe('CommitmentTooLowQuestionItem', () => {
  describe('when `commitmentTooLow` value is `true`', () => {
    it('renders the component', () => {
      renderComponent({
        availabilityData: {} as AvailabilityStepTalentAvailabilityDataFragment,
        commitment: EngagementCommitmentEnum.FULL_TIME,
        commitmentTooLow: true
      })

      expect(
        screen.queryByText(
          "You're trying to send a talent with 40 hours of availability to a full-time job."
        )
      ).toBeInTheDocument()
      expect(
        screen.queryByText(
          "I've verified with my pod lead that I can override and send this talent."
        )
      ).toBeInTheDocument()
    })
  })

  describe('when `commitmentTooLow` value is `false`', () => {
    it('does not render the component', () => {
      renderComponent({
        availabilityData: {} as AvailabilityStepTalentAvailabilityDataFragment,
        commitment: EngagementCommitmentEnum.FULL_TIME,
        commitmentTooLow: false
      })

      expect(
        screen.queryByText(
          "I've verified with my pod lead that I can override and send this talent."
        )
      ).not.toBeInTheDocument()
    })
  })
})
