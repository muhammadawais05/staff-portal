import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import RelatedTasksSection from './RelatedTasksSection'

jest.mock('@staff-portal/tasks-lists', () => ({
  ...jest.requireActual('@staff-portal/tasks-lists'),
  RelatedTasks: () => <div data-testid='related-tasks' />
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <RelatedTasksSection companyId='' />
    </TestWrapper>
  )

describe('RelatedTasksSection', () => {
  it('shows the related tasks', () => {
    arrangeTest()

    expect(screen.getByTestId('related-tasks')).toBeInTheDocument()
  })
})
