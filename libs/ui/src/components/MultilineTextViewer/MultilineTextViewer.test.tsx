import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import MultilineTextViewer from './MultilineTextViewer'

describe('MultilineTextViewer', () => {
  it('renders DOM-element with data-testid', () => {
    const testId = 'test-id'

    render(
      <TestWrapper>
        <MultilineTextViewer value='test' data-testid={testId} />
      </TestWrapper>
    )

    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  it.each([null, undefined, ''])(
    'renders dash when value is empty/null/undefined',
    value => {
      const testId = 'test-id'

      render(
        <TestWrapper>
          <MultilineTextViewer value={value} data-testid={testId} />
        </TestWrapper>
      )

      expect(screen.getByTestId(testId).textContent).toBe(NO_VALUE)
    }
  )
})
