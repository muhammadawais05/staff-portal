import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'

import OperationWrapper from './OperationWrapper'

jest.mock('../OperationTooltipContent')
jest.mock('@staff-portal/ui/src/components/LazyTooltip')

const arrangeTest = (props: {
  operation: Operation
  tooltipTextOnEnabled?: string
  tooltipTextOnDisabled?: string
}) => {
  return render(
    <TestWrapper>
      <OperationWrapper {...props} />
    </TestWrapper>
  )
}

describe('OperationWrapper', () => {
  describe('when operation is Enabled', () => {
    let operation: Operation
    const tooltipTextOnEnabled = 'On Enabled'

    beforeEach(() => {
      operation = {
        callable: OperationCallableTypes.ENABLED,
        messages: ['Backend Message']
      }
    })

    describe('when "tooltipTextOnEnabled" prop passed', () => {
      it('renders "tooltipTextOnEnabled" prop instead of operations.messages', async () => {
        arrangeTest({ operation, tooltipTextOnEnabled })

        expect(
          await screen.findByTestId('LazyTooltip-content')
        ).toHaveTextContent(tooltipTextOnEnabled)
      })
    })

    describe('when "tooltipTextOnEnabled" prop missed', () => {
      it('renders operations.messages', async () => {
        arrangeTest({
          operation
        })

        expect(
          await screen.findByTestId('LazyTooltip-content')
        ).toHaveTextContent(JSON.stringify(operation.messages))
      })
    })

    describe('when "tooltipTextOnEnabled" prop missed and operations.messages are empty', () => {
      it('renders no tooltip', () => {
        arrangeTest({
          operation: { ...operation, messages: [] }
        })

        expect(
          screen.queryByTestId('LazyTooltip-content')
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('when operation is Disabled', () => {
    let operation: Operation
    const tooltipTextOnDisabled = 'On Disabled'

    beforeEach(() => {
      operation = {
        callable: OperationCallableTypes.DISABLED,
        messages: ['Backend Message']
      }
    })

    describe('when "tooltipTextOnDisabled" prop passed', () => {
      it('renders "tooltipTextOnDisabled" prop instead of operation.messages', async () => {
        arrangeTest({ operation, tooltipTextOnDisabled })

        expect(
          await screen.findByTestId('LazyTooltip-content')
        ).toHaveTextContent(tooltipTextOnDisabled)
      })
    })

    describe('when "tooltipTextOnDisabled" prop missed', () => {
      it('renders operation.messages', async () => {
        arrangeTest({ operation })

        expect(
          await screen.findByTestId('LazyTooltip-content')
        ).toHaveTextContent(JSON.stringify(operation.messages))
      })
    })

    describe('when "tooltipTextOnDisabled" prop missed and operation.messages are empty', () => {
      it('renders no tooltip', () => {
        arrangeTest({
          operation: { ...operation, messages: [] }
        })

        expect(
          screen.queryByTestId('LazyTooltip-content')
        ).not.toBeInTheDocument()
      })
    })
  })
})
