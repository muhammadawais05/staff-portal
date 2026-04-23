import React from 'react'
import { Dropdown, Menu, Button, Pencil16 } from '@toptal/picasso'

import {
  useGetScreeningSpecialists,
  ScreeningSpecialistFragment
} from '../../../../data/get-screening-specialists'
import AssignDropdownItem from '../AssignDropdownItem'
import * as S from './styles'

export interface Props {
  currentSpecialist?: ScreeningSpecialistFragment | null
  onSelect: (specialist?: ScreeningSpecialistFragment) => void
}

const AssignDropdown = ({ currentSpecialist, onSelect }: Props) => {
  const { screeningSpecialists } = useGetScreeningSpecialists()

  if (!screeningSpecialists?.length) {
    return null
  }

  const specialistsWithoutCurrent = screeningSpecialists.filter(
    specialist => specialist.id !== currentSpecialist?.id
  )

  return (
    <Dropdown
      disableAutoClose
      css={S.dropdown}
      content={
        <Menu data-testid='tss-list'>
          {currentSpecialist && (
            <AssignDropdownItem title='Unassign' onClick={onSelect} />
          )}
          {specialistsWithoutCurrent.map(specialist => (
            <AssignDropdownItem
              key={specialist.id}
              title={specialist.fullName}
              onClick={() => onSelect(specialist)}
            />
          ))}
        </Menu>
      }
    >
      <Button.Circular
        data-testid='assign-dropdown-button'
        variant='flat'
        icon={<Pencil16 />}
        aria-label='Assign Specialist'
      />
    </Dropdown>
  )
}

export default AssignDropdown
