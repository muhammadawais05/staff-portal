import React from 'react'
import { palette } from '@toptal/picasso/utils'
import { TaskIconProps, TASK_ICON_BASE_SIZE } from '@staff-portal/tasks'

const DesignerIcon = ({
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
        points='39 30 26 30 26 29 38 29 38 1 1 1 1 29 13 29 13 30 0 30 0 0 39 0 39 30'
      />
      <polygon
        fill={color}
        points='24.409 32.288 23.591 31.712 29.424 23.449 21.683 7 17.317 7 9.576 23.449 15.409 31.712 14.591 32.288 8.424 23.551 16.683 6 22.317 6 30.576 23.551 24.409 32.288'
      />
      <rect fill={color} x='19' y='6.5' width='1' height='14' />
      <path
        fill={color}
        d='M19.5,26.5A3.5,3.5,0,1,1,23,23,3.50409,3.50409,0,0,1,19.5,26.5Zm0-6A2.5,2.5,0,1,0,22,23,2.50294,2.50294,0,0,0,19.5,20.5Z'
      />
      <polygon
        fill={color}
        points='25 40 24 40 24 35 15 35 15 40 14 40 14 34 25 34 25 40'
      />
      <rect fill={color} x='11' y='34' width='17' height='1' />
    </svg>
  )
}

export default DesignerIcon
