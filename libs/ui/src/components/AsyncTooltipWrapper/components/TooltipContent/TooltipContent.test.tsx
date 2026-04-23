import { render, screen } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import TooltipContent from './TooltipContent'

jest.mock('../Error', () => ({
  __esModule: true,
  default: () => <div data-testid='ErrorMock' />
}))

const contentMock = jest.fn()

const arrangeTest = ({
  data,
  error,
  loading,
  ErrorComponent
}: Partial<ComponentProps<typeof TooltipContent>> = {}) =>
  render(
    <TestWrapper>
      <TooltipContent
        content={contentMock}
        data={data}
        loading={!!loading}
        error={error}
        ErrorComponent={ErrorComponent}
      />
    </TestWrapper>
  )

describe('TooltipContent', () => {
  it('renders default error component', () => {
    arrangeTest({
      error: { message: 'error-message' }
    })

    expect(screen.getByTestId('ErrorMock')).toBeInTheDocument()
  })

  it('renders specified error component', () => {
    arrangeTest({
      error: { message: 'error-message' },
      ErrorComponent: () => <div data-testid='CustomError' />
    })

    expect(screen.getByTestId('CustomError')).toBeInTheDocument()
  })

  it('calls content function', () => {
    const mockData = { a: 1 }

    arrangeTest({
      data: mockData,
      loading: true
    })

    expect(contentMock).toHaveBeenCalledWith(mockData, true)
  })
})
