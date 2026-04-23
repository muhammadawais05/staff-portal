import { useField } from '@toptal/picasso-forms'
import React from 'react'

import { ProfileCertification } from '../../types'
import { toggle } from '../../utils/toggle'
import CertificationList from '../CertificationList'

export interface CertificationListFieldProps {
  name: string
  data: ProfileCertification[]
}

const CertificationListField = ({
  name,
  ...rest
}: CertificationListFieldProps) => {
  const {
    input: { value, onChange, onBlur }
  } = useField(name)

  return (
    <CertificationList
      {...rest}
      value={value}
      toggleItem={id => {
        onChange(
          toggle(
            value.slice(),
            { id, type: 'certification' },
            current => current.id === id
          )
        )
        onBlur()
      }}
    />
  )
}

export default CertificationListField
