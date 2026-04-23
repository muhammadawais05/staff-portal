import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useNotifications } from '@toptal/picasso/utils'
import { useModal } from '@staff-portal/modals-service'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { ApproveCommunityLeaderButton } from '../../components'
import { useApproveCommunityLeader } from '../../data/approve-community-leader'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))
jest.mock('../../data/approve-community-leader')

const mockUseNotifications = useNotifications as jest.Mock
const mockUseModal = useModal as jest.Mock
const mockUseApproveCommunityLeader = useApproveCommunityLeader as jest.Mock

describe('ApproveCommunityLeaderButton', () => {
  beforeEach(() => {
    mockUseNotifications.mockReturnValue({
      showError: jest.fn(),
      showSuccess: jest.fn()
    })

    mockUseModal.mockReturnValue({
      showModal: jest.fn()
    })

    mockUseApproveCommunityLeader.mockReturnValue([
      jest.fn(),
      { loading: false }
    ])
  })

  it('renders default button', () => {
    render(
      <TestWrapper>
        <ApproveCommunityLeaderButton
          operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
          id='123'
          name='John Doe'
        />
      </TestWrapper>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Approve Application')
  })

  it('renders custom approve button', () => {
    render(
      <TestWrapper>
        <ApproveCommunityLeaderButton
          operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
          id='123'
          name='John Doe'
        >
          Approve Application
        </ApproveCommunityLeaderButton>
      </TestWrapper>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Approve Application')
  })

  it('calls showModal when clicked', async () => {
    const showModal = jest.fn()

    mockUseModal.mockReturnValue({
      showModal
    })

    render(
      <TestWrapper>
        <ApproveCommunityLeaderButton
          operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
          id='123'
          name='John Doe'
        />
      </TestWrapper>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(showModal).toHaveBeenCalledTimes(1)
  })
})
