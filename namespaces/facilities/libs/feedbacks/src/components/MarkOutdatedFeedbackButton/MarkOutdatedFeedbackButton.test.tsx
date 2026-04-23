import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  GetLazyOperationQuery,
  useGetLazyOperation
} from '@staff-portal/operations'

import { useMarkOutdatedFeedback } from './components/MarkOutdatedFeedbackModal/data'
import MarkOutdatedFeedbackButton from './MarkOutdatedFeedbackButton'

jest.mock(
  '@staff-portal/operations/src/components/LazyOperation/data/get-lazy-operation',
  () => ({
    __esModule: true,
    useGetLazyOperation: jest.fn()
  })
)

jest.mock('./components/MarkOutdatedFeedbackModal/data', () => ({
  _esModule: true,
  useMarkOutdatedFeedback: jest.fn()
}))

const mockReturnValues = (callable = OperationCallableTypes.ENABLED) => {
  const mockUseGetLazyOperation = useGetLazyOperation as jest.Mock
  const mockUseMarkOutdatedFeedback = useMarkOutdatedFeedback as jest.Mock

  const result = {
    node: {
      operations: {
        markOutdatedFeedback: {
          callable,
          messages: []
        }
      }
    }
  }

  mockUseGetLazyOperation.mockImplementation(
    (
      _getLazyOperationVariables,
      {
        onCompleted
      }: {
        onCompleted: (data: GetLazyOperationQuery) => void
      }
    ) => [
      () => onCompleted(result),
      {
        loading: false,
        data: {
          ...result
        }
      }
    ]
  )

  mockUseMarkOutdatedFeedback.mockReturnValue([
    () => ({
      data: {
        markOutdatedFeedback: {
          success: true,
          errors: []
        }
      }
    }),
    {
      loading: false
    }
  ])
}

const renderComponent = ({
  operation = { callable: OperationCallableTypes.ENABLED, messages: [] },
  onCompleted = () => {}
}: Partial<{ operation: Operation; onCompleted: () => void }> = {}) => {
  window.Element.prototype.scrollIntoView = jest.fn()

  return render(
    <TestWrapper>
      <MarkOutdatedFeedbackButton
        feedbackId='1'
        operation={operation}
        onCompleted={onCompleted}
      />
    </TestWrapper>
  )
}

describe('MarkOutdatedFeedbackButton', () => {
  it('renders the mark outdated button', () => {
    mockReturnValues(OperationCallableTypes.ENABLED)

    renderComponent({
      operation: { callable: OperationCallableTypes.ENABLED, messages: [] }
    })

    expect(
      screen.queryByTestId('mark-outdated-feedback-button')
    ).toBeInTheDocument()
  })

  it('hides the mark outdated button', () => {
    mockReturnValues(OperationCallableTypes.HIDDEN)

    renderComponent({
      operation: { callable: OperationCallableTypes.HIDDEN, messages: [] }
    })

    expect(
      screen.queryByTestId('mark-outdated-feedback-button')
    ).not.toBeInTheDocument()
  })
})
