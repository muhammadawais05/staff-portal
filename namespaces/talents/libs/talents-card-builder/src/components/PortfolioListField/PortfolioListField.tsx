import { useField } from '@toptal/picasso-forms'
import React from 'react'

import { ProfilePortfolioItem } from '../../types'
import { toggle } from '../../utils/toggle'
import PortfolioList from '../PortfolioList'

interface PortfolioListFieldProps {
  title: string
  name: string
  data: ProfilePortfolioItem[]
}

const PortfolioListField = ({ name, ...rest }: PortfolioListFieldProps) => {
  const {
    input: { value, onChange, onBlur }
  } = useField(name)

  return (
    <PortfolioList
      {...rest}
      value={value}
      toggleItem={id => {
        onChange(toggle(value.slice(), id))
        onBlur()
      }}
    />
  )
}

export default PortfolioListField
