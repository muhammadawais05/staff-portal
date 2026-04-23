import React, { ComponentProps } from 'react'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { Typography } from '@toptal/picasso'
import { Scalars } from '@staff-portal/graphql/staff'

import { getTaskDueDateHook } from './hooks'
import EditableDueDate from '.'

jest.mock('./hooks')
jest.mock('@staff-portal/date-time-utils', () => ({
  getDateForForm: jest.fn(),
  parseAndFormatDate: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(),
  getAdjustDateValue: jest.fn()
}))

const mockedEditableField = EditableField as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const getTaskDueDateHookMock = getTaskDueDateHook as jest.Mock
const parseAndFormatDateMock = parseAndFormatDate as jest.Mock

const renderComponent = (props: ComponentProps<typeof EditableDueDate>) => {
  render(
    <TestWrapper>
      <EditableDueDate {...props} />
    </TestWrapper>
  )
}

describe('EditableDueDate', () => {
  describe('when called with expected props', () => {
    it('renders as expected', () => {
      const fieldName = 'dueDate'
      const value = 'value' as Scalars['Date']
      const taskId = 'taskId'
      const queryValue = 'queryValue'
      const onChange = 'onChange'
      const disabled = {} as unknown as boolean
      const lineThrough = {} as unknown as boolean
      const parsedDate = 'parsedDate'

      getTaskDueDateHookMock.mockReturnValue(queryValue)
      useEditableFieldChangeHandlerMock.mockReturnValue(onChange)
      mockedEditableField.mockReturnValue(null)
      parseAndFormatDateMock.mockReturnValue(parsedDate)

      renderComponent({
        taskId,
        dueDate: value,
        disabled,
        lineThrough
      })

      expect(parseAndFormatDateMock).toHaveBeenCalledWith(value)
      expect(getTaskDueDateHookMock).toHaveBeenCalledWith(taskId)
      expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          initialValues: { dueDate: value },
          requiredValues: { taskId }
        })
      )
      expect(mockedEditableField).toHaveBeenCalledWith(
        expect.objectContaining({
          name: fieldName,
          queryValue,
          disabled,
          value,
          showBaseErrorContainer: false,
          onChange,
          editor: expect.any(Function),
          viewer: expect.objectContaining({
            type: Typography,
            props: expect.objectContaining({
              children: parsedDate
            })
          })
        }),
        {}
      )
    })
  })
})
