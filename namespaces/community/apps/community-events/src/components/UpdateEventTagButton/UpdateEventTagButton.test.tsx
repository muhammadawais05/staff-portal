import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useNotifications } from '@toptal/picasso/utils'
import { useModal } from '@staff-portal/modals-service'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import UpdateEventTagButton from './UpdateEventTagButton'
import { FAKE_EVENT_TAGS } from '../../mocks'

jest.mock('../../data/update-event-tag/update-event-tag.staff.gql')

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const mockUseNotifications = useNotifications as jest.Mock
const mockUseModal = useModal as jest.Mock

describe('UpdateEventTagButton', () => {
  const [pythonTag] = FAKE_EVENT_TAGS

  beforeEach(() => {
    mockUseNotifications.mockReturnValue({
      showError: jest.fn(),
      showSuccess: jest.fn()
    })

    mockUseModal.mockReturnValue({
      showModal: jest.fn()
    })
  })

  it('renders default button', () => {
    render(
      <TestWrapper>
        <UpdateEventTagButton eventTag={pythonTag} />
      </TestWrapper>
    )

    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument()
  })

  it('renders custom update button', () => {
    render(
      <TestWrapper>
        <UpdateEventTagButton eventTag={pythonTag}>
          Update Event Tag
        </UpdateEventTagButton>
      </TestWrapper>
    )

    expect(
      screen.getByRole('button', { name: 'Update Event Tag' })
    ).toBeInTheDocument()
  })

  it('calls showModal when clicked', async () => {
    const showModal = jest.fn()

    mockUseModal.mockReturnValue({
      showModal
    })

    render(
      <TestWrapper>
        <UpdateEventTagButton eventTag={pythonTag} />
      </TestWrapper>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(showModal).toHaveBeenCalledTimes(1)
  })

  it('no button in document if operation forbid it', () => {
    const tag = {
      ...pythonTag,
      operations: {
        updateCommunityEventTag: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        },
        removeCommunityEventTag: {
          callable: OperationCallableTypes.DISABLED,
          messages: []
        }
      }
    }

    render(
      <TestWrapper>
        <UpdateEventTagButton eventTag={tag} />
      </TestWrapper>
    )

    expect(
      screen.queryByRole('button', { name: 'Update' })
    ).not.toBeInTheDocument()
  })
})
