import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import PriorityLegend from './PriorityLegend'
import { TASK_PRIORITY_TEXT_MAPPING } from '../../config'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <PriorityLegend />
    </TestWrapper>
  )

describe('PriorityLegend', () => {
  it('renders priority legend and color indicators', () => {
    const { getByText, getByLabelText } = arrangeTest()

    expect(getByText(TASK_PRIORITY_TEXT_MAPPING.HIGH)).toBeInTheDocument()
    expect(getByLabelText(TASK_PRIORITY_TEXT_MAPPING.HIGH)).toBeInTheDocument()

    expect(getByText(TASK_PRIORITY_TEXT_MAPPING.MEDIUM)).toBeInTheDocument()
    expect(getByText(TASK_PRIORITY_TEXT_MAPPING.LOW)).toBeInTheDocument()

    expect(
      getByLabelText(TASK_PRIORITY_TEXT_MAPPING.MEDIUM)
    ).toBeInTheDocument()
    expect(getByLabelText(TASK_PRIORITY_TEXT_MAPPING.LOW)).toBeInTheDocument()
  })
})
