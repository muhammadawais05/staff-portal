import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TaskCardLayoutRowItem, {
  TaskCardLayoutRowItemProps
} from './TaskCardLayoutRowItem'

const arrangeTest = (props: TaskCardLayoutRowItemProps) =>
  render(
    <TestWrapper>
      <TaskCardLayoutRowItem {...props} />
    </TestWrapper>
  )

describe('TaskCardLayoutRowItem', () => {
  it('renders NO_VALUE', () => {
    const LEFT_CONTENT = 'Left content'

    arrangeTest({ leftContent: LEFT_CONTENT, rightContent: null })

    expect(screen.getByText(LEFT_CONTENT)).toBeInTheDocument()
    expect(screen.getByText('—')).toBeInTheDocument()
  })

  it('renders a string as right content', () => {
    const RIGHT_CONTENT = 0

    arrangeTest({ leftContent: 'Number', rightContent: RIGHT_CONTENT })

    expect(screen.getByText(String(RIGHT_CONTENT))).toBeInTheDocument()
  })

  it('renders an element as right content', () => {
    const RIGHT_CONTENT_TEST_ID = 'right-content'

    arrangeTest({
      leftContent: '',
      rightContent: <div data-testid={RIGHT_CONTENT_TEST_ID} />
    })

    expect(screen.getByTestId(RIGHT_CONTENT_TEST_ID)).toBeInTheDocument()
  })
})
