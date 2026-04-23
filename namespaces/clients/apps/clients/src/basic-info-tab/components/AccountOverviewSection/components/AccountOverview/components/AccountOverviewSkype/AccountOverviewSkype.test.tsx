import React from 'react'
import { render } from '@testing-library/react'
import {
  ContactType,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { CompanyOperationFragment } from '@staff-portal/clients'

import AccountOverviewSkype from '.'
import { SkypeViewer } from '../SkypeViewer'
import { getClientSkypeHook } from '../../utils'

jest.mock('../../utils')
jest.mock('@staff-portal/mutation-result-handlers/src/hooks')
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(),
  getAdjustSingleStringValue: () => 'adjustFunction'
}))
jest.mock('../SkypeViewer')
jest.mock('@staff-portal/communication', () => ({
  ...jest.requireActual('@staff-portal/communication'),
  SkypeLink: jest.fn()
}))
jest.mock('@staff-portal/operations/src/utils')

const editableFieldMock = EditableField as jest.Mock
const getClientSkypeHookMock = getClientSkypeHook as jest.Mock
const isOperationEnabledMock = isOperationEnabled as jest.Mock

const arrangeTest = (operationEnabled: boolean) => {
  const getValue = jest.fn(() => 'query')
  const editableField = jest.fn(() => null)

  getClientSkypeHookMock.mockImplementation(getValue)
  editableFieldMock.mockImplementation(editableField)
  isOperationEnabledMock.mockImplementation(() => operationEnabled)

  return { getValue, editableField }
}

describe('AccountOverviewSkype', () => {
  it.each([
    [{ operationEnabled: true, disabled: false }],
    [{ operationEnabled: false, disabled: true }]
  ])('renders as expected', ({ operationEnabled, disabled }) => {
    const skypeId = 'skype-test-id'
    const { editableField } = arrangeTest(operationEnabled)
    const operation: CompanyOperationFragment = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }

    render(
      <TestWrapper>
        <AccountOverviewSkype
          clientId='id'
          contact={{
            id: '123',
            fullName: 'test',
            email: 'test',
            contacts: {
              nodes: [{ id: '123', type: ContactType.SKYPE, value: skypeId }]
            },
            webResource: {
              url: 'test',
              text: 'test'
            },
            operations: {
              updateCompanyRepresentativePhoneNumbers: {
                callable: OperationCallableTypes.DISABLED,
                messages: []
              }
            },
            orderedPhoneNumbers: {
              totalCount: 0,
              nodes: []
            }
          }}
          operation={operation}
        />
      </TestWrapper>
    )

    expect(getClientSkypeHookMock).toHaveBeenCalledTimes(1)
    expect(isOperationEnabledMock).toHaveBeenCalledTimes(1)

    expect(editableField).toHaveBeenCalledTimes(1)
    expect(editableField).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: disabled,
        name: 'skype',
        queryValue: 'query',
        adjustValues: 'adjustFunction',
        updateOnBlur: true,
        value: skypeId,
        viewer: expect.objectContaining({
          type: SkypeViewer,
          props: {
            skypeId
          }
        }),
        editor: expect.any(Function)
      }),
      {}
    )
  })
})
