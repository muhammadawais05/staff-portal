import React, { memo } from 'react'
import { Checkbox, Table, Tag, Typography } from '@toptal/picasso'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { NO_VALUE } from '@staff-portal/config'

import { BetaStaffMemberFragment } from '../../../../pages/BetaStaffMembers/data/get-beta-staff-member-list'
import * as S from './styles'

const getColoredText = (flag?: boolean | null) => {
  if (flag === null) {
    return NO_VALUE
  }

  return flag ? (
    <Typography color='green'>Yes</Typography>
  ) : (
    <Typography color='red'>No</Typography>
  )
}

type Props = {
  staffMember: BetaStaffMemberFragment
  stripeEven?: boolean
  isSelected?: boolean
  onSelectMember: (id: string) => void
  onDeselectMember: (id: string) => void
}

const BetaStaffMemberListItem = ({
  staffMember,
  stripeEven,
  isSelected = false,
  onSelectMember,
  onDeselectMember
}: Props) => {
  const formatDate = useUserDateFormatter()

  const {
    fullName,
    teams,
    lastVisitedDate,
    staffPortalBetaEnabled,
    id,
    staffPortalEarlyAdopter
  } = staffMember

  return (
    <Table.Row stripeEven={stripeEven}>
      <Table.Cell css={S.checkboxCol}>
        <Checkbox
          checked={isSelected}
          onChange={e =>
            e.target.checked ? onSelectMember(id) : onDeselectMember(id)
          }
        />
      </Table.Cell>
      <Table.Cell css={S.nameColumn}>{fullName}</Table.Cell>
      <Table.Cell css={S.lastVisitColumn}>
        {formatDate(lastVisitedDate)}
      </Table.Cell>
      <Table.Cell css={S.teamsColumn}>
        <Tag.Group>
          {teams?.nodes.map(team => (
            <Tag key={team.id}>{team.name}</Tag>
          ))}
        </Tag.Group>
      </Table.Cell>
      <Table.Cell css={S.betaEnabledColumn}>
        {getColoredText(staffPortalBetaEnabled)}
      </Table.Cell>
      <Table.Cell css={S.earlyAdoptersColumn}>
        {getColoredText(staffPortalEarlyAdopter)}
      </Table.Cell>
    </Table.Row>
  )
}

export default memo(BetaStaffMemberListItem)
