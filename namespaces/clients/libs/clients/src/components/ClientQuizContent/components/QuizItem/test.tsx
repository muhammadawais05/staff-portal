import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import QuizItem from '.'

const arrangeTest = (props: ComponentProps<typeof QuizItem>) =>
  render(
    <TestWrapper>
      <QuizItem {...props} />
    </TestWrapper>
  )

describe('QuizItem', () => {
  it('default render', () => {
    const { getByTestId } = arrangeTest({
      label: 'Label',
      answer: <div data-testid='quiz-item-answer'>Answer</div>
    })

    expect(getByTestId('quiz-item-label')).toHaveTextContent('Label')
    expect(getByTestId('quiz-item-answer')).toHaveTextContent('Answer')
  })
})
