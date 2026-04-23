import React from 'react'
import { Menu } from '@toptal/picasso'

interface Props {
  show: boolean
  onClick: () => void
  disabled: boolean
  label: string
}

const CallMenuItem = ({ show, onClick, disabled, label }: Props) => {
  if (!show) {
    return null
  }

  return (
    <>
      <Menu.Item
        data-testid='call-menu-item'
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </Menu.Item>
    </>
  )
}

export default CallMenuItem
