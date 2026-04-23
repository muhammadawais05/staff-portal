import React, { useCallback, useMemo } from 'react'
import { render } from '@testing-library/react'
import {
  ClientEnterpriseAccountStatusEnum,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { isOperationDisabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import EnterpriseAccountStatusUpdate from './EnterpriseAccountStatusUpdate'
import {
  getEnterpriseAccountStatusAllowedTransactionsHook,
  getEnterpriseAccountStatusHook
} from '../../hooks'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn(),
  useMemo: jest.fn()
}))
jest.mock('../../hooks', () => ({
  getEnterpriseAccountStatusHook: jest.fn(),
  getEnterpriseAccountStatusAllowedTransactionsHook: jest.fn()
}))
jest.mock('@staff-portal/operations/src/utils')

const editableFieldMock = EditableField as jest.Mock
const mockedUseCallback = useCallback as jest.Mock
const mockedUseMemo = useMemo as jest.Mock
const mockedIsOperationDisabled = isOperationDisabled as jest.Mock
const mockedUseEditableFieldChangeHandler =
  useEditableFieldChangeHandler as jest.Mock
const mockedGetEnterpriseAccountStatusHook =
  getEnterpriseAccountStatusHook as jest.Mock
const mockedGetEnterpriseAccountStatusAllowedTransactionsHook =
  getEnterpriseAccountStatusAllowedTransactionsHook as jest.Mock

describe('EnterpriseAccountStatusUpdate', () => {
  it('renders component', () => {
    const operation = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
    const clientId = 'clientId'
    const status = ClientEnterpriseAccountStatusEnum.ACTIVE
    const queryValue = {}
    const queryOptions = {}
    const mockUseCallback = {}
    const mockUseMemo = {}
    const mockIsDisabled = {}
    const mockUseEditableFieldChangeHandler = {}

    editableFieldMock.mockReturnValueOnce(null)
    mockedUseCallback.mockReturnValueOnce(mockUseCallback)
    mockedUseMemo.mockReturnValueOnce(mockUseMemo)
    mockedIsOperationDisabled.mockReturnValueOnce(mockIsDisabled)
    mockedUseEditableFieldChangeHandler.mockReturnValueOnce(
      mockUseEditableFieldChangeHandler
    )
    mockedGetEnterpriseAccountStatusHook.mockReturnValueOnce(queryValue)
    mockedGetEnterpriseAccountStatusAllowedTransactionsHook.mockReturnValueOnce(
      queryOptions
    )

    render(
      <EnterpriseAccountStatusUpdate
        operation={operation}
        status={status}
        clientId={clientId}
      />
    )

    expect(editableFieldMock).toHaveBeenCalledTimes(1)
    expect(editableFieldMock).toHaveBeenCalledWith(
      {
        disabled: mockIsDisabled,
        editor: mockUseCallback,
        flex: true,
        name: 'enterpriseAccountStatus',
        onChange: mockUseEditableFieldChangeHandler,
        queryValue,
        queryOptions,
        value: status,
        viewer: mockUseMemo
      },
      {}
    )
  })
})
