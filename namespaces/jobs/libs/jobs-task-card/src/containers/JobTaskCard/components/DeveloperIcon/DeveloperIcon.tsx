import React from 'react'
import { palette } from '@toptal/picasso/utils'
import { TaskIconProps, TASK_ICON_BASE_SIZE } from '@staff-portal/tasks'

const DeveloperIcon = ({
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
      <path fill={color} d='M40,35H0V5H40ZM1,34H39V6H1Z' />
      <rect fill={color} x='3' y='8' width='1' height='1' />
      <rect fill={color} x='5' y='8' width='1' height='1' />
      <rect fill={color} x='7' y='8' width='1' height='1' />
      <polygon
        fill={color}
        points='12.646 26.354 7.293 21 12.646 15.646 13.354 16.354 8.707 21 13.354 25.646 12.646 26.354'
      />
      <polygon
        fill={color}
        points='27.354 26.354 26.646 25.646 31.293 21 26.646 16.354 27.354 15.646 32.707 21 27.354 26.354'
      />
      <rect
        fill={color}
        x='9.70437'
        y='20.50001'
        width='20.59126'
        height='0.99998'
        transform='translate(-8.07189 28.27799) rotate(-60.93181)'
      />
      <rect fill={color} x='9' y='39' width='22' height='1' />
      <rect fill={color} x='9' width='22' height='1' />
    </svg>
  )
}

export default DeveloperIcon
