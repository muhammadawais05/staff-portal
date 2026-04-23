import React from 'react'
import { Container, Typography } from '@toptal/picasso'

import TeamMemberStaffUserBadge from '../TeamMemberStaffUserBadge'
import {
  TreeNodeWithInfo,
  isPerson,
  StaffMemberProperties
} from '../StaffTreeModal'
import * as S from './styles'
import { OperationalIssuesStaffTreeTeamNodeFragment } from '../StaffTreeModal/data/get-operational-issues-staff-tree'
import StaffUserBadgeWrapper from '../StaffUserBadgeWrapper'

export interface Props {
  data: TreeNodeWithInfo
  onMemberClick: (
    edge: OperationalIssuesStaffTreeTeamNodeFragment['members']['edges'][0],
    edgeIndex: number
  ) => void
}

const getStaffMemberProperties = (
  teamMemberIndex: number,
  properties: StaffMemberProperties[] = []
) => {
  let resultMemberProperties: Omit<StaffMemberProperties, 'index'> = {
    highlighted: false,
    selected: false,
    loading: false,
    disabled: false
  }

  properties.forEach(memberProperty => {
    if (memberProperty.index === teamMemberIndex) {
      resultMemberProperties = memberProperty
    }
  })

  return resultMemberProperties
}

const StaffTreeTeamNode = ({
  data,
  onMemberClick
}: Props) => {
  if (isPerson(data.info)) {
    throw new Error('Staff tree team node expects team data to be provided')
  }

  const team = data.info

  return (
    <Container padded='small' bordered css={S.container}>
      <Container>
        <Typography
          align='center'
          variant='heading'
          size='small'
          weight='regular'
        >
          {team.name}
        </Typography>
      </Container>
      <Container top='medium'>
        {team.members.edges.map((edge, index) => {
          const {
            node: { id, fullName, photo },
            issuesCount
          } = edge
          const teamSpecificKey = `${team.index}-${id}`
          const { highlighted, selected, loading, disabled } =
            getStaffMemberProperties(index, data.memberProperties)

          return (
            <Container key={teamSpecificKey} top='small'>
              <StaffUserBadgeWrapper
                isTeamMember
                selected={selected}
                highlighted={highlighted}
                disabled={disabled}
                loading={loading}
                onClick={
                  !disabled ? () => onMemberClick(edge, index) : undefined
                }
              >
                <TeamMemberStaffUserBadge
                  name={fullName}
                  issuesCount={issuesCount}
                  avatar={photo?.thumb}
                />
              </StaffUserBadgeWrapper>
            </Container>
          )
        })}
      </Container>
    </Container>
  )
}

export default StaffTreeTeamNode
