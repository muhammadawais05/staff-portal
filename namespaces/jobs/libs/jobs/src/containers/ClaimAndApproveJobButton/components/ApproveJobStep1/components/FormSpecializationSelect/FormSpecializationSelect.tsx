import React, { useMemo } from 'react'
import { Form } from '@toptal/picasso-forms'

export interface Props {
  availableSpecializations?: { id: string; title: string }[]
}

const FormSpecializationSelect = ({ availableSpecializations }: Props) => {
  const options = useMemo(
    () =>
      availableSpecializations?.map(({ id, title }) => ({
        text: title,
        value: id
      })),
    [availableSpecializations]
  )

  if (!options?.length || options.length === 1) {
    return null
  }

  return (
    <Form.Select
      name='specializationId'
      width='full'
      label='Specialization'
      titleCase={false}
      options={options}
      required
    />
  )
}

export default FormSpecializationSelect
