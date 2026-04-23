import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { PhoneContactsViewer } from '@staff-portal/client-representatives'

import PhoneContacts from './PhoneContacts'
import { adjustValues } from './utils'
import { getClientPhoneContactsHook } from '../../utils/get-client-phone-contacts-hook'

jest.mock('@staff-portal/mutation-result-handlers/src/hooks')
jest.mock('@staff-portal/operations/src/utils')
jest.mock('./utils', () => ({
  adjustValues: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('../../utils/get-client-phone-contacts-hook', () => ({
  getClientPhoneContactsHook: jest.fn()
}))

const mockedEditableField = EditableField as jest.Mock
const mockedUseEditableFieldChangeHandler =
  useEditableFieldChangeHandler as jest.Mock
const mockedGetClientPhoneContactsHook = getClientPhoneContactsHook as jest.Mock
const mockedAdjustValues = adjustValues as jest.Mock
const mockedIsOperationEnabled = isOperationEnabled as jest.Mock

const arrangeTest = (props: ComponentProps<typeof PhoneContacts>) =>
  render(<PhoneContacts {...props} />)

describe('PhoneContacts', () => {
  it('renders component', () => {
    const getValueMock = () => null
    const onChangeMock = () => null
    const editableFieldMock = jest.fn(() => null)
    const isOperationEnabledMock = {}
    const mockAdjustValues = () => null
    const companyRepresentativeId = {} as unknown as string

    mockedGetClientPhoneContactsHook.mockReturnValueOnce(getValueMock)
    mockedUseEditableFieldChangeHandler.mockReturnValueOnce(onChangeMock)
    mockedEditableField.mockImplementation(editableFieldMock)
    mockedIsOperationEnabled.mockReturnValueOnce(isOperationEnabledMock)
    mockedAdjustValues.mockReturnValueOnce(mockAdjustValues)
    const updateCompanyRepresentativePhoneNumbers = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
    const contact = {
      operations: {
        updateCompanyRepresentativePhoneNumbers
      },
      orderedPhoneNumbers: {
        nodes: [],
        totalCount: 0
      },
      contacts: {
        nodes: []
      },
      email: '',
      id: companyRepresentativeId
    }
    const name = 'phones'

    arrangeTest({
      contact,
      name,
      clientId: '123'
    })

    expect(editableFieldMock).toHaveBeenCalledTimes(1)
    expect(editableFieldMock).toHaveBeenCalledWith(
      {
        adjustValues: mockAdjustValues,
        disabled: false,
        name,
        onChange: onChangeMock,
        queryValue: getValueMock,
        value: contact.orderedPhoneNumbers.nodes,
        viewer: expect.objectContaining({
          type: PhoneContactsViewer,
          props: {
            nodes: expect.any(Object),
            nodeData: {
              companyRepresentativeId
            }
          }
        }),
        editor: expect.any(Function),
        fullWidthEditor: true
      },
      {}
    )
  })
})
