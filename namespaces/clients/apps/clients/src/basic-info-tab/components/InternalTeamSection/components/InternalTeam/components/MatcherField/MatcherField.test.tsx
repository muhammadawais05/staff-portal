import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { ClientMatcherEdge } from '@staff-portal/graphql/staff'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import {
  getClientMatchersForVerticalHook,
  getClientMatchersHook
} from '../../utils'
import { MatcherFieldIcon, MatcherFieldViewer } from './components'
import { adjustClientMatcherValues } from './utils'
import MatcherField from '.'

jest.mock('../../utils', () => ({
  getClientMatchersForVerticalHook: jest.fn(),
  getClientMatchersHook: jest.fn()
}))
jest.mock('./utils', () => ({
  adjustClientMatcherValues: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useEditableFieldChangeHandler: jest.fn()
}))

jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))

const editableFieldMock = EditableField as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const getClientMatchersForVerticalHookMock =
  getClientMatchersForVerticalHook as jest.Mock
const getClientMatchersHookMock = getClientMatchersHook as jest.Mock
const adjustClientMatcherValuesMock = adjustClientMatcherValues as jest.Mock

describe('Matcher field', () => {
  const onChange = 'onChange'
  const queryOptions = 'queryOptions'
  const queryValue = 'queryValue'

  it('renders as expected', () => {
    editableFieldMock.mockReturnValue(null)
    adjustClientMatcherValuesMock.mockReturnValue(null)
    useEditableFieldChangeHandlerMock.mockReturnValue(onChange)
    getClientMatchersForVerticalHookMock.mockReturnValue(queryOptions)
    getClientMatchersHookMock.mockReturnValue(queryValue)
    const clientId = 'clientId'
    const vertical = { id: '123', talentType: 'product_manager' }
    const value = {
      node: {
        id: 'staffId',
        role: {
          id: 'roleId',
          webResource: {
            text: 'Érico Sabino',
            url: 'https://staging.toptal.net/platform/staff/staff/1812532'
          }
        }
      },
      handoff: {
        fullName: 'Janis Rutherford'
      }
    }
    const operation = createOperationMock()

    render(
      <MatcherField
        clientId={clientId}
        value={value as ClientMatcherEdge}
        operation={operation}
        vertical={vertical}
      />
    )

    expect(getClientMatchersHookMock).toHaveBeenCalledWith(
      clientId,
      vertical.talentType
    )
    expect(getClientMatchersForVerticalHookMock).toHaveBeenCalledWith(vertical)
    expect(editableFieldMock).toHaveBeenCalledTimes(1)
    expect(editableFieldMock).toHaveBeenCalledWith(
      {
        editor: expect.any(Function),
        name: 'matcherId',
        onChange,
        queryOptions,
        queryValue,
        flex: true,
        disabled: false,
        value: value.node.role.id,
        adjustValues: adjustClientMatcherValuesMock,
        icon: expect.objectContaining({
          type: MatcherFieldIcon,
          props: {
            value
          }
        }),
        viewer: expect.objectContaining({
          type: MatcherFieldViewer,
          props: {
            value: value.node.role
          }
        })
      },
      {}
    )
  })
})
