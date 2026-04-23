import React, { ComponentType, ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { TestWrapper } from '@staff-portal/test-utils'

import WidgetErrorBoundary from './index'

jest.mock('../ErrorView', () => () => <div data-testid='ErrorView' />)

const arrangeTest = (
  TestCaseComponent: ComponentType,
  props: Omit<ComponentProps<typeof WidgetErrorBoundary>, 'children'> = {}
) =>
  render(
    <TestWrapper>
      <MemoryRouter>
        <div data-testid='WidgetErrorBoundaryWrapper'>
          <WidgetErrorBoundary {...props}>
            <TestCaseComponent />
          </WidgetErrorBoundary>
        </div>
      </MemoryRouter>
    </TestWrapper>
  )

describe('WidgetErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation()
  })

  it('should show default widget error when error is caught', async () => {
    const COMPONENT_ERROR_TEXT = 'Error occurred'
    const LocalFailingComponent = () => {
      throw new Error(COMPONENT_ERROR_TEXT)
    }

    const { getByTestId } = arrangeTest(LocalFailingComponent)

    expect(getByTestId('ErrorView')).toBeInTheDocument()
  })

  it('displays nothing when error is caught', async () => {
    const COMPONENT_ERROR_TEXT = 'Error occurred'
    const LocalFailingComponent = () => {
      throw new Error(COMPONENT_ERROR_TEXT)
    }

    const { queryByTestId } = arrangeTest(LocalFailingComponent, {
      emptyOnError: true
    })

    expect(queryByTestId('WidgetErrorBoundaryWrapper')?.innerHTML).toBe('')
    expect(queryByTestId('ErrorView')).not.toBeInTheDocument()
  })

  it('displays custom error component when error is caught', async () => {
    const COMPONENT_ERROR_TEXT = 'Error occurred'
    const LocalFailingComponent = () => {
      throw new Error(COMPONENT_ERROR_TEXT)
    }

    const { queryByTestId } = arrangeTest(LocalFailingComponent, {
      errorComponent: <div>test</div>
    })

    expect(queryByTestId('WidgetErrorBoundaryWrapper')).toContainHTML('test')
    expect(queryByTestId('ErrorView')).not.toBeInTheDocument()
  })

  it('bubbles up exception', async () => {
    const COMPONENT_ERROR_TEXT = 'Error occurred'
    const LocalFailingComponent = () => {
      throw new Error(COMPONENT_ERROR_TEXT)
    }

    const res = () =>
      arrangeTest(LocalFailingComponent, { bubbleUpError: true })

    expect(res).toThrow(Error)
  })
})
