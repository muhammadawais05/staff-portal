import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { TaskCardType } from './enums'
import { TaskWithMetadata } from './types'
import { getDefaultTaskCard } from './utils/get-default-task-card'
import TaskCards, { Props } from './TaskCards'

jest.mock('react', () => {
  const ReactMocked = jest.requireActual('react')

  ReactMocked.Suspense = () => null

  return ReactMocked
})
jest.mock('./components/TaskCardsMenu', () => ({
  __esModule: true,
  default: () => <div data-testid='menu' />
}))
jest.mock('./utils/get-default-task-card', () => ({
  getDefaultTaskCard: jest.fn()
}))

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <TaskCards {...props} />
    </TestWrapper>
  )

describe('TaskCards', () => {
  it('renders', () => {
    const DEFAULT_TASK_CARD_TYPE = TaskCardType.Activity
    const TASK_CARD = {
      type: DEFAULT_TASK_CARD_TYPE,
      title: '1',
      entityId: '1'
    }
    const TASK_CARDS = [TASK_CARD]

    const getDefaultTaskCardMocked = getDefaultTaskCard as jest.Mock

    getDefaultTaskCardMocked.mockReturnValue(TASK_CARD)

    arrangeTest({
      task: {} as TaskWithMetadata,
      taskCards: TASK_CARDS,
      defaultTaskCardType: DEFAULT_TASK_CARD_TYPE
    })

    expect(getDefaultTaskCard).toHaveBeenCalledWith(
      TASK_CARDS,
      DEFAULT_TASK_CARD_TYPE
    )
    expect(screen.getByTestId('menu')).toBeInTheDocument()
  })
})
