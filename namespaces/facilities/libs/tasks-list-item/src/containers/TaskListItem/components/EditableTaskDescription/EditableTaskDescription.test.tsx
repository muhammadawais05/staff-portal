import React, { ComponentProps } from 'react'
import {
  EditableField,
  getAdjustSingleStringValue
} from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import { getTaskDescriptionHook } from './utils/get-representative-information-hook'
import EditableTaskDescription from '.'
import { DescriptionWithTooltip } from './components/DescriptionWithTooltip'

jest.mock('./utils/get-representative-information-hook')
jest.mock('./components/DescriptionWithTooltip', () => ({
  DescriptionWithTooltip: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(),
  getAdjustSingleStringValue: jest.fn()
}))

const mockedEditableField = EditableField as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const getAdjustSingleStringValueMock = getAdjustSingleStringValue as jest.Mock
const getTaskDescriptionHookMock = getTaskDescriptionHook as jest.Mock

const renderComponent = (
  props: ComponentProps<typeof EditableTaskDescription>
) => {
  render(
    <TestWrapper>
      <EditableTaskDescription {...props} />
    </TestWrapper>
  )
}

describe('EditableTaskDescription', () => {
  describe('when called with expected props', () => {
    it('renders as expected', () => {
      const fieldName = 'description'
      const value = 'description'
      const taskId = 'taskId'
      const queryValue = 'queryValue'
      const adjustValues = 'adjustValues'
      const onChange = 'onChange'
      const disabled = {} as unknown as boolean
      const lineThrough = {} as unknown as boolean
      const disputed = {} as unknown as boolean
      const status = 'status'

      getTaskDescriptionHookMock.mockReturnValue(queryValue)
      getAdjustSingleStringValueMock.mockReturnValue(adjustValues)
      useEditableFieldChangeHandlerMock.mockReturnValue(onChange)
      mockedEditableField.mockReturnValue(null)

      renderComponent({
        taskId,
        description: value,
        disabled,
        lineThrough,
        disputed,
        status
      })

      expect(getTaskDescriptionHookMock).toHaveBeenCalledWith(taskId)
      expect(getAdjustSingleStringValueMock).toHaveBeenCalledWith(fieldName)
      expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          requiredValues: { taskId },
          initialValues: { description: value }
        })
      )
      expect(mockedEditableField).toHaveBeenCalledWith(
        expect.objectContaining({
          name: fieldName,
          queryValue,
          disabled,
          value,
          onChange,
          adjustValues,
          editor: expect.any(Function),
          viewer: expect.objectContaining({
            type: DescriptionWithTooltip,
            props: {
              status,
              taskId,
              lineThrough,
              disputed,
              description: value
            }
          })
        }),
        {}
      )
    })
  })
})
