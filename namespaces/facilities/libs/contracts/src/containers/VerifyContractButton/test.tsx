import React from 'react'
import { render, screen } from '@testing-library/react'
import { OperationCallableTypes, Operation } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import VerifyContractButton from './VerifyContractButton'

const onMutationSuccess = jest.fn()
const enabledOperation = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}
const hiddenOperation = {
  callable: OperationCallableTypes.HIDDEN,
  messages: []
}

const arrangeTest = ({
  contractId = 'ac73ps',
  operation = enabledOperation,
  hasLongLabel = true
}: {
  contractId?: string
  operation?: Operation
  hasLongLabel?: boolean
}) =>
  render(
    <TestWrapper>
      <VerifyContractButton
        onMutationSuccess={onMutationSuccess}
        contractId={contractId}
        hasLongLabel={hasLongLabel}
        operation={operation}
      />
    </TestWrapper>
  )

describe('VerifyContractButton', () => {
  describe('when verify contract operation is enabled', () => {
    it('renders the verify contract button', () => {
      arrangeTest({})

      expect(screen.getByTestId('verify-button')).toBeInTheDocument()
      expect(screen.getByTestId('verify-button')).toHaveTextContent(
        'Verify Contract'
      )
    })
  })

  describe('when verify contract operation is hidden', () => {
    it('does not render verify contract button', () => {
      arrangeTest({ operation: hiddenOperation })

      expect(screen.queryByTestId('verify-button')).not.toBeInTheDocument()
    })
  })

  describe('when verify contract button has not long label', () => {
    it('renders the verify button', () => {
      arrangeTest({ hasLongLabel: false })

      expect(screen.getByTestId('verify-button')).toBeInTheDocument()
      expect(screen.getByTestId('verify-button')).toHaveTextContent('Verify')
    })
  })
})
