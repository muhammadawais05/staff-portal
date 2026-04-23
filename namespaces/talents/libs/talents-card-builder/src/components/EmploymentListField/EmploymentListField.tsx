import { useField } from '@toptal/picasso-forms'
import React, { useCallback } from 'react'

import { ProfileEmployment } from '../../types'
import EmploymentList from '../EmploymentList'
import { toggleEmployment, toggleEmploymentDescription } from './toggle'

interface EmploymentListFieldProps {
  name: string
  data: ProfileEmployment[]
}

const EmploymentListField = ({ name, data }: EmploymentListFieldProps) => {
  const {
    input: { value, onChange, onBlur }
  } = useField(name)

  const toggleItem = useCallback(
    (id: string) => {
      onChange(toggleEmployment(value.slice(), id))
      onBlur()
    },
    [value, onChange, onBlur]
  )

  const toggleItemDescription = useCallback(
    (id: string, description: string) => {
      onChange(toggleEmploymentDescription(value.slice(), id, description))
      onBlur()
    },
    [value, onChange, onBlur]
  )

  return (
    <EmploymentList
      data={data}
      value={value}
      toggleItem={toggleItem}
      toggleItemDescription={toggleItemDescription}
    />
  )
}

export default EmploymentListField
