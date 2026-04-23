import { render, screen } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetCurrentUser } from '@staff-portal/current-user'

import OpportunityRelatedTasksSection from './OpportunityRelatedTasksSection'

jest.mock('@staff-portal/tasks-lists', () => ({
  ...jest.requireActual('@staff-portal/tasks-lists'),
  RelatedTasks: () => <div data-testid='related-tasks' />
}))

jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: jest.fn()
}))
const useGetCurrentUserMock = useGetCurrentUser as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof OpportunityRelatedTasksSection>
) =>
  render(
    <TestWrapper>
      <OpportunityRelatedTasksSection {...props} />
    </TestWrapper>
  )

describe('OpportunityRelatedTasks', () => {
  beforeEach(() => {
    useGetCurrentUserMock.mockReturnValue(true)
  })

  it('shows the related tasks', () => {
    arrangeTest({ opportunityId: '1' })

    expect(screen.getByTestId('related-tasks')).toBeInTheDocument()
  })

  describe('when user is not authenticated', () => {
    beforeEach(() => {
      useGetCurrentUserMock.mockReturnValue(false)
    })

    it('does not show the related tasks component', () => {
      arrangeTest({ opportunityId: '1' })

      expect(screen.queryByTestId('related-tasks')).not.toBeInTheDocument()
    })
  })
})
