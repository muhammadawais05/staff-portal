import React from 'react'
import { render } from '@testing-library/react'
import {
  OperationCallableTypes,
  ContactType
} from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { CompanyOperationFragment } from '@staff-portal/clients'

import { CompanyExternalSourceType } from '../../../../../../../components/CompanyExternalSourceInfo/config'
import CompanyExternalSourceInfo from '../../../../../../../components/CompanyExternalSourceInfo/CompanyExternalSourceInfo'
import { getCompanyHqPhoneHook } from '../../utils'
import CompanyHqPhone from '.'
import CompanyHqPhoneViewer from './CompanyHqPhoneViewer'

jest.mock('../../utils')
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(),
  getAdjustSingleStringValue: () => 'adjustFunction'
}))
jest.mock('@staff-portal/operations/src/utils')
jest.mock(
  '../../../../../../../components/CompanyExternalSourceInfo/CompanyExternalSourceInfo'
)
jest.mock('./CompanyHqPhoneViewer', () => ({
  __esModule: true,
  default: () => null
}))

const getCompanyHqPhoneHookMock = getCompanyHqPhoneHook as jest.Mock
const editableFieldMock = EditableField as jest.Mock
const isOperationEnabledMock = isOperationEnabled as jest.Mock
const CompanyExternalSourceInfoMock = CompanyExternalSourceInfo as jest.Mock

const arrangeTest = (operationEnabled: boolean) => {
  const getValue = jest.fn(() => 'query')
  const editableField = jest.fn(() => null)

  getCompanyHqPhoneHookMock.mockImplementation(getValue)

  editableFieldMock.mockImplementation(editableField)
  isOperationEnabledMock.mockImplementation(() => operationEnabled)

  CompanyExternalSourceInfoMock.mockReturnValue(
    <div data-testid='clientopedia-source-info' />
  )

  return { getValue, editableField, onChange: () => {} }
}

describe('CompanyHqPhone', () => {
  editableFieldMock.mockReturnValue(null)

  it.each([
    [
      {
        operationEnabled: true,
        disabled: false,
        phone: 'phone',
        expectedPhonePassed: 'phone'
      }
    ],
    [
      {
        operationEnabled: false,
        disabled: true,
        phone: '   ',
        expectedPhonePassed: ''
      }
    ]
  ])(
    'renders as expected',
    ({
      operationEnabled,
      disabled,
      phone,
      expectedPhonePassed: expectedPhone
    }) => {
      const clientopediaValue = '+777'
      const clientId = {} as unknown as string
      const { editableField, onChange } = arrangeTest(operationEnabled)
      const operation: CompanyOperationFragment = {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }

      render(
        <CompanyHqPhone
          clientId={clientId}
          handleChange={onChange}
          value={phone}
          clientopediaValue={clientopediaValue}
          operation={operation}
        />
      )

      expect(isOperationEnabledMock).toHaveBeenCalledTimes(1)

      expect(CompanyExternalSourceInfoMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: CompanyExternalSourceType.CLIENTOPEDIA,
          value: clientopediaValue,
          userValue: expectedPhone,
          formattedValue: expect.objectContaining({
            props: {
              clientId,
              destination: clientopediaValue,
              contactType: ContactType.PHONE
            }
          })
        }),
        {}
      )

      expect(editableField).toHaveBeenCalledTimes(1)
      expect(editableField).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: disabled,
          name: 'companyHqPhone',
          onChange: onChange,
          queryValue: 'query',
          adjustValues: 'adjustFunction',
          updateOnBlur: true,
          value: expectedPhone,
          viewer: expect.objectContaining({
            type: CompanyHqPhoneViewer,
            props: {
              clientId,
              value: expectedPhone
            }
          }),
          editor: expect.any(Function)
        }),
        {}
      )
    }
  )
})
