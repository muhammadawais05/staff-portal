import React from 'react'
import { Menu, Dropdown } from '@toptal/picasso'

export interface Props {
  title: string
  onClick: () => void
}

const AssignDropdownItem = ({ title, onClick }: Props) => {
  const { close: closeDropdown } = Dropdown.useContext()

  const handleClick = () => {
    onClick()
    closeDropdown()
  }

  return <Menu.Item onClick={handleClick}>{title}</Menu.Item>
}

export default AssignDropdownItem
