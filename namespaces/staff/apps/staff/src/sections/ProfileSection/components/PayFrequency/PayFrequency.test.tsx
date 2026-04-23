import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { EditableField, EditableTextarea } from '@staff-portal/editable'
import { OperationFragment } from '@staff-portal/operations'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import PayFrequency from './PayFrequency'
import { getPayFrequencyItemsHook, getStaffPayFrequencyHook } from './services'
import { UpdatePaymentsFrequencyDocument } from './data'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(),
  EditableTextarea: jest.fn()
}))
jest.mock('./services', () => ({
  getPayFrequencyItemsHook: jest.fn(),
  getStaffPayFrequencyHook: jest.fn()
}))

const renderComponent = (props: ComponentProps<typeof PayFrequency>) =>
  render(<PayFrequency {...props} />)

const mockUseEditableFieldChangeHandler =
  useEditableFieldChangeHandler as jest.Mock
const mockGetStaffPayFrequencyHook = getStaffPayFrequencyHook as jest.Mock
const mockGetPayFrequencyItemsHook = getPayFrequencyItemsHook as jest.Mock
const MockEditableField = EditableField as jest.Mock
const MockEditableTextarea = EditableTextarea as jest.Mock

describe('PayFrequency', () => {
  const mockedHandleChange = jest.fn()
  const mockedUseGetStaffPayFrequencyHook = jest.fn()
  const mockedUseGetEmployeeTypeItemsHook = jest.fn()

  beforeEach(() => {
    MockEditableField.mockReturnValueOnce(null)
    MockEditableTextarea.mockRejectedValueOnce(null)
    mockUseEditableFieldChangeHandler.mockReturnValueOnce(mockedHandleChange)
    mockGetStaffPayFrequencyHook.mockReturnValueOnce(
      mockedUseGetStaffPayFrequencyHook
    )
    mockGetPayFrequencyItemsHook.mockReturnValueOnce(
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
      mutationDocument: UpdatePaymentsFrequencyDocument,
      initialValues: {
        paymentsFrequency: value
      },
      requiredValues: {
        roleId: staffId
      }
    })
    expect(MockEditableField).toHaveBeenCalledTimes(1)
    expect(MockEditableField).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'paymentsFrequency',
        onChange: mockedHandleChange,
        value,
        disabled: true,
        viewer: value,
        queryValue: mockedUseGetStaffPayFrequencyHook,
        queryOptions: mockedUseGetEmployeeTypeItemsHook,
        editor: expect.anything()
      }),
      {}
    )
  })
})
