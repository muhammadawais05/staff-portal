import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { FAKE_EVENT_TAGS } from '../../mocks'
import UpdateEventTagModal from './UpdateEventTagModal'
import { useUpdateEventTag } from '../../data/update-event-tag/update-event-tag.staff.gql'

jest.mock('../../data/update-event-tag/update-event-tag.staff.gql')
const useUpdateEventTagMock = useUpdateEventTag as jest.Mock

describe('UpdateEventTagModal', () => {
  const [pythonTag] = FAKE_EVENT_TAGS

  beforeEach(() => {
    useUpdateEventTagMock.mockReturnValue([jest.fn(), { loading: false }])
  })

  it('renders default modal', () => {
    render(
      <TestWrapper>
        <UpdateEventTagModal eventTag={pythonTag} hideModal={jest.fn()} />
      </TestWrapper>
    )

    const eventTagNameField = screen
      .getByTestId('eventTagNameField')
      .querySelector('input')

    expect(screen.getByText('Edit event tag')).toBeInTheDocument()
    expect(eventTagNameField).toHaveValue('Python')
  })

  it('closes the modal when clicking on the `Cancel` button', () => {
    const hideModal = jest.fn()

    render(
      <TestWrapper>
        <UpdateEventTagModal eventTag={pythonTag} hideModal={hideModal} />
      </TestWrapper>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(hideModal).toHaveBeenCalled()
  })

  it('calls mutation after changing tag title', async () => {
    const updateMutation = jest.fn(() =>
      Promise.resolve({ data: { updateCommunityEventTag: { success: true } } })
    )

    useUpdateEventTagMock.mockReturnValue([updateMutation, { loading: false }])

    render(
      <TestWrapper>
        <UpdateEventTagModal eventTag={pythonTag} hideModal={jest.fn()} />
      </TestWrapper>
    )

    fireEvent.change(screen.getByPlaceholderText('Type a name for event tag'), {
      target: { value: 'Cool Tag' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() => {
      expect(updateMutation).toHaveBeenCalledTimes(1)
      expect(updateMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            title: 'Cool Tag',
            id: '0',
            active: true
          }
        }
      })
    })
  })
})
