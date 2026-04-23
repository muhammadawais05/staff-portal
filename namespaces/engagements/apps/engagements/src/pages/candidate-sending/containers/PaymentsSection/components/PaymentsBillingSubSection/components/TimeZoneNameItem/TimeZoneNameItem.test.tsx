import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'
import { NewEngagementWizardAttributes } from '@staff-portal/graphql/staff'
import { Form } from '@toptal/picasso-forms'

import { useCandidateSendingContext } from '../../../../../../hooks'
import TimeZoneNameItem from './TimeZoneNameItem'

const TALENT_TYPE = 'Developer'

jest.mock('../../../../../../hooks', () => ({
  useCandidateSendingContext: jest.fn()
}))

jest.mock('@staff-portal/facilities', () => ({
  ...jest.requireActual('@staff-portal/facilities'),
  getRoleTypeText: () => TALENT_TYPE
}))

jest.mock('@staff-portal/forms', () => ({
  FormTimeZoneSelect: () => <div />
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock

const renderComponent = (stepsAttributes?: NewEngagementWizardAttributes) => {
  useCandidateSendingContextMock.mockReturnValue({
    stepsAttributes
  })

  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <TimeZoneNameItem talentType={TALENT_TYPE} />
      </Form>
    </TestWrapper>
  )
}

describe('TimeZoneNameItem', () => {
  describe('when `hasPendingAssignment` is falsy', () => {
    it('does not render component', () => {
      renderComponent({ hasPendingAssignment: false })

      expect(
        screen.queryByText('What time zone start date is defined in?')
      ).not.toBeInTheDocument()
    })
  })

  describe('when `hasPendingAssignment` is truthy', () => {
    it('renders component', () => {
      renderComponent({ hasPendingAssignment: true })

      expect(
        screen.getByText('What time zone start date is defined in?')
      ).toBeInTheDocument()
    })
  })
})
