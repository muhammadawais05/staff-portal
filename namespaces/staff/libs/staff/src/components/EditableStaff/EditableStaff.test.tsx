import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import {
  OperationCallableTypes,
  RoleV2Scope
} from '@staff-portal/graphql/staff'
import { DocumentNode } from '@staff-portal/data-layer-service'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { getStaffRolesHook } from '../../utils'
import { EditableStaff } from '.'
import { EditableStaffViewer } from '../../components'

jest.mock('../../utils', () => ({
  getStaffRolesHook: jest.fn()
}))
jest.mock('./components', () => ({
  ...jest.requireActual('./components'),
  EditableStaffEditor: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))

const getStaffRolesHookMock = getStaffRolesHook as jest.Mock
const editableFieldMock = EditableField as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock

const arrangeTest = (props: ComponentProps<typeof EditableStaff>) => {
  render(<EditableStaff {...props} />)
}

describe('EditableStaff', () => {
  beforeEach(() => {
    getStaffRolesHookMock.mockReturnValue('options')
    editableFieldMock.mockReturnValue(null)
    useEditableFieldChangeHandlerMock.mockReturnValue('onChange')
  })

  it('renders as expected', () => {
    const clientId = 'clientId'
    const operation = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
    const value = { id: 'someId', fullName: 'Ross Geller' }
    const queryHook = jest.fn().mockReturnValue('value')

    arrangeTest({
      operation,
      value,
      name: 'someName',
      scope: RoleV2Scope.SALES_ANALYSTS,
      requiredValues: { clientId },
      mutationDocument: {} as DocumentNode,
      queryHook
    })

    expect(editableFieldMock).toHaveBeenCalledTimes(1)
    expect(editableFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        editor: expect.any(Function),
        disabled: false,
        name: 'someName',
        onChange: 'onChange',
        queryOptions: 'options',
        queryValue: expect.any(Function),
        value: 'someId',
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
