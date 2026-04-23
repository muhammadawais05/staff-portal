import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { REFRESH_COMMUNITY_LEADER_LIST } from '../../messages'
import { useRemoveFeaturedCommunityLeader } from '../../data/remove-featured-community-leader/remove-featured-community-leader.staff.gql'
import { RemoveFeaturedCommunityLeaderButton } from '../../components'

jest.mock(
  '../../data/remove-featured-community-leader/remove-featured-community-leader.staff.gql'
)
const mockUseRemoveFeaturedCommunityLeader =
  useRemoveFeaturedCommunityLeader as jest.Mock

jest.mock('@toptal/staff-portal-message-bus')
const mockUseMessageEmitter = useMessageEmitter as jest.Mock

const setupMocks = () => {
  const emitMessage = jest.fn()

  mockUseMessageEmitter.mockReturnValue(emitMessage)

  const mutation = jest.fn(() =>
    Promise.resolve({
      data: { unfeatureCommunityLeader: { success: true } }
    })
  )

  mockUseRemoveFeaturedCommunityLeader.mockReturnValue([
    mutation,
    { loading: false }
  ])

  return { emitMessage, mutation }
}

describe('RemoveFeaturedCommunityLeaderButton', () => {
  it('renders default button', () => {
    setupMocks()

    render(
      <TestWrapper>
        <RemoveFeaturedCommunityLeaderButton
          id='123'
          name='John Doe'
          operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
        />
      </TestWrapper>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Remove From Featured')
  })

  it('renders custom remove featured button', () => {
    setupMocks()

    render(
      <TestWrapper>
        <RemoveFeaturedCommunityLeaderButton
          id='123'
          name='John Doe'
          operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
        >
          Custom Remove Featured
        </RemoveFeaturedCommunityLeaderButton>
      </TestWrapper>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent(
      'Custom Remove Featured'
    )
  })

  describe('when clicking on remove featured button', () => {
    it('calls mutation successfully', async () => {
      const { mutation } = setupMocks()

      render(
        <TestWrapper>
          <RemoveFeaturedCommunityLeaderButton
            id='123'
            name='John Doe'
            operation={{
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }}
          />
        </TestWrapper>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        expect(mutation).toHaveBeenCalledTimes(1)
        expect(mutation).toHaveBeenCalledWith({
          variables: {
            input: {
              id: '123'
            }
          }
        })
      })
    })

    it('calls the event emitter', async () => {
      const { emitMessage } = setupMocks()

      render(
        <TestWrapper>
          <RemoveFeaturedCommunityLeaderButton
            id='123'
            name='John Doe'
            operation={{
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }}
          />
        </TestWrapper>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        expect(emitMessage).toHaveBeenCalledWith(REFRESH_COMMUNITY_LEADER_LIST)
      })
    })
  })
})
