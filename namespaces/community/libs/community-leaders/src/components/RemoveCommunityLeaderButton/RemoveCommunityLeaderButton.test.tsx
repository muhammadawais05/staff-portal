import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { PureQueryOptions } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { useRemoveCommunityLeader } from '../../data/remove-community-leader'
import { RemoveCommunityLeaderButton } from '../../components'

jest.mock('../../data/remove-community-leader')

const mockUseRemoveCommunityLeader = useRemoveCommunityLeader as jest.Mock

describe('RemoveCommunityLeaderButton', () => {
  it('renders default button', () => {
    mockUseRemoveCommunityLeader.mockReturnValue([
      jest.fn(),
      { loading: false }
    ])

    render(
      <TestWrapper>
        <RemoveCommunityLeaderButton
          id='123'
          name='John Doe'
          operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
        />
      </TestWrapper>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent(
      'Remove Community Leader'
    )
  })

  it('renders custom remove button', () => {
    mockUseRemoveCommunityLeader.mockReturnValue([
      jest.fn(),
      { loading: false }
    ])

    render(
      <TestWrapper>
        <RemoveCommunityLeaderButton
          id='123'
          name='John Doe'
          render={() => <button>Custom Remove</button>}
          operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
        />
      </TestWrapper>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Custom Remove')
  })

  it('executes mutation when clicking the remove button', async () => {
    const mutation = jest.fn(() =>
      Promise.resolve({
        data: { removeCommunityLeader: { success: true } }
      })
    )
    const refetchQueries = [] as PureQueryOptions[]

    mockUseRemoveCommunityLeader.mockReturnValue([mutation, { loading: false }])

    render(
      <TestWrapper>
        <RemoveCommunityLeaderButton
          id='123'
          name='John Doe'
          refetchQueries={refetchQueries}
          operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
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
        },
        refetchQueries
      })
    })
  })
})
