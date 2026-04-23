import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useNotifications } from '@toptal/picasso/utils'
import { useModal } from '@staff-portal/modals-service'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { RejectCommunityLeaderButton } from '../../components'
import { useRejectCommunityLeaderApplication } from '../../data/reject-community-leader'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))
jest.mock('../../data/reject-community-leader')

const mockUseNotifications = useNotifications as jest.Mock
const mockUseModal = useModal as jest.Mock
const mockUseRejectCommunityLeaderApplication =
  useRejectCommunityLeaderApplication as jest.Mock

describe('RejectCommunityLeaderButton', () => {
  beforeEach(() => {
    mockUseNotifications.mockReturnValue({
      showError: jest.fn(),
      showSuccess: jest.fn()
    })

    mockUseModal.mockReturnValue({
      showModal: jest.fn()
    })

    mockUseRejectCommunityLeaderApplication.mockReturnValue([
      jest.fn(),
      { loading: false }
    ])
  })

  it('renders default button', () => {
    render(
      <TestWrapper>
        <RejectCommunityLeaderButton
          operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
          id='123'
          name='John Doe'
        />
      </TestWrapper>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Reject Application')
  })

  it('renders custom restore button', () => {
    render(
      <TestWrapper>
        <RejectCommunityLeaderButton
          id='123'
          name='John Doe'
          operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
        >
          Reject Application
        </RejectCommunityLeaderButton>
      </TestWrapper>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Reject Application')
  })

  it('calls showModal when clicked', async () => {
    const showModal = jest.fn()

    mockUseModal.mockReturnValue({
      showModal
    })

    render(
      <TestWrapper>
        <RejectCommunityLeaderButton
          id='123'
          name='John Doe'
          operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
        />
      </TestWrapper>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(showModal).toHaveBeenCalledTimes(1)
  })
})
