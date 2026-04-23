import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import ApproveWorkHoursStepModalForm from './ApproveWorkHoursStepModalForm'

jest.mock('../../../ReassignScreeningStepCheckbox', () => ({
  ReassignScreeningStepCheckbox: () => <div>ReassignScreeningStepCheckbox</div>
}))

const renderComponent = () =>
  render(
    <TestWrapperWithMocks>
      <ApproveWorkHoursStepModalForm
        talentId='talent-id'
        roleStep={{
          id: '1',
          claimer: {
            id: '23',
            fullName: 'Andrei Mocanu'
          },
          step: { id: '3', title: 'Work Hours Details' }
        }}
        hideModal={jest.fn}
      />
    </TestWrapperWithMocks>
  )

describe('ApproveWorkStepStepModalForm', () => {
  it('renders the modal form', () => {
    renderComponent()

    expect(screen.getByText('Approve Work Hours Details')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Do you really want to approve the Work Hours Details step?'
      )
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/Allocated hours/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Comment/)).toBeInTheDocument()
  })
})
