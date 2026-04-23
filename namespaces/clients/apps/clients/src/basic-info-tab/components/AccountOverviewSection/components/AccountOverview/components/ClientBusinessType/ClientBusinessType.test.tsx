import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NO_VALUE } from '@staff-portal/config'
import { BUSINESS_TYPE_ITEMS } from '@staff-portal/clients'

import { getClientBusinessTypeHook } from '../../utils/get-client-business-type-hook'
import ClientBusinessType from '.'

jest.mock('../../utils/get-client-business-type-hook')
jest.mock('@staff-portal/mutation-result-handlers/src/hooks')
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))

const editableFieldMock = EditableField as jest.Mock
const getClientBusinessTypeHookMock = getClientBusinessTypeHook as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock

const arrangeTest = () => {
  const getValue = jest.fn(() => 'query')
  const onChange = jest.fn(() => 'onChange')
  const editableField = jest.fn(() => null)

  getClientBusinessTypeHookMock.mockImplementation(getValue)
  useEditableFieldChangeHandlerMock.mockImplementation(onChange)
  editableFieldMock.mockImplementation(editableField)

  return { getValue, onChange, editableField }
}

describe('ClientBusinessType', () => {
  it.each(Object.values(BUSINESS_TYPE_ITEMS))(
    'renders as expected',
    businessTypeItem => {
      const { editableField } = arrangeTest()

      render(
        <TestWrapper>
          <ClientBusinessType
            clientId='id'
            value={businessTypeItem.value}
            editingDisabled={false}
          />
        </TestWrapper>
      )

      expect(getClientBusinessTypeHookMock).toHaveBeenCalledTimes(1)
      expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledTimes(1)

      expect(editableField).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: false,
          flex: true,
          name: 'businessType',
          onChange: 'onChange',
          queryValue: 'query',
          value: businessTypeItem.value,
          viewer: businessTypeItem.text,
          editor: expect.any(Function)
        }),
        expect.anything()
      )
    }
  )

  it('renders empty business type as expected', () => {
    const { editableField } = arrangeTest()

    render(
      <TestWrapper>
        <ClientBusinessType
          clientId='id'
          value={undefined}
          editingDisabled={false}
        />
      </TestWrapper>
    )

    expect(getClientBusinessTypeHookMock).toHaveBeenCalledTimes(1)
    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledTimes(1)

    expect(editableField).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: false,
        flex: true,
        name: 'businessType',
        onChange: 'onChange',
        queryValue: 'query',
        value: undefined,
        viewer: NO_VALUE,
        editor: expect.any(Function)
      }),
      expect.anything()
    )
  })
})
