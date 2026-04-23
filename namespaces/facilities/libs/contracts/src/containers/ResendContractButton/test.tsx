import React from 'react'
import { render, screen } from '@testing-library/react'
import { OperationCallableTypes, Operation } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import ResendContractButton from './ResendContractButton'

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
      <ResendContractButton
        contractId={contractId}
        operation={operation}
        hasLongLabel={hasLongLabel}
        onMutationSuccess={onMutationSuccess}
      />
    </TestWrapper>
  )

describe('ResendContractButton', () => {
  describe('when resend contract operation is enabled', () => {
    it('renders the resend contract button', () => {
      arrangeTest({})

      expect(screen.getByTestId('resend-contract-button')).toBeInTheDocument()
      expect(screen.getByTestId('resend-contract-button')).toHaveTextContent(
        'Resend Contract'
      )
    })
  })

  describe('when resend contract operation is hidden', () => {
    it('does not render resend contract button', () => {
      arrangeTest({ operation: hiddenOperation })

      expect(
        screen.queryByTestId('resend-contract-button')
      ).not.toBeInTheDocument()
    })
  })

  describe('when resend contract button has not long label', () => {
    it('renders the resend button', () => {
      arrangeTest({ hasLongLabel: false })

      expect(screen.getByTestId('resend-contract-button')).toBeInTheDocument()
      expect(screen.getByTestId('resend-contract-button')).toHaveTextContent(
        'Resend'
      )
    })
  })
})
