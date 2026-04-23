import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import {
  OperationCallableTypes,
  RoleV2Scope
} from '@staff-portal/graphql/staff'
import { EditableStaffViewer, getStaffRolesHook } from '@staff-portal/staff'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { getClientClientPartnerHook } from '../../utils'
import ClientPartner from '.'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('@staff-portal/staff', () => ({
  ...jest.requireActual('@staff-portal/staff'),
  getStaffRolesHook: jest.fn()
}))
jest.mock('../../utils', () => ({
  getClientClientPartnerHook: jest.fn()
}))

const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const editableFieldMock = EditableField as jest.Mock
const getClientClientPartnerHookMock = getClientClientPartnerHook as jest.Mock
const getStaffRolesHookMock = getStaffRolesHook as jest.Mock

describe('ClientPartner', () => {
  beforeEach(() => {
    useEditableFieldChangeHandlerMock.mockReturnValue('change')
    getClientClientPartnerHookMock.mockReturnValue('query')
    getStaffRolesHookMock.mockReturnValue('options')
    editableFieldMock.mockReturnValue(null)
  })

  it('renders client partner', () => {
    const clientId = 'clientId'
    const value = {
      fullName: 'fullName',
      id: 'id'
    }
    const operation = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }

    render(
      <ClientPartner clientId={clientId} value={value} operation={operation} />
    )

    expect(getClientClientPartnerHookMock).toHaveBeenCalledTimes(1)
    expect(getClientClientPartnerHookMock).toHaveBeenCalledWith(clientId)
    expect(getStaffRolesHookMock).toHaveBeenCalledTimes(1)
    expect(getStaffRolesHookMock).toHaveBeenCalledWith(
      RoleV2Scope.ENTERPRISE_CLAIMERS
    )
    expect(editableFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: false,
        editor: expect.any(Function),
        name: 'clientPartnerId',
        onChange: 'change',
        queryValue: 'query',
        queryOptions: 'options',
        value: 'id',
        viewer: expect.objectContaining({
          type: EditableStaffViewer,
          props: {
            value
          }
        })
      }),
      {}
    )
  })
})
