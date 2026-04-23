import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import {
  ClientClaimerCategory,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import ClaimerCategory from '.'
import { getClientClaimerCategoryHook } from '../../utils'

jest.mock('@staff-portal/mutation-result-handlers/src/hooks')
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('../../utils', () => ({
  getClientClaimerCategoryHook: jest.fn()
}))
jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    Select: jest.fn()
  }
}))

const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const editableFieldMock = EditableField as jest.Mock
const getClientClaimerCategoryHookMock =
  getClientClaimerCategoryHook as jest.Mock

describe('ClaimerCategory', () => {
  beforeEach(() => {
    useEditableFieldChangeHandlerMock.mockReturnValue('change')
    getClientClaimerCategoryHookMock.mockReturnValue('query')
    editableFieldMock.mockReturnValue(null)
  })

  it('renders claimer category', () => {
    const clientId = 'clientId'
    const value = ClientClaimerCategory.CORE
    const operation = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }

    render(
      <ClaimerCategory
        clientId={clientId}
        value={value}
        operation={operation}
      />
    )

    expect(getClientClaimerCategoryHookMock).toHaveBeenCalledTimes(1)
    expect(getClientClaimerCategoryHookMock).toHaveBeenCalledWith(clientId)
    expect(editableFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: false,
        editor: expect.any(Function),
        name: 'claimerCategory',
        onChange: 'change',
        queryValue: 'query',
        value: 'CORE',
        viewer: 'Core'
      }),
      {}
    )
  })
})
