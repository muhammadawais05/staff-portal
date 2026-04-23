import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'
import { NewEngagementWizardAttributes } from '@staff-portal/graphql/staff'
import { Form } from '@toptal/picasso-forms'

import { useCandidateSendingContext } from '../../../../../../hooks'
import StartDateItem from './StartDateItem'

const TALENT_TYPE = 'Developer'

jest.mock(
  '../../../../../../hooks',
  () => ({
    useCandidateSendingContext: jest.fn()
  })
)

jest.mock('@staff-portal/facilities', () => ({
  ...jest.requireActual('@staff-portal/facilities'),
  getRoleTypeText: () => TALENT_TYPE
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock

const renderComponent = (stepsAttributes?: NewEngagementWizardAttributes) => {
  useCandidateSendingContextMock.mockReturnValue({
    stepsAttributes
  })

  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <StartDateItem talentType={TALENT_TYPE} />
      </Form>
    </TestWrapper>
  )
}

describe('StartDateItem', () => {
  describe('when `hasPendingAssignment` is falsy', () => {
    it('does not render component', () => {
      renderComponent({ hasPendingAssignment: false })

      expect(
        screen.queryByText(
          'When did developer start working on this engagement?'
        )
      ).not.toBeInTheDocument()
    })
  })

  describe('when `hasPendingAssignment` is truthy', () => {
    it('renders component', () => {
      renderComponent({ hasPendingAssignment: true })

      expect(
        screen.getByText('When did developer start working on this engagement?')
      ).toBeInTheDocument()
    })
  })
})
