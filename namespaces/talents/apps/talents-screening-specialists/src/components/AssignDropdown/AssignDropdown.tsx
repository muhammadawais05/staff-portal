import React from 'react'
import { Dropdown, Menu, Button, Pencil16 } from '@toptal/picasso'
import { isOperationEnabled } from '@staff-portal/operations'
import {
  Talent,
  useGetScreeningSpecialists
} from '@staff-portal/talents-screening-specialists'

import AssignDropdownAssignAction from '../AssignDropdownAssignAction'
import AssignDropdownUnassignAction from '../AssignDropdownUnassignAction'
import * as S from './styles'

export interface Props {
  talent: Talent
}

const AssignDropdown = ({ talent }: Props) => {
  const operations = talent.operations
  const currentSpecialistAssignment = talent.currentSpecialistAssignment
  const { screeningSpecialists } = useGetScreeningSpecialists()

  if (
    !screeningSpecialists?.length ||
    !isOperationEnabled(operations.assignScreeningSpecialistToTalent)
  ) {
    return null
  }

  return (
    <Dropdown
      disableAutoClose
      css={S.dropdown}
      content={
        <Menu data-testid='item-actions-menu'>
          <AssignDropdownUnassignAction
            key='unassign-menu-item'
            specialistAssignment={currentSpecialistAssignment}
          />
          {screeningSpecialists.map(specialist => (
            <AssignDropdownAssignAction
              key={specialist.id}
              talent={talent}
              specialist={specialist}
            />
          ))}
        </Menu>
      }
    >
      <Button.Circular
        data-testid='open-assign-dropdown'
        variant='transparent'
        icon={<Pencil16 />}
        aria-label='Assign Specialist'
        css={S.button}
      />
    </Dropdown>
  )
}

export default AssignDropdown
