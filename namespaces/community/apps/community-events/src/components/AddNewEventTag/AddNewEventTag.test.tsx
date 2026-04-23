import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import AddNewEventTag from './AddNewEventTag'
import { useCreateEventTag } from '../../data/create-event-tag/create-event-tag.staff.gql'

jest.mock('../../data/create-event-tag/create-event-tag.staff.gql')

const useCreateEventTagMock = useCreateEventTag as jest.Mock

describe('AddNewEventTag', () => {
  beforeEach(() => {
    useCreateEventTagMock.mockReturnValue([
      jest.fn(() => Promise.resolve({ data: {} }))
    ])
  })

  it('renders search component properly', () => {
    render(
      <TestWrapper>
        <AddNewEventTag />
      </TestWrapper>
    )

    expect(
      screen.getByPlaceholderText('Type event tag name')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add New Event Tag' })
    ).toBeInTheDocument()
  })

  it('does not allow creating empty tag', () => {
    const createEventTagMutation = jest.fn()

    useCreateEventTagMock.mockReturnValue([createEventTagMutation])

    render(
      <TestWrapper>
        <AddNewEventTag />
      </TestWrapper>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Add New Event Tag' }))

    expect(
      screen.getByText('Please type an event tag name')
    ).toBeInTheDocument()
    expect(createEventTagMutation).not.toHaveBeenCalled()
  })

  it('creates a new event tag', async () => {
    const eventTagResult = {
      title: 'Cool Tag',
      active: true
    }
    const createEventTagMutation = jest.fn(() =>
      Promise.resolve({
        data: {
          createCommunityEventTag: {
            eventTag: eventTagResult,
            success: true
          }
        }
      })
    )

    useCreateEventTagMock.mockReturnValue([createEventTagMutation])

    render(
      <TestWrapper>
        <AddNewEventTag />
      </TestWrapper>
    )

    fireEvent.change(screen.getByPlaceholderText('Type event tag name'), {
      target: { value: 'Cool Tag' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add New Event Tag' }))

    await waitFor(() => {
      expect(createEventTagMutation).toHaveBeenCalledTimes(1)
      expect(createEventTagMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            title: 'Cool Tag',
            active: true
          }
        }
      })
      expect(screen.getByPlaceholderText('Type event tag name')).toHaveValue('')
    })
  })
})
