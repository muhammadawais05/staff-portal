import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TaskCardLayout from './TaskCardLayout'

jest.mock('./components/TaskCardLayoutActions', () => ({
  __esModule: true,
  default: () => null
}))
jest.mock('./components/TaskCardLayoutContent', () => ({
  __esModule: true,
  default: () => null
}))
jest.mock('./components/TaskCardLayoutDescription', () => ({
  __esModule: true,
  default: () => null
}))
jest.mock('./components/TaskCardLayoutDescriptionFormatter', () => ({
  __esModule: true,
  default: () => null
}))
jest.mock('./components/TaskCardLayoutHeader', () => ({
  __esModule: true,
  default: () => null
}))
jest.mock('./components/TaskCardLayoutMoreButton', () => ({
  __esModule: true,
  default: () => null
}))
jest.mock('./components/TaskCardLayoutRowItem', () => ({
  __esModule: true,
  default: () => null
}))
jest.mock('./components/TaskCardLayoutSummary', () => ({
  __esModule: true,
  default: () => null
}))
jest.mock('./components/TaskCardLayoutTag', () => ({
  __esModule: true,
  default: () => null
}))
jest.mock('./components/TaskCardLayoutTags', () => ({
  __esModule: true,
  default: () => null
}))
jest.mock('./components/TaskCardLayoutTitle', () => ({
  __esModule: true,
  default: () => null
}))
jest.mock('./components/TaskCardLayoutSummaryItem', () => ({
  __esModule: true,
  default: () => null
}))
jest.mock('./components/TaskCardLayoutLoading', () => ({
  __esModule: true,
  default: () => <div data-testid='task-card-layout-loading' />
}))

const arrangeTest = ({ loading }: { loading: boolean }) =>
  render(
    <TestWrapper>
      <TaskCardLayout loading={loading}>
        <div data-testid='task-card-content' />
      </TaskCardLayout>
    </TestWrapper>
  )

describe('TaskCardLayout', () => {
  it('shows loading', () => {
    arrangeTest({ loading: true })

    expect(screen.getByTestId('task-card-layout-loading')).toBeInTheDocument()
    expect(screen.queryByTestId('task-card-content')).not.toBeInTheDocument()
  })

  it('shows content', () => {
    arrangeTest({ loading: false })

    expect(
      screen.queryByTestId('task-card-layout-loading')
    ).not.toBeInTheDocument()
    expect(screen.getByTestId('task-card-content')).toBeInTheDocument()
  })
})
