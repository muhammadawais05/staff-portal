import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'

interface Props {
  fullTimeDiscount?: string | null
  partTimeDiscount?: string | null
}

const DefaultDiscount = ({ fullTimeDiscount, partTimeDiscount }: Props) => {
  const getValue = () => {
    const part = `${partTimeDiscount}% part time`
    const full = `${fullTimeDiscount}% full time`

    if (partTimeDiscount && fullTimeDiscount) {
      return `${part} and ${full}`
    }

    return partTimeDiscount ? part : full
  }

  return (
    <TypographyOverflow size='medium' data-testid='DefaultDiscount'>
      {getValue()}
    </TypographyOverflow>
  )
}

export default DefaultDiscount
