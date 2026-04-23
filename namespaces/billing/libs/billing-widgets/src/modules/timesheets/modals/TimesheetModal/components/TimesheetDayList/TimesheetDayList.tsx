import { Grid } from '@toptal/picasso'
import { isEqual } from 'lodash-es'
import React, { FC, memo } from 'react'
import { Maybe, Scalars } from '@staff-portal/graphql/staff'
import { isWeekend, parse } from '@staff-portal/billing/src/_lib/dateTime'

import {
  TimesheetEditFormInput,
  UseCallbackDayEditHandleOnBlur,
  UseCallbackDayEditHandleOnChange,
  UseCallbackDayEditHandleOnFocus
} from '../../../../utils/timesheet'
import TimesheetDay from '../TimesheetDay'
import TimesheetDayEdit from '../TimesheetDayEdit'
import TimesheetDayStatic from '../TimesheetDayStatic'

interface Props {
  breaksArray: string[]
  timesheetRecords: TimesheetEditFormInput[]
  endDate: Scalars['Date']
  isEdit: boolean
  startDate: Scalars['Date']
  onEditDayBlur?: UseCallbackDayEditHandleOnBlur
  onEditDayChange?: UseCallbackDayEditHandleOnChange
  onEditDayFocus?: UseCallbackDayEditHandleOnFocus
}

const displayName = 'TimesheetDayList'

interface RenderPropsBase {
  dayListProps: Props
  firstNonBreakInputIndex: number | undefined
  handleOnBlur?: UseCallbackDayEditHandleOnBlur
  handleOnChange?: UseCallbackDayEditHandleOnChange
  handleOnFocus?: UseCallbackDayEditHandleOnFocus
  day: Scalars['Date']
  note?: Maybe<string>
}

const renderDay = ({
  dayListProps: { timesheetRecords, breaksArray, isEdit },
  firstNonBreakInputIndex,
  handleOnBlur,
  handleOnChange,
  handleOnFocus,
  day,
  note
}: RenderPropsBase) => {
  const isBreak = breaksArray.includes(day)

  let timesheetDayChildren = null

  if (isEdit) {
    const valueIndex = timesheetRecords.findIndex(({ date }) => date === day)
    const elementValue = timesheetRecords[valueIndex]
    const isDisabled =
      elementValue?.isBreak &&
      !Number(elementValue.hours) &&
      !Number(elementValue.minutes)

    timesheetDayChildren = (
      <TimesheetDayEdit
        autoFocusHours={valueIndex === firstNonBreakInputIndex}
        disabled={isDisabled}
        fieldName={`timesheetRecords[${valueIndex}]`}
        handleOnBlur={handleOnBlur as UseCallbackDayEditHandleOnBlur}
        handleOnChange={handleOnChange as UseCallbackDayEditHandleOnChange}
        handleOnFocus={handleOnFocus as UseCallbackDayEditHandleOnFocus}
      />
    )
  } else {
    const selectedData = timesheetRecords.find(
      item => item.date === day
    ) as TimesheetEditFormInput

    timesheetDayChildren = (
      <TimesheetDayStatic
        hours={selectedData.hours}
        minutes={selectedData.minutes}
      />
    )
  }

  return (
    <TimesheetDay
      date={day}
      note={note}
      isBreak={isBreak}
      isWeekend={isWeekend({ date: day })}
      key={day}
    >
      {timesheetDayChildren}
    </TimesheetDay>
  )
}

export const TimesheetDayList: FC<Props> = memo(
  props => {
    const {
      endDate,
      isEdit,
      onEditDayBlur,
      onEditDayChange,
      onEditDayFocus,
      startDate,
      timesheetRecords
    } = props

    const days: TimesheetEditFormInput[] = []

    if (!startDate || !endDate) {
      return null
    }

    const parsedStartDate = parse(startDate)
    const parsedEndDate = parse(endDate)

    if (parsedStartDate.valueOf() > parsedEndDate.valueOf()) {
      return null
    }

    for (
      let day = parsedStartDate;
      day.valueOf() <= parsedEndDate.valueOf();
      day = day.plus({ days: 1 })
    ) {
      const record = timesheetRecords.find(
        ({ date }) => date === day.toISODate()
      )

      if (record) {
        days.push({ ...record })
      }
    }

    let firstNonBreakInputIndex: number | undefined

    if (isEdit) {
      firstNonBreakInputIndex = timesheetRecords.findIndex(
        ({ isBreak }: TimesheetEditFormInput) => !isBreak
      )
    }

    return (
      <Grid data-testid={displayName} spacing={0}>
        {days.map(({ date, note }) =>
          renderDay({
            dayListProps: props,
            firstNonBreakInputIndex,
            handleOnBlur: onEditDayBlur,
            handleOnChange: onEditDayChange,
            handleOnFocus: onEditDayFocus,
            day: date,
            note
          })
        )}
      </Grid>
    )
  },
  (prevProps, nextProps) =>
    isEqual(prevProps.timesheetRecords, nextProps.timesheetRecords)
)

TimesheetDayList.displayName = displayName

export default TimesheetDayList
