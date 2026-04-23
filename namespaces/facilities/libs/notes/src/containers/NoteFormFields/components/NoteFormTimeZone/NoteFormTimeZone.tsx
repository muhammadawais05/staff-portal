import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import React, { useMemo } from 'react'
import { useGetAvailableTimeZones } from '@staff-portal/date-time-utils'

import { NoteFormAnswerBuilderType } from '../../../../types'

const NoteFormTimeZone = ({
  index,
  placeholder,
  required,
  disabled
}: NoteFormAnswerBuilderType) => {
  const { showError } = useNotifications()

  const { timezones, loading } = useGetAvailableTimeZones({
    onError: () => showError('Error, unable to get timezones.')
  })

  const options = useMemo(
    () =>
      timezones?.map(({ name, value: timeZoneValue }) => ({
        text: name,
        value: timeZoneValue
      })) ?? [],
    [timezones]
  )

  return (
    <Form.Select
      required={required}
      name={`answers[${index}].value`}
      placeholder={placeholder}
      loading={loading}
      options={options}
      disabled={disabled}
    />
  )
}

export default NoteFormTimeZone
