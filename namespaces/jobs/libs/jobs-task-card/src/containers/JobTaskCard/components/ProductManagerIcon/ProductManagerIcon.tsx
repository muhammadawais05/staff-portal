import React from 'react'
import { palette } from '@toptal/picasso/utils'
import { TaskIconProps, TASK_ICON_BASE_SIZE } from '@staff-portal/tasks'

const ProductManagerIcon = ({
  color = palette.blue.main,
  scale = 1
}: TaskIconProps) => {
  const scaledSize = TASK_ICON_BASE_SIZE * scale
  const svgStyle = {
    width: `${scaledSize}px`,
    height: `${scaledSize}px`
  }

  return (
    <svg style={svgStyle} viewBox='0 0 40 40'>
      <polygon
        fill={color}
        points='5 36.707 2.646 34.354 3.354 33.646 5 35.293 9.646 30.646 10.354 31.354 5 36.707'
      />
      <polygon
        fill={color}
        points='11 40 0 40 0 29 7 29 7 30 1 30 1 39 10 39 10 35 11 35 11 40'
      />
      <polygon
        fill={color}
        points='19 36.707 16.646 34.354 17.354 33.646 19 35.293 23.646 30.646 24.354 31.354 19 36.707'
      />
      <polygon
        fill={color}
        points='25 40 14 40 14 29 21 29 21 30 15 30 15 39 24 39 24 35 25 35 25 40'
      />
      <polygon
        fill={color}
        points='33 36.707 30.646 34.354 31.354 33.646 33 35.293 37.646 30.646 38.354 31.354 33 36.707'
      />
      <polygon
        fill={color}
        points='39 40 28 40 28 29 35 29 35 30 29 30 29 39 38 39 38 35 39 35 39 40'
      />
      <path
        fill={color}
        d='M19.5,19A9.5,9.5,0,1,1,29,9.5,9.51081,9.51081,0,0,1,19.5,19Zm0-18A8.5,8.5,0,1,0,28,9.5,8.50951,8.50951,0,0,0,19.5,1Z'
      />
      <rect fill={color} x='19' y='18' width='1' height='9' />
      <polygon
        fill={color}
        points='34 27 33 27 33 24 6 24 6 27 5 27 5 23 34 23 34 27'
      />
      <path
        fill={color}
        d='M19.5,11A3.5,3.5,0,1,1,23,7.5,3.50409,3.50409,0,0,1,19.5,11Zm0-6A2.5,2.5,0,1,0,22,7.5,2.50294,2.50294,0,0,0,19.5,5Z'
      />
      <path
        fill={color}
        d='M25,17H24V15.5a4.48557,4.48557,0,0,0-1.6499-3.48242,4.53485,4.53485,0,0,0-3.78565-.92359A4.60322,4.60322,0,0,0,15,15.68823V17H14V15.68823a5.60472,5.60472,0,0,1,4.36816-5.5747A5.505,5.505,0,0,1,25,15.5Z'
      />
    </svg>
  )
}

export default ProductManagerIcon
