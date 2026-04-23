import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { EditableField, EditableTextarea } from '@staff-portal/editable'
import { OperationFragment } from '@staff-portal/operations'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import EditableInformation from './EditableInformation'
import { getRepresentativeInformationHook } from './utils/get-representative-information-hook'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(),
  EditableTextarea: jest.fn()
}))
jest.mock('./utils/get-representative-information-hook', () => ({
  getRepresentativeInformationHook: jest.fn()
}))

const renderComponent = (props: ComponentProps<typeof EditableInformation>) =>
  render(<EditableInformation {...props} />)

const mockUseEditableFieldChangeHandler =
  useEditableFieldChangeHandler as jest.Mock
const getRepresentativeInformationHookHook =
  getRepresentativeInformationHook as jest.Mock
const EditableFieldMock = EditableField as jest.Mock
const EditableTextareaMock = EditableTextarea as jest.Mock

describe('EditableInformation', () => {
  it('renders editable component', () => {
    const companyRepresentativeId = Symbol() as unknown as string
    const value = Symbol() as unknown as string
    const operation = Symbol() as unknown as OperationFragment
    const onChange = Symbol()
    const queryValue = Symbol()

    mockUseEditableFieldChangeHandler.mockReturnValueOnce(onChange)
    EditableFieldMock.mockReturnValueOnce(null)
    EditableTextareaMock.mockRejectedValueOnce(null)
    getRepresentativeInformationHookHook.mockReturnValueOnce(queryValue)

    renderComponent({
      companyRepresentativeId,
      operation,
      value
    })

    expect(mockUseEditableFieldChangeHandler).toHaveBeenCalledTimes(1)
    expect(mockUseEditableFieldChangeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        initialValues: {
          information: value
        },
        requiredValues: {
          companyRepresentativeId
        }
      })
    )
    expect(EditableFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: true,
        queryValue,
        onChange,
        value: value,
        name: 'information',
        fullWidthEditor: true
      }),
      {}
    )
  })
})
