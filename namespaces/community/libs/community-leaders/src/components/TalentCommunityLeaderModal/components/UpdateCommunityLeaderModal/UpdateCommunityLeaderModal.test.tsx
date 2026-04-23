import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import {
  CommunityLeaderApplicationStatus,
  CommunityLeaderRecordStatus,
  CommunityLeaderStatus,
  CommunityLeaderType
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { CommunityLeaderData } from '../../../../types'
import { useUpdateCommunityLeader } from '../../data/update-community-leader'
import { useAppointCommunityLeader } from '../../data/appoint-community-leader'
import UpdateCommunityLeaderModal from './UpdateCommunityLeaderModal'

jest.mock('../../data/appoint-community-leader')
jest.mock('../../data/update-community-leader')

const mockUseAppointCommunityLeader = useAppointCommunityLeader as jest.Mock
const mockUseUpdateCommunityLeader = useUpdateCommunityLeader as jest.Mock

const arrangeTest = (props: {
  communityLeaderData?: CommunityLeaderData
  createCLMutation?: () => void
  updateCLMutation?: () => void
  hideModal?: () => void
}) => {
  mockUseAppointCommunityLeader.mockReturnValue([
    props.createCLMutation ?? jest.fn(),
    { loading: false }
  ])
  mockUseUpdateCommunityLeader.mockReturnValue([
    props.updateCLMutation ?? jest.fn(),
    { loading: false }
  ])

  const rendered = render(
    <TestWrapper>
      <UpdateCommunityLeaderModal
        communityLeaderData={
          props.communityLeaderData ||
          ({
            appliedStaffRole: { fullName: 'John Doe' }
          } as CommunityLeaderData)
        }
        hideModal={props.hideModal ?? jest.fn()}
        refetchQueries={[]}
      />
    </TestWrapper>
  )

  const fullCheck = screen.getByTestId('type-full-field').querySelector('input')
  const onlineCheck = screen
    .getByTestId('type-online-field')
    .querySelector('input')
  const memosText = screen.getByTestId('memos-field').querySelector('textarea')

  return {
    ...rendered,
    fields: {
      fullCheck,
      onlineCheck,
      memosText
    }
  }
}

describe('UpdateCommunityLeaderModal', () => {
  it('renders default modal', () => {
    const { fields } = arrangeTest({ communityLeaderData: null })

    expect(
      screen.getByText('Edit John Doe Community Leader Type')
    ).toBeInTheDocument()
    expect(fields.fullCheck).toBeChecked()
    expect(fields.onlineCheck).not.toBeChecked()
    expect(fields.memosText).toHaveValue('')
  })

  it('renders modal for talent who is already community leader', () => {
    const { fields } = arrangeTest({
      communityLeaderData: {
        id: '123',
        status: CommunityLeaderStatus.APPROVED,
        application: {
          id: '123',
          createdAt: '2021-10-11',
          updatedAt: '2021-10-11',
          status: CommunityLeaderApplicationStatus.APPROVED
        },
        node: {
          requestedAt: '2021-10-11',
          createdAt: '2021-10-11',
          id: '123',
          memos: 'Some description',
          type: CommunityLeaderType.COMMUNITY_LEADER,
          leaderStatus: CommunityLeaderRecordStatus.ACTIVE
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

    expect(
      screen.getByText('Edit John Doe Community Leader Type')
    ).toBeInTheDocument()
    expect(fields.fullCheck).toBeChecked()
    expect(fields.onlineCheck).not.toBeChecked()
    expect(fields.memosText).toHaveValue('Some description')
  })

  it('update community leader data of a talent', async () => {
    const updateCLMutation = jest.fn(() =>
      Promise.resolve({
        data: {
          updateCommunityLeader: {
            success: true
          }
        }
      })
    )
    const hideModal = jest.fn()

    const { fields } = arrangeTest({
      communityLeaderData: {
        id: '123',
        status: CommunityLeaderStatus.APPROVED,
        application: {
          id: '123',
          createdAt: '2021-10-11',
          updatedAt: '2021-10-11',
          status: CommunityLeaderApplicationStatus.APPROVED
        },
        node: {
          requestedAt: '2021-10-11',
          createdAt: '2021-10-11',
          id: '123',
          memos: 'Some description',
          type: CommunityLeaderType.ONLINE_LEADER,
          leaderStatus: CommunityLeaderRecordStatus.ACTIVE
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
      updateCLMutation,
      hideModal
    })

    fireEvent.click(fields.onlineCheck as HTMLElement)
    fireEvent.change(fields.memosText as HTMLElement, {
      target: { value: 'Updated description' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }))

    expect(updateCLMutation).toHaveBeenCalledWith({
      variables: {
        input: {
          type: CommunityLeaderType.ONLINE_LEADER,
          memos: 'Updated description',
          id: '123'
        }
      },
      refetchQueries: []
    })

    await waitFor(() => {
      expect(hideModal).toHaveBeenCalled()
    })
  })

  describe('when clicking on the `Cancel` button', () => {
    it('closes the modal', () => {
      const hideModal = jest.fn()

      arrangeTest({
        hideModal
      })

      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

      expect(hideModal).toHaveBeenCalled()
    })
  })
})
