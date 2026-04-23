import React, { useMemo } from 'react'
import { FormDatePickerWrapper } from '@staff-portal/forms'

import { NoteFormAnswerBuilderType } from '../../../../types'

const NoteFormDatePicker = ({
  index,
  required,
  disabled
}: NoteFormAnswerBuilderType) => {
  const minDate = useMemo(() => new Date(), [])

  return (
    <FormDatePickerWrapper
      minDate={minDate}
      width='full'
      required={required}
      name={`answers[${index}].value`}
      style={disabled ? { pointerEvents: 'none' } : {}}
      disabled={disabled}
    />
  )
}

export default NoteFormDatePicker
