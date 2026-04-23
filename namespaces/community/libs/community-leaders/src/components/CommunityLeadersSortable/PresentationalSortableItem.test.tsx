import React from 'react'
import { screen, fireEvent, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { PresentationalSortableItem } from './PresentationalSortableItem'
import { FeaturedCommunityLeader } from '../../types'

const DEFAULT_LEADER_DATA: FeaturedCommunityLeader = {
  id: '123',
  appliedStaffRole: {
    id: '123456',
    fullName: 'John Doe',
    email: 'alex.casillas@toptal.com',
    webResource: {
      text: 'John Doe',
      url: 'https://johndoe.toptal.com'
    }
  }
}

describe('<PresentationalSortableItem />', () => {
  it('renders component properly', () => {
    render(
      <TestWrapper>
        <PresentationalSortableItem communityLeader={DEFAULT_LEADER_DATA} />
      </TestWrapper>
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Remove From Featured')).toBeInTheDocument()
  })

  it('executes removeCL callback', () => {
    const mockRemoveCl = jest.fn()

    render(
      <TestWrapper>
        <PresentationalSortableItem
          communityLeader={DEFAULT_LEADER_DATA}
          removeCl={mockRemoveCl}
        />
      </TestWrapper>
    )

    fireEvent.click(screen.getByText('Remove From Featured'))

    expect(mockRemoveCl).toHaveBeenCalledTimes(1)
  })
})
