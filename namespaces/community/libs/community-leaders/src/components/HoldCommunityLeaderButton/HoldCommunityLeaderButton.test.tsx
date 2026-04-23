import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useNotifications } from '@toptal/picasso/utils'
import { useModal } from '@staff-portal/modals-service'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import HoldCommunityLeaderButton from './HoldCommunityLeaderButton'
import { useHoldCommunityLeader } from '../../data/hold-community-leader'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))
jest.mock('../../data/hold-community-leader')

const mockUseNotifications = useNotifications as jest.Mock
const mockUseModal = useModal as jest.Mock
const mockUseHoldCommunityLeader = useHoldCommunityLeader as jest.Mock

describe('HoldCommunityLeaderButton', () => {
  beforeEach(() => {
    mockUseNotifications.mockReturnValue({
      showError: jest.fn(),
      showSuccess: jest.fn()
    })

    mockUseModal.mockReturnValue({
      showModal: jest.fn()
    })

    mockUseHoldCommunityLeader.mockReturnValue([jest.fn(), { loading: false }])
  })

  it('renders default button', () => {
    render(
      <TestWrapper>
        <HoldCommunityLeaderButton
          operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
          id='123'
          name='John Doe'
        />
      </TestWrapper>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Pause Application')
  })

  it('renders custom hold button', () => {
    render(
      <TestWrapper>
        <HoldCommunityLeaderButton
          id='123'
          name='John Doe'
          operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
        >
          Hold Application
        </HoldCommunityLeaderButton>
      </TestWrapper>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Hold Application')
  })

  it('calls showModal when clicked', async () => {
    const showModal = jest.fn()

    mockUseModal.mockReturnValue({
      showModal
    })

    render(
      <TestWrapper>
        <HoldCommunityLeaderButton
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
