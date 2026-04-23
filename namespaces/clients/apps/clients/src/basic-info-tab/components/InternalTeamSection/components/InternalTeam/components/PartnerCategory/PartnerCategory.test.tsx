import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import {
  ClientPartnerCategory,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import PartnerCategory from '.'
import { getClientPartnerCategoryHook } from '../../utils'

jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers/src/hooks')
jest.mock('../../utils')

const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const editableFieldMock = EditableField as jest.Mock
const getClientPartnerCategoryHookHookMock =
  getClientPartnerCategoryHook as jest.Mock

describe('PartnerCategory', () => {
  beforeEach(() => {
    useEditableFieldChangeHandlerMock.mockReturnValue('change')
    getClientPartnerCategoryHookHookMock.mockReturnValue('query')
    editableFieldMock.mockReturnValue(null)
  })

  it('renders partner category', () => {
    const clientId = 'clientId'
    const value = ClientPartnerCategory.CORE
    const operation = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }

    render(
      <PartnerCategory
        clientId={clientId}
        value={value}
        operation={operation}
      />
    )

    expect(getClientPartnerCategoryHookHookMock).toHaveBeenCalledTimes(1)
    expect(getClientPartnerCategoryHookHookMock).toHaveBeenCalledWith(clientId)
    expect(editableFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: false,
        editor: expect.any(Function),
        name: 'clientPartnerCategory',
        onChange: 'change',
        queryValue: 'query',
        viewer: 'Core',
        value
      }),
      {}
    )
  })
})
