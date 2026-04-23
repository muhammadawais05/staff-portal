import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import {
  OperationCallableTypes,
  TalentCommunityLeaderTypeEnum
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { CommunityLeaderBasicInfo } from '../../../../types'
import { useUpdateCommunityLeader } from '../../data/update-community-leader'
import { useAppointCommunityLeader } from '../../data/appoint-community-leader'
import TalentCommunityLeaderManagementModal from './MakeCommunityLeaderModal'

jest.mock('../../data/appoint-community-leader')
jest.mock('../../data/update-community-leader')

const mockUseAppointCommunityLeader = useAppointCommunityLeader as jest.Mock
const mockUseUpdateCommunityLeader = useUpdateCommunityLeader as jest.Mock

const arrangeTest = (props: {
  communityLeaderBasicInfo?: CommunityLeaderBasicInfo
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
      <TalentCommunityLeaderManagementModal
        communityLeaderBasicInfo={
          props.communityLeaderBasicInfo || {
            fullName: 'John Doe',
            id: 'talentId',
            __typename: 'Talent',
            operations: {
              appointCommunityLeader: {
                callable: OperationCallableTypes.ENABLED,
                messages: []
              }
            }
          }
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

describe('MakeCommunityLeaderModal', () => {
  it('renders default modal', () => {
    const { fields } = arrangeTest({ communityLeaderBasicInfo: null })

    expect(
      screen.getByText('Assign John Doe as a Community Leader')
    ).toBeInTheDocument()
    expect(fields.fullCheck).toBeChecked()
    expect(fields.onlineCheck).not.toBeChecked()
    expect(fields.memosText).toHaveValue('')
  })

  it('make a talent become full community leader', async () => {
    const createCLMutation = jest.fn(() =>
      Promise.resolve({
        data: {
          appointCommunityLeader: {
            success: true
          }
        }
      })
    )
    const hideModal = jest.fn()

    const { fields } = arrangeTest({
      communityLeaderBasicInfo: null,
      createCLMutation,
      hideModal
    })

    fireEvent.click(fields.fullCheck as HTMLElement)
    fireEvent.change(fields.memosText as HTMLElement, {
      target: { value: 'Some new description' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }))

    expect(createCLMutation).toHaveBeenCalledWith({
      variables: {
        input: {
          type: TalentCommunityLeaderTypeEnum.COMMUNITY_LEADER,
          memos: 'Some new description',
          roleId: 'talentId'
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
