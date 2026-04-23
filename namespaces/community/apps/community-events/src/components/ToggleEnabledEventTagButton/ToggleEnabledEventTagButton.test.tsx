import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useNotifications } from '@toptal/picasso/utils'

import ToggleEnabledEventTagButton from './ToggleEnabledEventTagButton'
import { FAKE_EVENT_TAGS } from '../../mocks'
import { useUpdateEventTag } from '../../data/update-event-tag/update-event-tag.staff.gql'

jest.mock('../../data/update-event-tag/update-event-tag.staff.gql')
const useUpdateEventTagMock = useUpdateEventTag as jest.Mock

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))

const mockUseNotifications = useNotifications as jest.Mock

describe('ToggleEnabledEventTagButton', () => {
  const [pythonTag, financeTag] = FAKE_EVENT_TAGS

  beforeEach(() => {
    mockUseNotifications.mockReturnValue({
      showError: jest.fn(),
      showSuccess: jest.fn()
    })
    useUpdateEventTagMock.mockReturnValue([jest.fn(), { loading: false }])
  })

  it('renders button for an active tag', () => {
    render(
      <TestWrapper>
        <ToggleEnabledEventTagButton eventTag={pythonTag} />
      </TestWrapper>
    )

    expect(screen.getByRole('button', { name: 'Disable' })).toBeInTheDocument()
  })

  it('renders button for an inactive tag', () => {
    render(
      <TestWrapper>
        <ToggleEnabledEventTagButton eventTag={financeTag} />
      </TestWrapper>
    )

    expect(screen.getByRole('button', { name: 'Enable' })).toBeInTheDocument()
  })

  it('calls mutation after clicking button', async () => {
    const updateMutation = jest.fn(() =>
      Promise.resolve({ data: { updateCommunityEventTag: { success: true } } })
    )

    useUpdateEventTagMock.mockReturnValue([updateMutation, { loading: false }])

    render(
      <TestWrapper>
        <ToggleEnabledEventTagButton eventTag={pythonTag} />
      </TestWrapper>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Disable' }))

    await waitFor(() => {
      expect(updateMutation).toHaveBeenCalledTimes(1)
      expect(updateMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            title: 'Python',
            id: '0',
            active: false
          }
        }
      })
    })
  })
})
