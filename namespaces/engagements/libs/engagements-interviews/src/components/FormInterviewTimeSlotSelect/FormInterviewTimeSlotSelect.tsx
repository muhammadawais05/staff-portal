import { Form, useField, useForm, OnChange } from '@toptal/picasso-forms'
import React, { useMemo, useState, useCallback } from 'react'
import { Loader } from '@toptal/picasso'

import { TimeSlotType } from '../../types'

export interface Props {
  timeSlots?: TimeSlotType[] | null
  timeSlotsLoading: boolean
  timeFieldName: string
  dateFieldName: string
}

const FormInterviewTimeSlotSelect = ({
  timeSlots,
  timeSlotsLoading,
  timeFieldName,
  dateFieldName
}: Props) => {
  const { change } = useForm()
  const filterTimeSlots = useCallback(
    (date: string) =>
      (timeSlots || [])
        .filter(({ date: slotDate }) => date === slotDate)
        .flatMap(({ hours }) =>
          hours.map(hour => ({ value: hour, text: hour }))
        ),
    [timeSlots]
  )

  const {
    input: { value: date }
  } = useField<string>(dateFieldName)
  const [timeOptions, setTimeOptions] = useState<
    { text: string; value: string }[]
  >(filterTimeSlots(date))

  const handleDateChange = useCallback(
    (value: string) => {
      change(timeFieldName, '')
      setTimeOptions(filterTimeSlots(value))
    },
    [change, filterTimeSlots, timeFieldName]
  )

  const dateOptions = useMemo(
    () =>
      (timeSlots || []).map(({ date: slotDate }) => ({
        value: slotDate,
        text: slotDate
      })),
    [timeSlots]
  )

  const dateLoading = timeSlotsLoading
  const dateDisabled = dateLoading || !dateOptions.length

  return (
    <>
      <OnChange name={dateFieldName}>{handleDateChange}</OnChange>

      <Form.Select
        required
        name={dateFieldName}
        label='Date'
        width='full'
        options={dateOptions}
        disabled={dateDisabled}
        loading={dateLoading}
        iconPosition='end'
        icon={
          dateLoading && (
            <Loader
              size='small'
              data-testid='FormInterviewTimeSlotSelect-date-loader'
            />
          )
        }
        data-testid='FormInterviewTimeSlotSelect-date'
      />

      {date && (
        <Form.Select
          required
          name={timeFieldName}
          label='Time'
          width='full'
          options={timeOptions}
          data-testid='FormInterviewTimeSlotSelect-time'
        />
      )}
    </>
  )
}

export default FormInterviewTimeSlotSelect
