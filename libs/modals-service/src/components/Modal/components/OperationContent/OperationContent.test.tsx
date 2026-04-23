import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  useGetOperation,
  GetLazyOperationVariables
} from '@staff-portal/operations'

import OperationContent from './OperationContent'

jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  useGetOperation: jest.fn()
}))

jest.mock('../../../ModalSuspender', () => ({
  __esModule: true,
  default: () => <div data-testid='ModalSuspender' />
}))

const useGetOperationMock = useGetOperation as jest.Mock
const mockGetOperation = (result: ReturnType<typeof useGetOperation>) => {
  useGetOperationMock.mockImplementationOnce(() => result)
}

const LOADING_TITLE = 'Loading title'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <OperationContent
        operationVariables={{} as GetLazyOperationVariables}
        defaultTitle={LOADING_TITLE}
      >
        <div data-testid='LoadedContent' />
      </OperationContent>
    </TestWrapper>
  )

describe('OperationContent', () => {
  describe('when operation check is loading', () => {
    it('renders loading state', () => {
      mockGetOperation({ enabled: false, loading: true, error: undefined })
      arrangeTest()

      expect(screen.getByTestId('ModalSuspender')).toBeInTheDocument()
    })
  })

  it('renders content', () => {
    mockGetOperation({ enabled: true, loading: false, error: undefined })
    arrangeTest()

    expect(screen.queryByTestId('ModalSuspender')).not.toBeInTheDocument()
    expect(screen.getByTestId('LoadedContent')).toBeInTheDocument()
  })

  it('renders error', () => {
    const ERROR_MESSAGE = 'Failed to fetch'

    mockGetOperation({ enabled: false, loading: false, error: ERROR_MESSAGE })
    arrangeTest()

    expect(screen.queryByTestId('ModalSuspender')).not.toBeInTheDocument()
    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument()
  })
})
