import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { RoleStepMainActions } from '@staff-portal/graphql/staff'

import ClaimGenericStepModalContent from './ClaimGenericStepModalContent'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

const mockUseModalFormChangeHandler = useModalFormChangeHandler as jest.Mock

const renderComponent = () =>
  render(
    <TestWrapper>
      <ClaimGenericStepModalContent
        talentId='talent-id'
        roleStepId='role-id'
        stepTitle='Payment Details'
        message='Are you sure you want to claim the Payment Details step for Marlys Jones?'
        actionName={RoleStepMainActions.CLAIM_ROLE_STEP}
        hideModal={jest.fn()}
        onSuccess={jest.fn()}
      />
    </TestWrapper>
  )

describe('ClaimGenericStepModalContent', () => {
  it('shows modal', async () => {
    mockUseModalFormChangeHandler.mockReturnValue({
      handleSubmit: jest.fn()
    })

    renderComponent()

    expect(screen.getByText('Claim Payment Details')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Are you sure you want to claim the Payment Details step for Marlys Jones?'
      )
    ).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(screen.getByText('Claim Payment Details Step'))
    })

    expect(mockUseModalFormChangeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationResultOptions: expect.objectContaining({
          successNotificationMessage:
            'The Payment Details Step was successfully claimed and assigned to you.'
        })
      })
    )
  })
})
