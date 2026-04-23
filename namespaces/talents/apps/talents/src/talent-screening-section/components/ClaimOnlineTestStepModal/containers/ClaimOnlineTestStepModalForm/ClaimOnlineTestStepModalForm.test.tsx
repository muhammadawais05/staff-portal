import { act, fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import ClaimOnlineTestStepModalForm from './ClaimOnlineTestStepModalForm'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

jest.mock('@staff-portal/current-user', () => ({
  useUserTimeZone: () => undefined,
  useGetCurrentUser: () => ({
    id: '1',
    fullName: 'Current User'
  })
}))

jest.mock('@staff-portal/role-flags', () => ({
  ...jest.requireActual('@staff-portal/role-flags'),
  RoleFlags: () => <div data-testid='role-flags' />
}))

const mockUseModalFormChangeHandler = useModalFormChangeHandler as jest.Mock

const arrangeTest = () => {
  mockUseModalFormChangeHandler.mockReturnValue({
    handleSubmit: jest.fn(),
    loading: false
  })

  return render(
    <TestWrapper>
      <ClaimOnlineTestStepModalForm
        talentId='talent-id'
        roleStepId='1'
        onlineTestData={{
          id: '123',
          step: {
            id: '123',
            title: 'Online Test'
          },
          claimer: {
            id: '123',
            fullName: 'Timofei Kachalov'
          },
          talent: {
            id: '1',
            fullName: 'Talent Name',
            onlineTestAttempts: {
              nodes: [
                {
                  id: '1',
                  createdAt: '2019-01-28T02:40:27+03:00',
                  finishedAt: '2019-01-28T02:40:27+03:00'
                }
              ]
            },
            roleFlags: {
              nodes: [
                {
                  id: '1',
                  createdAt: '2019-01-28T02:40:27+03:00',
                  updatedAt: '2019-01-28T02:40:27+03:00',
                  flag: { id: '1', title: 'Flag Title' },
                  operations: {
                    updateRoleFlag: {
                      callable: OperationCallableTypes.ENABLED,
                      messages: []
                    },
                    removeRoleFlag: {
                      callable: OperationCallableTypes.ENABLED,
                      messages: []
                    }
                  }
                }
              ]
            }
          }
        }}
        claimers={[{ id: '123', fullName: 'Current User' }]}
        onlineTests={[{ id: '1', name: 'Test 1', service: 'Service Name' }]}
        hideModal={jest.fn()}
      />
    </TestWrapper>
  )
}

describe('ClaimOnlineTestStepModal', () => {
  it('shows the claim online test', async () => {
    arrangeTest()

    expect(screen.getByText('Claim Online Test')).toBeInTheDocument()
    expect(screen.getByTestId('role-flags')).toBeInTheDocument()
    expect(screen.getByLabelText(/Claimer/)).toHaveValue('Current User (Staff)')
    expect(
      screen.getByLabelText('Invite to Service Name Test')
    ).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(screen.getByLabelText('Track test "Unknown test"'))

      await fireEvent.click(screen.getByText('Claim Step'))
    })

    expect(mockUseModalFormChangeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationResultOptions: expect.objectContaining({
          successNotificationMessage:
            'The Online Test step was successfully claimed and assigned to you.'
        })
      })
    )
  })
})
