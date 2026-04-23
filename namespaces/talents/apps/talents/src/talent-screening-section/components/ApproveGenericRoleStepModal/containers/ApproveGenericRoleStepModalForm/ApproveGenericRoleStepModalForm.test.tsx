import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RoleStepMainActions } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useMutation } from '@staff-portal/data-layer-service'

import ApproveGenericRoleStepModalForm from './ApproveGenericRoleStepModalForm'

jest.mock('../../../ReassignScreeningStepCheckbox', () => ({
  ReassignScreeningStepCheckbox: () => <div>ReassignScreeningStepCheckbox</div>
}))

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useMutation: jest.fn()
}))
const mockUseMutation = useMutation as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <ApproveGenericRoleStepModalForm
        talentId='talent-id'
        roleStep={{
          id: '123',
          mainAction: {
            actionName: RoleStepMainActions.APPROVE_PORTFOLIO_ROLE_STEP
          },
          claimer: {
            id: '123',
            fullName: 'Timofei Kachalov'
          },
          step: {
            id: '123',
            title: 'Portfolio'
          }
        }}
        actionName={RoleStepMainActions.APPROVE_PORTFOLIO_ROLE_STEP}
        onSuccess={jest.fn()}
        hideModal={jest.fn()}
      />
    </TestWrapper>
  )

describe('ApproveGenericRoleStepModal', () => {
  it('shows the approve generic role step modal', async () => {
    mockUseMutation.mockReturnValue([
      () => ({ data: { approvePortfolioRoleStep: { success: true } } }),
      { loading: false }
    ])

    arrangeTest()

    expect(screen.getByText('Approve Portfolio')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'Some message' }
    })

    fireEvent.click(screen.getByText('Approve Step'))

    expect(
      await screen.findByText('The Portfolio Step was successfully approved.')
    ).toBeInTheDocument()
  })
})
