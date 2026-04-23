import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  ContractKind,
  ContractStatus,
  OperationCallableTypes,
  Operation as OperationType
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import DeleteContractButton from './DeleteContractButton'

const onMutationSuccess = jest.fn()
const enabledOperation = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}
const hiddenOperation = {
  callable: OperationCallableTypes.HIDDEN,
  messages: []
}

const contractWebResource = {
  text: 'Contract name',
  url: 'https://url.com'
}

const arrangeTest = (operation: OperationType) =>
  render(
    <TestWrapper>
      <DeleteContractButton
        contractId='123'
        onMutationSuccess={onMutationSuccess}
        contractKind={ContractKind.TALENT_AGREEMENT}
        contractWebResource={contractWebResource}
        contractStatus={ContractStatus.CREATED}
        operation={operation}
      />
    </TestWrapper>
  )

describe('DeleteContractButton', () => {
  describe('when destroy contract operation si enabled', () => {
    it('renders the delete contract button', () => {
      arrangeTest(enabledOperation)

      expect(screen.getByTestId('delete-contract-button')).toBeInTheDocument()
      expect(screen.getByTestId('delete-contract-button')).toHaveTextContent(
        'Delete'
      )
    })
  })

  describe('when destroy contract operation si hidden', () => {
    it('does not render delete contract button', () => {
      arrangeTest(hiddenOperation)

      expect(
        screen.queryByTestId('delete-contract-button')
      ).not.toBeInTheDocument()
    })
  })
})
