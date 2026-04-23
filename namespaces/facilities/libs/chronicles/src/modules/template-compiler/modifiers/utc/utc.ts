import {
  DEFAULT_FULL_DATE_FORMAT,
  displayDate,
  toUTCDate
} from '../../../core/utils'

const utcModifier = (value: string) =>
  displayDate(toUTCDate(value), DEFAULT_FULL_DATE_FORMAT)

export default utcModifier
