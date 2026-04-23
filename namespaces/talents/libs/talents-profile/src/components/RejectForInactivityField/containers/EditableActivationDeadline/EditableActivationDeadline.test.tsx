import React, { ComponentProps } from 'react'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { Typography } from '@toptal/picasso'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { isOperationEnabled } from '@staff-portal/operations'

import { getActivationDeadlineHook } from '../../utils/get-activation-deadline-hook/get-activation-deadline-hook'
import EditableActivationDeadline from './EditableActivationDeadline'
import { Deadline } from '../../types'

jest.mock(
  '../../utils/get-activation-deadline-hook/get-activation-deadline-hook'
)
jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  parseAndFormatDate: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useEditableFieldChangeHandler: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  ...jest.requireActual('@staff-portal/editable'),
  EditableField: jest.fn()
}))
jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  isOperationEnabled: jest.fn()
}))

const EditableFieldMock = EditableField as jest.Mock
const isOperationEnabledMock = isOperationEnabled as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const getActivationDeadlineHookMock = getActivationDeadlineHook as jest.Mock
const parseAndFormatDateMock = parseAndFormatDate as jest.Mock

const renderComponent = (
  props: ComponentProps<typeof EditableActivationDeadline>
) => {
  render(
    <TestWrapper>
      <EditableActivationDeadline {...props} />
    </TestWrapper>
  )
}

describe('EditableActivationDeadline', () => {
  describe('when called with expected props', () => {
    it('renders as expected', () => {
      const fieldName = 'deadline'
      const timeZone = Symbol() as unknown as string
      const talentId = Symbol() as unknown as string
      const queryValue = Symbol()
      const onChange = Symbol()
      const disabled = Symbol() as unknown as boolean
      const parsedDate = Symbol()
      const deadline = {
        date: Symbol(),
        id: Symbol(),
        operation: Symbol()
      } as unknown as Deadline

      getActivationDeadlineHookMock.mockReturnValueOnce(queryValue)
      useEditableFieldChangeHandlerMock.mockReturnValueOnce(onChange)
      EditableFieldMock.mockReturnValueOnce(null)
      parseAndFormatDateMock.mockReturnValueOnce(parsedDate)
      isOperationEnabledMock.mockReturnValueOnce(disabled)

      renderComponent({
        deadline,
        talentId,
        timeZone
      })

      expect(parseAndFormatDateMock).toHaveBeenCalledWith(deadline.date, {
        timeZone
      })
      expect(isOperationEnabledMock).toHaveBeenCalledWith(deadline.operation)
      expect(getActivationDeadlineHookMock).toHaveBeenCalledWith(deadline.id)
      expect(useEditableFieldChangeHandlerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          initialValues: { deadline: deadline.date },
          requiredValues: { talentId },
          mutationResultOptions: {
            successMessageEmitOptions: {
              type: TALENT_UPDATED,
              payload: { talentId }
            }
          }
        })
      )
      expect(EditableFieldMock).toHaveBeenCalledWith(
        expect.objectContaining({
          name: fieldName,
          queryValue,
          disabled: !disabled,
          value: deadline.date,
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
