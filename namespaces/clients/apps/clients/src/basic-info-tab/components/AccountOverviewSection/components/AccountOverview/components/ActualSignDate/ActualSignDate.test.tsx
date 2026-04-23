import React from 'react'
import { render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { CompanyOperationFragment } from '@staff-portal/clients'
import { NO_VALUE } from '@staff-portal/config'

import { getClientActualSignDateHook } from '../../utils/get-client-actual-sign-date-hook'
import ActualSignDate, { Props } from './ActualSignDate'

jest.mock('../../utils/get-client-actual-sign-date-hook')
jest.mock('@staff-portal/mutation-result-handlers/src/hooks')
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('@staff-portal/operations/src/utils')

const editableFieldMock = EditableField as jest.Mock
const getClientActualSignDateHookMock = getClientActualSignDateHook as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const isOperationEnabledMock = isOperationEnabled as jest.Mock

const arrangeTest = () => {
  const getValue = jest.fn(() => 'query')
  const onChange = jest.fn(() => 'onChange')
  const editableField = jest.fn(() => null)

  getClientActualSignDateHookMock.mockImplementation(getValue)
  useEditableFieldChangeHandlerMock.mockImplementation(onChange)
  editableFieldMock.mockImplementation(editableField)
  isOperationEnabledMock.mockImplementation(() => true)

  return { getValue, onChange, editableField }
}

describe('ActualSignDate', () => {
  it.each([
    [
      {
        value: '2021-10-15',
        viewer: 'October 15, 2021',
        editableFieldValue: '2021-10-15'
      }
    ],
    [{ value: null, viewer: NO_VALUE, editableFieldValue: null }],
    [{ value: undefined, viewer: NO_VALUE, editableFieldValue: null }],
    [{ value: '', viewer: NO_VALUE, editableFieldValue: null }]
  ])('renders as expected', ({ value, viewer, editableFieldValue }) => {
    const { editableField } = arrangeTest()
    const operation: CompanyOperationFragment = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }

    render(
      <TestWrapper>
        <ActualSignDate
          clientId='id'
          value={value as Props['value']}
          operation={operation}
        />
      </TestWrapper>
    )

    expect(getClientActualSignDateHookMock).toHaveBeenCalledTimes(1)
    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledTimes(1)
    expect(isOperationEnabledMock).toHaveBeenCalledTimes(1)

    expect(editableField).toHaveBeenCalledTimes(1)
    expect(editableField).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: false,
        name: 'actualSignDate',
        onChange: 'onChange',
        queryValue: 'query',
        updateOnBlur: true,
        value: editableFieldValue,
        viewer,
        editor: expect.any(Function)
      }),
      {}
    )
  })
})
