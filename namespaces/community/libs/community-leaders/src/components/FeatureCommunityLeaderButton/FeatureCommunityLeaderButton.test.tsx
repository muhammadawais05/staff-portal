import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { REFRESH_COMMUNITY_LEADER_LIST } from '../../messages'
import { useFeatureCommunityLeader } from '../../data/feature-community-leader'
import { FeatureCommunityLeaderButton } from '../../components'

jest.mock('../../data/feature-community-leader')
const mockUseFeatureCommunityLeader = useFeatureCommunityLeader as jest.Mock

jest.mock('@toptal/staff-portal-message-bus')
const mockUseMessageEmitter = useMessageEmitter as jest.Mock

const setupMocks = () => {
  const emitMessage = jest.fn()

  mockUseMessageEmitter.mockReturnValue(emitMessage)

  const mutation = jest.fn(() =>
    Promise.resolve({
      data: { featureCommunityLeader: { success: true } }
    })
  )

  mockUseFeatureCommunityLeader.mockReturnValue([mutation, { loading: false }])

  return { emitMessage, mutation }
}

describe('FeatureCommunityLeaderButton', () => {
  it('renders default button', () => {
    setupMocks()

    render(
      <TestWrapper>
        <FeatureCommunityLeaderButton
          id='123'
          name='John Doe'
          operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
        />
      </TestWrapper>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Mark As Featured')
  })

  it('renders custom feature button', () => {
    setupMocks()

    render(
      <TestWrapper>
        <FeatureCommunityLeaderButton
          id='123'
          name='John Doe'
          operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
        >
          Custom Feature
        </FeatureCommunityLeaderButton>
      </TestWrapper>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Custom Feature')
  })

  describe('when clicking on feature button', () => {
    it('calls mutation successfully', async () => {
      const { mutation } = setupMocks()

      render(
        <TestWrapper>
          <FeatureCommunityLeaderButton
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
          <FeatureCommunityLeaderButton
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
