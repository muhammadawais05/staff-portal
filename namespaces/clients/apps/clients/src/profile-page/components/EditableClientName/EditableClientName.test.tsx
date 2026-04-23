import React, { ReactElement } from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { isOperationEnabled } from '@staff-portal/operations'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@testing-library/react'
import { Operation } from '@staff-portal/graphql/staff'
import {
  EditableField,
  getAdjustSingleStringValue
} from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { useNotifications } from '@toptal/picasso/utils'

import { useGetClientFullName } from './hooks'
import EditableClientName from './EditableClientName'

jest.mock('@staff-portal/editable', () => ({
  getAdjustSingleStringValue: jest.fn(),
  EditableField: jest.fn()
}))
jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('./hooks', () => ({
  useGetClientFullName: jest.fn()
}))
jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  isOperationEnabled: jest.fn()
}))

const useNotificationsMock = useNotifications as jest.Mock
const mockedEditableField = EditableField as jest.Mock
const isOperationEnabledMock = isOperationEnabled as jest.Mock
const useGetClientFullNameMock = useGetClientFullName as jest.Mock
const getAdjustSingleStringValueMock = getAdjustSingleStringValue as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock

describe('EditableClientName', () => {
  it('renders as expected', () => {
    const clientId = 'clientId'
    const value = 'value'
    const fieldName = 'fullName'
    const operation = 'operation'
    const onChange = 'onChange'
    const queryValue = 'queryValue'
    const adjustValues = 'adjustValues'
    const operationEnabled = 'operationEnabled'
    const icon = 'icon'

    useNotificationsMock.mockReturnValue({ showError: {} })
    mockedEditableField.mockReturnValue(null)
    isOperationEnabledMock.mockReturnValue(operationEnabled)
    useGetClientFullNameMock.mockReturnValue(queryValue)
    getAdjustSingleStringValueMock.mockReturnValue(adjustValues)
    useEditableFieldChangeHandlerMock.mockReturnValue(onChange)

    render(
      <TestWrapper>
        <EditableClientName
          clientId={clientId}
          value={value}
          icon={icon as unknown as ReactElement}
          operation={operation as unknown as Operation}
        />
      </TestWrapper>
    )

    expect(useNotificationsMock).toHaveBeenCalledTimes(1)
    expect(useGetClientFullNameMock).toHaveBeenCalledWith(clientId)
    expect(getAdjustSingleStringValueMock).toHaveBeenCalledWith(fieldName)
    expect(isOperationEnabledMock).toHaveBeenCalledWith(operation)
    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledWith({
      mutationDocument: expect.any(Object),
      initialValues: { fullName: value },
      requiredValues: { clientId },
      onCompleted: expect.any(Function)
    })
    expect(mockedEditableField).toHaveBeenCalledWith(
      {
        value,
        adjustValues,
        onChange,
        icon,
        alignItems: 'center',
        disabled: !operationEnabled,
        name: fieldName,
        queryValue,
        updateOnBlur: true,
        showBaseErrorContainer: false,
        editor: expect.any(Function),
        viewer: expect.objectContaining({
          type: TypographyOverflow,
          props: expect.objectContaining({
            children: value
          })
        })
      },
      {}
    )
  })
})
