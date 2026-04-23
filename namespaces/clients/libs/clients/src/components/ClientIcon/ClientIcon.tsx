import React from 'react'
import { palette } from '@toptal/picasso/utils'

const DEFAULT_ICON_SIZE = '2.5rem'

type IconProps = {
  size?: string
  color?: string
}

const ClientIcon = ({
  color = palette.blue.main,
  size = DEFAULT_ICON_SIZE
}: IconProps) => {
  const svgStyle = {
    width: size,
    minWidth: size,
    height: size
  }

  return (
    <svg
      style={svgStyle}
      viewBox='0 0 40 40.2356'
      data-testid='company-default-avatar'
    >
      <polygon
        fill={color}
        points='4 40.236 3 40.236 3 12.411 12.297 8.279 12.703 9.193 4 13.061 4 40.236'
      />
      <polygon
        fill={color}
        points='37 40.236 36 40.236 36 10.575 13 1.471 13 40.236 12 40.236 12 0 37 9.896 37 40.236'
      />
      <rect fill={color} y='39.2356' width='40' height='1' />
      <rect fill={color} x='18' y='12.2356' width='1' height='5' />
      <rect fill={color} x='22' y='12.2356' width='1' height='5' />
      <rect fill={color} x='26' y='12.2356' width='1' height='5' />
      <rect fill={color} x='30' y='12.2356' width='1' height='5' />
      <rect fill={color} x='18' y='20.2356' width='1' height='5' />
      <rect fill={color} x='22' y='20.2356' width='1' height='5' />
      <rect fill={color} x='26' y='20.2356' width='1' height='5' />
      <rect fill={color} x='30' y='20.2356' width='1' height='5' />
      <rect fill={color} x='18' y='28.2356' width='1' height='5' />
      <rect fill={color} x='22' y='28.2356' width='1' height='5' />
      <rect fill={color} x='26' y='28.2356' width='1' height='5' />
      <rect fill={color} x='30' y='28.2356' width='1' height='5' />
    </svg>
  )
}

export default ClientIcon
