import React from 'react'
import {
  Dropdown,
  Menu,
  NewCandidate16,
  Button,
  Tooltip
} from '@toptal/picasso'
import { SpecialistAssignmentStatuses } from '@staff-portal/graphql/staff'
import {
  Talent,
  useGetScreeningSpecialists
} from '@staff-portal/talents-screening-specialists'

import * as S from './styles'
import BulkAssignDropdownAssignAction from '../BulkAssignDropdownAssignAction'
import BulkAssignDropdownUnassignAction from '../BulkAssignDropdownUnassignAction'
export interface Props {
  selectedTalentList: Talent[]
}

const BulkAssignDropdown = ({ selectedTalentList }: Props) => {
  const { screeningSpecialists } = useGetScreeningSpecialists()
  const assignments = selectedTalentList
    .map(talent => talent.currentSpecialistAssignment)
    .filter(
      assignment => assignment?.status !== SpecialistAssignmentStatuses.ARCHIVED
    )

  if (!screeningSpecialists?.length) {
    return null
  }
  if (!assignments.length) {
    return (
      <Tooltip
        content='Please select talent to assign, reassign, or unassign to a team member.'
        placement='bottom'
      >
        <span>
          <Button size='small' icon={<NewCandidate16 />} disabled>
            Assign
          </Button>
        </span>
      </Tooltip>
    )
  }

  return (
    <Dropdown
      disableAutoClose
      css={S.dropdown}
      data-testid='bulk-assign-dropdown'
      content={
        <Menu data-testid='item-actions-menu'>
          <BulkAssignDropdownUnassignAction
            selectedTalentList={selectedTalentList}
          />
          {screeningSpecialists.map(specialist => (
            <BulkAssignDropdownAssignAction
              key={specialist.id}
              specialist={specialist}
              selectedTalentList={selectedTalentList}
            />
          ))}
        </Menu>
      }
    >
      <Button
        data-testid='open-assign-dropdown'
        size='small'
        icon={<NewCandidate16 />}
      >
        Assign
      </Button>
    </Dropdown>
  )
}

export default BulkAssignDropdown
