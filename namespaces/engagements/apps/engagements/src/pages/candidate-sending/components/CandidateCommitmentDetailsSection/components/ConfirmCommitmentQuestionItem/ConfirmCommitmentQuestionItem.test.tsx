import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'
import { createTalentAvailabilityFragmentMock } from '@staff-portal/talents/src/mocks'

import ConfirmCommitmentQuestionItem, {
  Props
} from './ConfirmCommitmentQuestionItem'
import { AvailabilityStepTalentAvailabilityDataFragment } from '../../../../data/get-availability-step-talent-availability-data'

const renderComponent = ({
  jobCommitment,
  jobClientWebResource,
  jobExpectedWeeklyHoursWithDefault,
  talentAvailability,
  talentRoleType
}: Props) => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <ConfirmCommitmentQuestionItem
          jobCommitment={jobCommitment}
          jobClientWebResource={jobClientWebResource}
          jobExpectedWeeklyHoursWithDefault={jobExpectedWeeklyHoursWithDefault}
          talentAvailability={talentAvailability}
          talentRoleType={talentRoleType}
        />
      </Form>
    </TestWrapper>
  )
}

describe('ConfirmCommitmentQuestionItem', () => {
  const questionText =
    'Did you confirm with Job Client Name that designer commitment will be less than the desired Full-time?'
  const checkboxText =
    // The text is split into 3 lines, so to check it, we should not add spaces before and after `Unavailable (0 hours)`
    "Yes, designer's commitmentUnavailable (10 hours)has been confirmed for this job."

  const baseProps = {
    jobCommitment: 'full_time',
    jobExpectedWeeklyHoursWithDefault: 15,
    jobClientWebResource: {
      text: 'Job Client Name',
      url: 'https://staging.toptal.net/platform/staff/companies/3174851'
    },
    talentAvailability: createTalentAvailabilityFragmentMock({
      type: 'Developer',
      availableHoursIncludingEndingEngagements: 10
    }) as AvailabilityStepTalentAvailabilityDataFragment['talent'],
    talentRoleType: 'Designer'
  }

  describe('when engagement is unavailable', () => {
    it('renders the component', () => {
      renderComponent(baseProps)

      expect(
        screen.getAllByText(
          (_, element) => element?.textContent?.includes(questionText) ?? false
        )[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByText(
          (_, element) => element?.textContent?.includes(checkboxText) ?? false
        )[0]
      ).toBeInTheDocument()
    })
  })

  describe('when availability data has associated roles', () => {
    it('renders the component', () => {
      renderComponent({
        ...baseProps,
        talentAvailability: {
          ...baseProps.talentAvailability,
          associatedRoles: {
            nodes: [
              {
                ...baseProps.talentAvailability,
                type: 'ProjectManager'
              }
            ]
          }
        } as AvailabilityStepTalentAvailabilityDataFragment['talent']
      })

      expect(
        screen.getAllByText(
          (_, element) => element?.textContent?.includes(questionText) ?? false
        )[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByText(
          (_, element) => element?.textContent?.includes(checkboxText) ?? false
        )[0]
      ).toBeInTheDocument()
    })
  })

  describe('when engagement is available', () => {
    it('does not render the component', () => {
      renderComponent({
        ...baseProps,
        jobExpectedWeeklyHoursWithDefault: 5
      })

      expect(
        screen.queryByText(
          (_, element) => element?.textContent?.includes(questionText) ?? false
        )
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText(
          (_, element) => element?.textContent?.includes(checkboxText) ?? false
        )
      ).not.toBeInTheDocument()
    })
  })

  describe('when talent availability is not set', () => {
    it('does not render the component', () => {
      renderComponent({
        ...baseProps,
        talentAvailability: null
      })

      expect(
        screen.queryByText(
          (_, element) => element?.textContent?.includes(questionText) ?? false
        )
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText(
          (_, element) => element?.textContent?.includes(checkboxText) ?? false
        )
      ).not.toBeInTheDocument()
    })
  })
})
