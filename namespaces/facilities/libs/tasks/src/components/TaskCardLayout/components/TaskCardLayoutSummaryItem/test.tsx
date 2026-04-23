import React, { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TaskCardLayoutSummaryItem from './TaskCardLayoutSummaryItem'

const arrangeTest = ({ value }: { value: ReactNode }) =>
  render(
    <TestWrapper>
      <TaskCardLayoutSummaryItem label='Test' value={value} />
    </TestWrapper>
  )

describe('TaskCardLayoutSummaryItem', () => {
  it('renders NO_VALUE', () => {
    arrangeTest({ value: null })

    expect(screen.getByText('—')).toBeInTheDocument()
  })

  it('renders value', () => {
    const VALUE = 0

    arrangeTest({ value: VALUE })

    expect(screen.getByText(String(VALUE))).toBeInTheDocument()
  })
})
