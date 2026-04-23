import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'

import LockOverrideReasonItem, { Props } from './LockOverrideReasonItem'

const renderComponent = ({ lockOverrideConfirmed }: Props) => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <LockOverrideReasonItem lockOverrideConfirmed={lockOverrideConfirmed} />
      </Form>
    </TestWrapper>
  )
}

describe('LockOverrideReasonItem', () => {
  const placeholderText =
    "It's ok to send the talent to another position because..."

  describe('when `lockOverrideConfirmed` value is `true`', () => {
    it('renders the component', () => {
      renderComponent({
        lockOverrideConfirmed: true
      })

      expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument()
    })
  })

  describe('when `lockOverrideConfirmed` value is `false`', () => {
    it('does not render the component', () => {
      renderComponent({
        lockOverrideConfirmed: false
      })

      expect(
        screen.queryByPlaceholderText(placeholderText)
      ).not.toBeInTheDocument()
    })
  })
})
