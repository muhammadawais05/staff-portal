import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'

import TrialPeriodItem, { Props } from './TrialPeriodItem'

const renderComponent = ({ hasPendingAssignment }: Props) => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <TrialPeriodItem hasPendingAssignment={hasPendingAssignment} />
      </Form>
    </TestWrapper>
  )
}

describe('hasPendingAssignment', () => {
  describe('when `hasPendingAssignment` value is `true`', () => {
    it('renders the component', () => {
      renderComponent({
        hasPendingAssignment: true
      })

      expect(
        screen.getByText('How long was trial period for this engagement?')
      ).toBeInTheDocument()
    })
  })

  describe('when `hasPendingAssignment` value is `false`', () => {
    it('renders the component', () => {
      renderComponent({
        hasPendingAssignment: false
      })

      expect(
        screen.getByText('How long will trial period be?')
      ).toBeInTheDocument()
    })
  })
})
