import React from 'react'
import { palette } from '@toptal/picasso/utils'
import { TaskIconProps, TASK_ICON_BASE_SIZE } from '@staff-portal/tasks'

const ProjectManagerIcon = ({
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
      <path fill={color} d='M39,35H0V3H39ZM1,34H38V4H1Z' />
      <rect fill={color} x='11' y='39' width='18' height='1' />
      <rect fill={color} x='8' width='1' height='7' />
      <rect fill={color} x='19' width='1' height='7' />
      <rect fill={color} x='30' width='1' height='7' />
      <rect fill={color} x='7' y='12' width='25' height='1' />
      <rect fill={color} x='7' y='17' width='10' height='1' />
      <rect fill={color} x='7' y='22' width='10' height='1' />
      <rect fill={color} x='7' y='27' width='10' height='1' />
      <polygon
        fill={color}
        points='25 26.707 21.646 23.354 22.354 22.646 25 25.293 31.646 18.646 32.354 19.354 25 26.707'
      />
    </svg>
  )
}

export default ProjectManagerIcon
