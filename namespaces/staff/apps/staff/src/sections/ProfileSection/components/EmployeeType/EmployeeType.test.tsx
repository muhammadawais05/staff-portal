import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { EditableField, EditableTextarea } from '@staff-portal/editable'
import { OperationFragment } from '@staff-portal/operations'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import EmployeeType from './EmployeeType'
import { getEmployeeTypesItemsHook, getStaffEmployeeTypeHook } from './services'
import { UpdatePaymentsEmployeeTypeDocument } from './data'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(),
  EditableTextarea: jest.fn()
}))
jest.mock('./services', () => ({
  getEmployeeTypesItemsHook: jest.fn(),
  getStaffEmployeeTypeHook: jest.fn()
}))

const renderComponent = (props: ComponentProps<typeof EmployeeType>) =>
  render(<EmployeeType {...props} />)

const mockUseEditableFieldChangeHandler =
  useEditableFieldChangeHandler as jest.Mock
const mockGetStaffEmployeeTypeHook = getStaffEmployeeTypeHook as jest.Mock
const mockGetEmployeeTypesItemsHook = getEmployeeTypesItemsHook as jest.Mock
const MockEditableField = EditableField as jest.Mock
const MockEditableTextarea = EditableTextarea as jest.Mock

describe('EmployeeType', () => {
  const mockedHandleChange = jest.fn()
  const mockedUseStaffEmployeeTypeHook = jest.fn()
  const mockedUseGetEmployeeTypeItemsHook = jest.fn()

  beforeEach(() => {
    MockEditableField.mockReturnValueOnce(null)
    MockEditableTextarea.mockRejectedValueOnce(null)
    mockUseEditableFieldChangeHandler.mockReturnValueOnce(mockedHandleChange)
    mockGetStaffEmployeeTypeHook.mockReturnValueOnce(
      mockedUseStaffEmployeeTypeHook
    )
    mockGetEmployeeTypesItemsHook.mockReturnValueOnce(
      mockedUseGetEmployeeTypeItemsHook
    )
  })

  it('renders editable component', () => {
    const staffId = Symbol('staffId') as unknown as string
    const value = Symbol('value') as unknown as string
    const operation = Symbol('operation') as unknown as OperationFragment

    renderComponent({
      staffId,
      value,
      operation
    })

    expect(mockUseEditableFieldChangeHandler).toHaveBeenCalledTimes(1)
    expect(mockUseEditableFieldChangeHandler).toHaveBeenCalledWith({
      mutationDocument: UpdatePaymentsEmployeeTypeDocument,
      initialValues: {
        paymentsEmployeeType: value
      },
      requiredValues: {
        roleId: staffId
      }
    })
    expect(MockEditableField).toHaveBeenCalledTimes(1)
    expect(MockEditableField).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'paymentsEmployeeType',
        onChange: mockedHandleChange,
        value,
        disabled: true,
        viewer: value,
        queryValue: mockedUseStaffEmployeeTypeHook,
        queryOptions: mockedUseGetEmployeeTypeItemsHook,
        editor: expect.anything()
      }),
      {}
    )
  })
})
