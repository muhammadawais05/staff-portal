import React from 'react'
import { render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { CompanyOperationFragment } from '@staff-portal/clients'

import AccountOverviewEmail from '.'
import { getClientEmailHook } from '../../utils'

jest.mock('../../utils')
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')
jest.mock('@staff-portal/editable', () => ({
  getAdjustSingleStringValue: jest.requireActual('@staff-portal/editable')
    .getAdjustSingleStringValue,
  EditableField: jest.fn()
}))
jest.mock('@staff-portal/client-representatives', () => ({
  LinkOverflow: jest.fn()
}))
jest.mock('@staff-portal/operations/src/utils')

const editableFieldMock = EditableField as jest.Mock
const getClientEmailHookMock = getClientEmailHook as jest.Mock
const isOperationEnabledMock = isOperationEnabled as jest.Mock

const arrageTest = (operationEnabled: boolean) => {
  const getValue = jest.fn(() => 'query')
  const editableField = jest.fn(() => null)

  getClientEmailHookMock.mockImplementation(getValue)
  editableFieldMock.mockImplementation(editableField)
  isOperationEnabledMock.mockImplementation(() => operationEnabled)

  return { getValue, editableField, onChange: () => {} }
}

describe('AccountOverviewEmail', () => {
  it.each([
    [{ operationEnabled: true, disabled: false }],
    [{ operationEnabled: false, disabled: true }]
  ])('renders as expected', ({ operationEnabled, disabled }) => {
    const email = 'email@toptal.com'
    const { editableField, onChange } = arrageTest(operationEnabled)
    const operation: CompanyOperationFragment = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }

    render(
      <TestWrapper>
        <AccountOverviewEmail
          clientId='id'
          handleChange={onChange}
          email={email}
          operation={operation}
        />
      </TestWrapper>
    )

    expect(getClientEmailHookMock).toHaveBeenCalledTimes(1)
    expect(isOperationEnabledMock).toHaveBeenCalledTimes(1)

    expect(editableField).toHaveBeenCalledTimes(1)
    expect(editableField).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: disabled,
        name: 'email',
        onChange: onChange,
        queryValue: 'query',
        updateOnBlur: true,
        value: email,
        viewer: expect.objectContaining({
          props: {
            link: {
              url: `mailto:${email}`,
              text: email
            }
          }
        }),
        editor: expect.any(Function)
      }),
      {}
    )
  })
})
