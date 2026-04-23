import { DatePicker, DatePickerValue } from '@toptal/picasso'
import React, { ComponentProps, FC, memo } from 'react'
import { parseHumanReadableDate } from '@staff-portal/date-time-utils'
import { Scalars } from '@staff-portal/graphql/staff'

import {
  FieldInputProps,
  FormInputDatePickerOnChange
} from '../../@types/types'
import { convertToJSDate, formatToKeepOriginalDate } from '../../_lib/dateTime'
import { useUserContext } from '../../_lib/context/userContext'
import FormInputWrapper from '../FormInputWrapper'

const displayName = 'FormInputDatePicker'

interface Props extends ComponentProps<typeof FormInputWrapper> {
  handleOnChange?: FormInputDatePickerOnChange
  input: FieldInputProps<Scalars['Date']>
  inputProps?: ComponentProps<typeof DatePicker>
}

export const FormInputDatePicker: FC<Props> = memo<Props>(
  ({
    input,
    meta,
    hint,
    label,
    required,
    testId,
    inputProps,
    handleOnChange
  }) => {
    const { onChange: onInputChange, value: inputValue } = input
    const {
      currentUser,
      datepickerDisplayDateFormat,
      datepickerEditDateFormat,
      weekStartsOn
    } = useUserContext()

    const timezone = currentUser?.timeZone?.value

    // TODO:
    // Remove once the folling issue has been merged
    // https://github.com/toptal/picasso/issues/1236
    // issue is closed, however problem still exists
    const temporaryOnChangeHandler = (value: DatePickerValue) => {
      const adjustedValue = value
        ? formatToKeepOriginalDate(value as Date)
        : value

      return handleOnChange
        ? handleOnChange(onInputChange, adjustedValue)
        : onInputChange(adjustedValue)
    }

    const datePickerProps: ComponentProps<typeof DatePicker> = {
      ...input,
      ...inputProps,
      displayDateFormat: datepickerDisplayDateFormat,
      editDateFormat: datepickerEditDateFormat,
      id: label ? testId : undefined,
      onChange: temporaryOnChangeHandler,
      // Saw no changes with and without `timezone` specified.
      // Checked it with `Antarctica/McMurdo` (UTC+12:00) timezone (changed it at mocks and at chrome dev tools),
      // `Today` shifts to the next day (because of +12),
      // still calendars looks and works the same whatever timezone specified or not.
      // @see _fixtures/users/index.ts StaffUser#timeZone + chrome dev tools sensors timezone ID.
      // Anyway we agreed to use it
      timezone,
      value: inputValue ? convertToJSDate(inputValue) : undefined,
      weekStartsOn
    }

    return (
      // TODO: related Picasso issue: https://github.com/toptal/picasso/issues/827
      <FormInputWrapper
        hint={hint}
        label={label}
        meta={meta}
        renderChild={({ isInvalid }) => (
          <DatePicker
            width='full'
            testIds={{
              input: testId
            }}
            parseInputValue={parseHumanReadableDate}
            {...datePickerProps}
            error={isInvalid}
          />
        )}
        required={required}
        testId={testId}
      />
    )
  }
)

FormInputDatePicker.displayName = displayName

export default FormInputDatePicker
