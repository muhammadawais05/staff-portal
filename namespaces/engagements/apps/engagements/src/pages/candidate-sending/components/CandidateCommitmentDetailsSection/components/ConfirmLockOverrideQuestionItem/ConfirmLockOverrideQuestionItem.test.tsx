import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'

import ConfirmLockOverrideQuestionItem, {
  Props
} from './ConfirmLockOverrideQuestionItem'

const renderComponent = ({ lockOverrideRequired }: Props) => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <ConfirmLockOverrideQuestionItem
          lockOverrideRequired={lockOverrideRequired}
        />
      </Form>
    </TestWrapper>
  )
}

describe('ConfirmLockOverrideQuestionItem', () => {
  const checkboxText =
    "I've verified with my pod lead that I can override and send this talent"

  describe('when `lockOverrideRequired` value is `true`', () => {
    it('renders the component', () => {
      renderComponent({
        lockOverrideRequired: true
      })

      expect(screen.queryByText(checkboxText)).toBeInTheDocument()
    })
  })

  describe('when `lockOverrideRequired` value is `false`', () => {
    it('does not render the component', () => {
      renderComponent({
        lockOverrideRequired: false
      })

      expect(screen.queryByText(checkboxText)).not.toBeInTheDocument()
    })
  })
})
