import { FocusEvent, SyntheticEvent } from 'react'
import { AnyObject } from '@toptal/picasso-forms'
import pluralize from 'pluralize'
import { TimesheetRecord, Maybe, Scalars } from '@staff-portal/graphql/staff'
import {
  getCurrentTime,
  getDifferenceInDays,
  getHoursMinutes,
  getISODay,
  getMinutes
} from '@staff-portal/billing/src/_lib/dateTime'

export const timesheetInputEmptyValue = '00'

export interface TimesheetEditFormInput {
  date: Scalars['Date']
  hours: string
  isBreak: boolean
  minutes: string
  note?: Maybe<string>
}

export type UseCallbackDayEditHandleOnFocus = (
  handleFinalFormOnFocus: any,
  setFocus: (value: boolean) => void
) => (event: SyntheticEvent<HTMLInputElement>) => void

export const useCallbackDayEditHandleOnFocus =
  (handleFinalFormOnFocus: any, setFocus: (value: boolean) => void) =>
  (event: SyntheticEvent<HTMLInputElement>): void => {
    ;(event.target as HTMLInputElement).select()
    setFocus(true)
    handleFinalFormOnFocus(event)
  }

export type UseCallbackDayEditHandleOnBlur = (
  handleFinalFormOnChange: (value: string) => void,
  handleFinalFormOnBlur: (event: FocusEvent<HTMLInputElement>) => void,
  setFocus: (value: boolean) => void
) => (event: SyntheticEvent<HTMLInputElement>) => void

export const useCallbackDayEditHandleOnBlur =
  (
    handleFinalFormOnChange: (value: string) => void,
    handleFinalFormOnBlur: (event: FocusEvent<HTMLInputElement>) => void,
    setFocus: (value: boolean) => void
  ) =>
  (event: SyntheticEvent<HTMLInputElement>): void => {
    const { value } = event.target as HTMLInputElement

    if (!value) {
      handleFinalFormOnChange(timesheetInputEmptyValue)
    } else if (value.length < 2) {
      handleFinalFormOnChange('0' + value)
    }
    setFocus(false)
    handleFinalFormOnBlur(event as any)
  }

export type UseCallbackDayEditHandleOnChange = (
  handleFinalFormOnChange: (value: string) => void
) => (
  event: SyntheticEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  >
) => void

export const useCallbackDayEditHandleOnChange =
  (handleFinalFormOnChange: (value: string) => void) =>
  (
    event: SyntheticEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ): void => {
    const { value } = event.target as
      | HTMLTextAreaElement
      | HTMLInputElement
      | HTMLSelectElement
    const cleanedValue = value.replace(/\D/g, '')

    if (cleanedValue.length > 2) {
      handleFinalFormOnChange(cleanedValue.slice(0, 2))
    } else {
      handleFinalFormOnChange(cleanedValue)
    }
  }

/**
 * Prepare BE `TimesheetRecords` values for FE mapping
 * @param timesheetRecords
 * @param breaksPeriod
 */
export const getTimesheetInputInitValues = (
  timesheetRecords: TimesheetRecord[],
  breaksPeriod: string[]
) =>
  timesheetRecords.reduce(
    (
      acc: TimesheetEditFormInput[],
      { date, duration, note }: TimesheetRecord
    ) => {
      let adjustedMin = timesheetInputEmptyValue
      let adjustedHr = timesheetInputEmptyValue

      if (duration) {
        const { hours, minutes } = getHoursMinutes({
          minutes: Number(duration)
        })

        adjustedMin = ('0' + minutes).substr(-2)
        adjustedHr = ('0' + hours).substr(-2)
      }

      const isBreak = breaksPeriod.includes(date)

      acc.push({
        date,
        hours: adjustedHr,
        isBreak,
        minutes: adjustedMin,
        note
      })

      return acc
    },
    []
  )

/**
 * Prepare empty `TimesheetRecords` state
 * @param startDate
 * @param endDate
 * @param breaksPeriod
 */
export const getTimesheetInputEmptyInitValues = (
  startDate: Scalars['Date'],
  endDate: Scalars['Date'],
  breaksPeriod: string[]
): TimesheetEditFormInput[] => {
  if (!startDate || !endDate) {
    return []
  }

  const lengthOfRecords = getDifferenceInDays({
    end: endDate,
    start: startDate
  })

  const preparedValues = Array.from(new Array(lengthOfRecords)).map(
    (e, index) => {
      const date = getISODay(startDate, index)
      const isBreak = breaksPeriod.includes(date)

      return {
        date,
        hours: timesheetInputEmptyValue,
        isBreak,
        minutes: timesheetInputEmptyValue,
        note: ''
      }
    }
  )

  preparedValues.push({
    date: endDate,
    hours: timesheetInputEmptyValue,
    isBreak: breaksPeriod.includes(endDate),
    minutes: timesheetInputEmptyValue,
    note: ''
  })

  return preparedValues
}

export const getTimesheetSubmitChanges = ({
  timesheetComment,
  timesheetRecords,
  billingCycleId
}: AnyObject): AnyObject => {
  const preparedRecords: TimesheetRecord[] = timesheetRecords.reduce(
    (
      acc: TimesheetRecord[],
      { date, hours, minutes, isBreak, note }: TimesheetEditFormInput
    ) => {
      if (!isBreak) {
        acc.push({
          date,
          duration: getMinutes({
            hours: Number(hours),
            minutes: Number(minutes)
          }).toString(),
          note
        })
      }

      return acc
    },
    []
  )

  return {
    comment: timesheetComment || '',
    timesheetRecords: preparedRecords,
    billingCycleId
  }
}

export interface TimesheetTotal {
  hours: number
  minutes: number
}

/**
 * Sum up edit Timesheet time
 * @param timesheetRecords
 */
export const getTimesheetEditTotal = (
  timesheetRecords: TimesheetEditFormInput[]
): TimesheetTotal =>
  getHoursMinutes(
    timesheetRecords.reduce(
      (acc, { hours, minutes }) => {
        acc.hours =
          acc.hours +
          (hours === timesheetInputEmptyValue || !hours ? 0 : Number(hours))
        acc.minutes =
          acc.minutes +
          (minutes === timesheetInputEmptyValue || !minutes
            ? 0
            : Number(minutes))

        return acc
      },
      { hours: 0, minutes: 0 }
    )
  )

interface GetSubmissionOverdueLeft {
  timesheetSubmissionDeadline: Scalars['Time']
}

export const getSubmissionOverdueLeft = ({
  timesheetSubmissionDeadline
}: GetSubmissionOverdueLeft) => {
  const daysLeft = Number(
    getDifferenceInDays({
      end: timesheetSubmissionDeadline,
      start: getCurrentTime()
    }).toFixed()
  )

  return daysLeft > 0
    ? `${daysLeft} ${pluralize('day', daysLeft)}`
    : 'less than a day'
}
