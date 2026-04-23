import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import {
  CommunityLeaderApplicationStatus,
  CommunityLeaderRecordStatus,
  CommunityLeaderStatus,
  CommunityLeaderType,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useParams } from '@staff-portal/navigation'

import { useRestoreCommunityLeader } from '../../data/restore-community-leader'
import { CommunityLeaderData } from '../../types'
import RestoreCommunityLeaderButton from './RestoreCommunityLeaderButton'

jest.mock('../../data/restore-community-leader')
jest.mock('@toptal/staff-portal-message-bus')
jest.mock('@staff-portal/navigation')

const mockUseRestoreCommunityLeader = useRestoreCommunityLeader as jest.Mock
const mockUseMessageEmitter = useMessageEmitter as jest.Mock
const mockUseParams = useParams as jest.Mock

const arrangeTest = async (props: {
  communityLeaderData?: CommunityLeaderData
  restoreCLMutation?: () => void
}) => {
  mockUseRestoreCommunityLeader.mockReturnValue([
    props.restoreCLMutation ?? jest.fn(),
    { loading: false }
  ])
  mockUseMessageEmitter.mockReturnValue(undefined)
  mockUseParams.mockReturnValue({ id: undefined })

  const rendered = render(
    <TestWrapper>
      <RestoreCommunityLeaderButton
        id='123'
        communityLeaderData={
          props.communityLeaderData ||
          ({
            appliedStaffRole: { fullName: 'John Doe' }
          } as CommunityLeaderData)
        }
        operation={{ callable: OperationCallableTypes.ENABLED, messages: [] }}
        render={restore => (
          <button onClick={restore}>Restore Community Leader</button>
        )}
        refetchQueries={[]}
      />
    </TestWrapper>
  )

  return {
    ...rendered
  }
}

describe('RestoreCommunityLeaderButton', () => {
  it('renders modal for restoring a community leader', () => {
    arrangeTest({
      communityLeaderData: {
        id: '123',
        status: CommunityLeaderStatus.DELETED,
        application: {
          id: '123',
          createdAt: '2021-10-11',
          updatedAt: '2021-10-11',
          status: CommunityLeaderApplicationStatus.APPLIED
        },
        node: {
          requestedAt: '2021-10-11',
          createdAt: '2021-10-11',
          id: '123',
          memos: 'Some description',
          type: CommunityLeaderType.COMMUNITY_LEADER,
          leaderStatus: CommunityLeaderRecordStatus.DELETED
        },
        appliedStaffRole: {
          id: 'roleId',
          fullName: 'John Doe',
          email: 'john.doe@toptal.com',
          webResource: {
            text: 'John Doe',
            url: 'http://staff-portal.toptal.net/talent/profile'
          }
        }
      }
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Restore Community Leader' })
    )

    const fullCheck = screen
      .getByTestId('type-full-field')
      .querySelector('input')
    const onlineCheck = screen
      .getByTestId('type-online-field')
      .querySelector('input')
    const memosText = screen
      .getByTestId('memos-field')
      .querySelector('textarea')

    expect(
      screen.getByText(`Restore John Doe as Community Leader`)
    ).toBeInTheDocument()
    expect(fullCheck).toBeChecked()
    expect(onlineCheck).not.toBeChecked()
    expect(memosText).toHaveValue('Some description')
  })

  it('restores and update community leader data', async () => {
    const restoreCLMutation = jest.fn(() =>
      Promise.resolve({
        data: {
          restoreCommunityLeader: { success: true }
        }
      })
    )

    arrangeTest({
      communityLeaderData: {
        id: '123',
        status: CommunityLeaderStatus.DELETED,
        application: {
          id: '123',
          createdAt: '2021-10-11',
          updatedAt: '2021-10-11',
          status: CommunityLeaderApplicationStatus.APPLIED
        },
        node: {
          requestedAt: '2021-10-11',
          createdAt: '2021-10-11',
          id: '123',
          memos: 'Some description',
          type: CommunityLeaderType.COMMUNITY_LEADER,
          leaderStatus: CommunityLeaderRecordStatus.DELETED
        },
        appliedStaffRole: {
          id: 'roleId',
          fullName: 'John Doe',
          email: 'john.doe@toptal.com',
          webResource: {
            text: 'John Doe',
            url: 'http://staff-portal.toptal.net/talent/profile'
          }
        }
      },
      restoreCLMutation
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Restore Community Leader' })
    )

    const onlineCheck = screen
      .getByTestId('type-online-field')
      .querySelector('input')
    const memosText = screen
      .getByTestId('memos-field')
      .querySelector('textarea')

    fireEvent.click(onlineCheck as HTMLElement)
    fireEvent.change(memosText as HTMLElement, {
      target: { value: 'Updated description' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }))

    await waitFor(() => {
      expect(restoreCLMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            type: CommunityLeaderType.ONLINE_LEADER,
            memos: 'Updated description',
            id: '123'
          }
        }
      })
    })
  })
})
