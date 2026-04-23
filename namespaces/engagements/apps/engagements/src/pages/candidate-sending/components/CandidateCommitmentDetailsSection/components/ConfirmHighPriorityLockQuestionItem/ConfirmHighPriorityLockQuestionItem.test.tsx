import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import ConfirmHighPriorityLockQuestionItem, {
  Props
} from './ConfirmHighPriorityLockQuestionItem'

const renderComponent = ({ acquireHighPriorityLockOperation }: Props) => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <ConfirmHighPriorityLockQuestionItem
          acquireHighPriorityLockOperation={acquireHighPriorityLockOperation}
        />
      </Form>
    </TestWrapper>
  )
}

describe('ConfirmHighPriorityLockQuestionItem', () => {
  const checkboxText =
    'Add a talent lock for high priority jobs (valid for 5 business days)'

  describe('when `operation` is `enabled`', () => {
    it('renders the component', () => {
      renderComponent({
        acquireHighPriorityLockOperation: createOperationMock({
          callable: OperationCallableTypes.ENABLED
        })
      })

      expect(screen.queryByText(checkboxText)).toBeInTheDocument()
    })
  })

  describe('when `operation` value is `disabled`', () => {
    it('renders the component', () => {
      renderComponent({
        acquireHighPriorityLockOperation: createOperationMock({
          callable: OperationCallableTypes.DISABLED
        })
      })

      expect(screen.queryByText(checkboxText)).toBeInTheDocument()
    })
  })

  describe('when `operation` value is `hidden`', () => {
    it('does not render the component', () => {
      renderComponent({
        acquireHighPriorityLockOperation: createOperationMock({
          callable: OperationCallableTypes.HIDDEN
        })
      })

      expect(screen.queryByText(checkboxText)).not.toBeInTheDocument()
    })
  })
})
