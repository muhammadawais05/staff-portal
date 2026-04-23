import React from 'react'
import { palette } from '@toptal/picasso/utils'
import { TaskIconProps, TASK_ICON_BASE_SIZE } from '@staff-portal/tasks'

const FinanceExpertIcon = ({
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
      <path
        fill={color}
        d='M10.5,21A10.5,10.5,0,1,1,21,10.5,10.512,10.512,0,0,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.51081,9.51081,0,0,0,10.5,1Z'
      />
      <path fill={color} d='M11,40H0V33H11ZM1,39h9V34H1Z' />
      <path fill={color} d='M39,40H28V0H39ZM29,39h9V1H29Z' />
      <path fill={color} d='M25,40H14V26H25ZM15,39h9V27H15Z' />
      <polygon fill={color} points='20 11 10 11 10 1 11 1 11 10 20 10 20 11' />
    </svg>
  )
}

export default FinanceExpertIcon
