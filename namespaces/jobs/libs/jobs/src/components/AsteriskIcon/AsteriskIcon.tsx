import React from 'react'

import * as S from './styles'

interface Props {
  color: string
}

const AsteriskIcon = ({ color }: Props) => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' css={S.asteriskIcon}>
      <rect x='6.5' y='0' width='3' height='16' fill={color} strokeWidth='0' />
      <rect
        x='6.5'
        y='0'
        width='3'
        height='16'
        fill={color}
        strokeWidth='0'
        transform='rotate(60 8 8)'
      />
      <rect
        x='6.5'
        y='0'
        width='3'
        height='16'
        fill={color}
        strokeWidth='0'
        transform='rotate(-60 8 8)'
      />
    </svg>
  )
}

export default AsteriskIcon
