import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import useAddVerticalForm from './use-add-vertical-form'
import { useGetUserOperations } from './data/get-user-operations'
import AddVerticalForm from './AddVerticalForm'

const mockHandleSubmit = jest.fn()

jest.mock('./use-add-vertical-form')
jest.mock('./data/get-user-operations')

const mockUseAddVerticalForm = useAddVerticalForm as jest.Mock
const mockUseGetUserOperations = useGetUserOperations as jest.Mock

const arrangeTest = async (
  createVerticalCallable = OperationCallableTypes.ENABLED
) => {
  mockUseAddVerticalForm.mockImplementation(() => ({
    handleSubmit: mockHandleSubmit
  }))

  mockUseGetUserOperations.mockImplementation(() => ({
    data: {
      createVertical: {
        callable: createVerticalCallable,
        messages: [],
        __typename: 'Operation'
      }
    },
    loading: false
  }))

  return render(
    <TestWrapper>
      <AddVerticalForm />
    </TestWrapper>
  )
}

describe('Add Vertical Form', () => {
  it('renders content', () => {
    arrangeTest()

    expect(screen.getByLabelText(/Vertical Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Slug/i)).toBeInTheDocument()
  })

  it('handles form submit', async () => {
    const mockFormInput = {
      talentType: 'Mock Talent Type',
      publicPagesPath: 'Mock Public Pages Path'
    }

    arrangeTest()

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Vertical Name/i), {
        target: { value: mockFormInput.talentType }
      })
      fireEvent.change(screen.getByLabelText(/Slug/i), {
        target: { value: mockFormInput.publicPagesPath }
      })

      fireEvent.click(screen.getByRole('button', { name: 'Create' }))
    })

    expect(mockHandleSubmit).toHaveBeenCalledWith(
      mockFormInput,
      expect.anything(),
      expect.anything()
    )
  })

  it('shows error if staff cannot create vertical', () => {
    arrangeTest(OperationCallableTypes.DISABLED)

    expect(
      screen.getByText('This Page Requires Additional Permissions')
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('button', { name: 'Create' })
    ).not.toBeInTheDocument()
  })
})
