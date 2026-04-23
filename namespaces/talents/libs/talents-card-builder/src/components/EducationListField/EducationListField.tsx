import { useField } from '@toptal/picasso-forms'
import React from 'react'

import type { ProfileEducation } from '../../types'
import { toggle } from '../../utils/toggle'
import EducationList from '../EducationList'

export interface EducationListFieldProps {
  name: string
  data: ProfileEducation[]
}

const EducationListField = ({ name, ...rest }: EducationListFieldProps) => {
  const {
    input: { value, onChange, onBlur }
  } = useField(name)

  return (
    <EducationList
      {...rest}
      value={value}
      toggleItem={id => {
        onChange(
          toggle(
            value.slice(),
            { id, type: 'education' },
            current => current.id === id
          )
        )
        onBlur()
      }}
    />
  )
}

export default EducationListField
