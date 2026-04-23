import { DatePickerValue } from '@toptal/picasso'

import { useUserContext } from '../../context/userContext'
import { formatToKeepOriginalDate } from '../../dateTime'

// TODO:
// Remove once the following issue has been merged
// https://github.com/toptal/picasso/issues/1236
// issue is closed, however problem still exists
export const temporaryOnChangeHandler = (value: DatePickerValue) => {
  return value ? formatToKeepOriginalDate(value as Date) : value
}

export const useDatepickerTimezoneProps = () => {
  const {
    currentUser,
    datepickerDisplayDateFormat,
    datepickerEditDateFormat,
    weekStartsOn
  } = useUserContext()

  return {
    // TODO:
    // Remove once the following issue has been merged
    // https://github.com/toptal/picasso/issues/1236
    // issue is closed, however problem still exists
    onChange: temporaryOnChangeHandler,
    displayDateFormat: datepickerDisplayDateFormat || undefined, // empty string not allowed, so passing undefined for that case
    editDateFormat: datepickerEditDateFormat || undefined, // empty string not allowed, so passing undefined for that case
    timezone: currentUser?.timeZone?.value,
    weekStartsOn
  }
}
