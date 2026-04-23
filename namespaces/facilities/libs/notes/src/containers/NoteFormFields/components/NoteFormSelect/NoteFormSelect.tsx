import { Form } from '@toptal/picasso-forms'
import React, { useMemo } from 'react'

import { NoteFormAnswerBuilderType } from '../../../../types'

const NoteFormSelect = ({
  index,
  required,
  options,
  placeholder,
  disabled
}: NoteFormAnswerBuilderType) => {
  const selectOptions = useMemo(
    () => options?.map(({ label, value }) => ({ text: label, value })) ?? [],
    [options]
  )

  return (
    <Form.Select
      required={required}
      placeholder={placeholder}
      name={`answers[${index}].value`}
      options={selectOptions}
      disabled={disabled}
    />
  )
}

export default NoteFormSelect
