import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'

import CommunityEventAttendeesModal from './CommunityEventAttendeesModal'
import { useGetCommunityEventAttendees } from '../../data/get-community-event-attendees/get-community-event-attendees.staff.gql'

jest.mock(
  '../../data/get-community-event-attendees/get-community-event-attendees.staff.gql'
)

const useGetCommunityEventAttendeesMock =
  useGetCommunityEventAttendees as jest.Mock

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <CommunityEventAttendeesModal
        hideModal={jest.fn()}
        communityEventId='123'
        totalAttendees={6}
      />
    </TestWrapper>
  )
}

describe('CommunityEventAttendeesModal', () => {
  it('renders attendees modal in loading state', () => {
    useGetCommunityEventAttendeesMock.mockReturnValue({
      loading: true,
      data: undefined
    })

    arrangeTest()

    expect(screen.getByText(/Attendees/)).toBeInTheDocument()
    expect(screen.getByTestId('loadingAttendees')).toBeInTheDocument()
    expect(screen.queryByTestId('attendeesTable')).not.toBeInTheDocument()
  })

  it('renders attendees modal with loaded data', () => {
    useGetCommunityEventAttendeesMock.mockReturnValue({
      loading: true,
      data: [
        { id: '123', fullName: 'John Doe', email: 'john@doe.com' },
        { id: '456', fullName: 'Bob Ogle', email: 'bob@ogle.com' }
      ]
    })

    arrangeTest()

    expect(screen.getByText(/Attendees/)).toBeInTheDocument()
    expect(screen.queryByTestId('loadingAttendees')).not.toBeInTheDocument()
    expect(screen.getByTestId('attendeesTable')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@doe.com')).toBeInTheDocument()
    expect(screen.getByText('Bob Ogle')).toBeInTheDocument()
    expect(screen.getByText('bob@ogle.com')).toBeInTheDocument()
  })
})
