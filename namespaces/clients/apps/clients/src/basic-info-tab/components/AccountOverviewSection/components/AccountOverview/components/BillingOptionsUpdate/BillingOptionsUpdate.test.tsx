import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import BillingOptionsUpdate from '.'
import { getClientBillingOptionsUpdateHook } from '../../utils'

jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(() => null)
}))
jest.mock('../../utils')
jest.mock('@staff-portal/mutation-result-handlers/src/hooks')

const editableFieldMock = EditableField as jest.Mock
const getClientBillingOptionsUpdateHookMock =
  getClientBillingOptionsUpdateHook as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock

const arrangeTest = (
  props: Partial<ComponentProps<typeof BillingOptionsUpdate>> = {}
) => {
  return render(
    <TestWrapper>
      <BillingOptionsUpdate
        clientId='123'
        editingDisabled={false}
        value={props.value}
      />
    </TestWrapper>
  )
}

describe('BillingOptionsUpdate', () => {
  beforeEach(() => {
    editableFieldMock.mockImplementation(() => null)
    useEditableFieldChangeHandlerMock.mockImplementation(() => 'onChange')
    getClientBillingOptionsUpdateHookMock.mockImplementation(() => 'query')
  })

  it.each([
    [true, 1, 'Enabled'],
    [false, 0, 'Disabled']
  ])(
    'renders editable value with expected props',
    (value, expectedValue, expectedViewer) => {
      arrangeTest({ value })

      expect(getClientBillingOptionsUpdateHookMock).toHaveBeenCalledTimes(1)
      expect(getClientBillingOptionsUpdateHookMock).toHaveBeenCalledWith('123')

      expect(editableFieldMock).toHaveBeenCalledTimes(1)
      expect(editableFieldMock).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: false,
          name: 'billingOptionsUpdateEnabled',
          value: expectedValue,
          onChange: 'onChange',
          queryValue: 'query',
          viewer: expectedViewer,
          editor: expect.any(Function),
          adjustValues: expect.any(Function)
        }),
        {}
      )
    }
  )
})
