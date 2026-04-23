import React from 'react'
import { render } from '@testing-library/react'
import { LeadSource } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { titleize } from '@staff-portal/string'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { getClientLeadSourceHook } from '../../utils/get-client-lead-source-hook'
import ClientLeadSource from '.'

jest.mock('../../utils/get-client-lead-source-hook')
jest.mock('@staff-portal/mutation-result-handlers/src/hooks')
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))

const editableFieldMock = EditableField as jest.Mock
const getClientLeadSourceHookMock = getClientLeadSourceHook as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock

const arrangeTest = () => {
  const getValue = jest.fn(() => 'query')
  const onChange = jest.fn(() => 'onChange')
  const editableField = jest.fn(() => null)

  getClientLeadSourceHookMock.mockImplementation(getValue)
  useEditableFieldChangeHandlerMock.mockImplementation(onChange)
  editableFieldMock.mockImplementation(editableField)

  return { getValue, onChange, editableField }
}

describe('LeadSource', () => {
  it.each([
    [LeadSource.EVENT],
    [LeadSource.INBOUND],
    [LeadSource.OUTBOUND],
    [LeadSource.PARTNER]
  ])('renders as expected', leadSource => {
    const { editableField } = arrangeTest()

    render(
      <TestWrapper>
        <ClientLeadSource
          clientId='id'
          value={leadSource}
          editingDisabled={false}
        />
      </TestWrapper>
    )

    expect(getClientLeadSourceHookMock).toHaveBeenCalledTimes(1)
    expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledTimes(1)

    expect(editableField).toHaveBeenCalledTimes(1)
    expect(editableField).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: false,
        flex: true,
        name: 'leadSource',
        onChange: 'onChange',
        queryValue: 'query',
        value: leadSource,
        viewer: titleize(leadSource),
        editor: expect.any(Function)
      }),
      {}
    )
  })
})
