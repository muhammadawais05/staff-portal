import React from 'react'
import { Section } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { DetailedList } from '@staff-portal/ui'
import { decodeEntityId } from '@staff-portal/data-layer-service'

import { TeamListItemFragment } from '../../data/get-teams-list/get-teams-list.staff.gql.types'

type Props = {
  team: TeamListItemFragment
}

const TeamListItem = ({ team }: Props) => {
  const decodedTeamId = decodeEntityId(team.id).id
  const teamMembersLength = team.roles.nodes.length - 1

  const { name, manager, coreTeam, roles } = team

  return (
    <Section
      // TODO: Use teams.webResource.url once https://toptal-core.atlassian.net/browse/GOLD-2983 is done
      title={<Link href={`teams/${decodedTeamId}`}>{name}</Link>}
      variant='withHeaderBar'
    >
      <DetailedList>
        <DetailedList.Row>
          <DetailedList.Item label='Team Lead'>
            <Link href={manager?.role?.webResource.url as string}>
              {manager?.role?.fullName}
            </Link>
          </DetailedList.Item>

          <DetailedList.Item label='Core Team'>
            {coreTeam ? 'Yes' : 'No'}
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Members'>
            {roles.nodes.map(
              ({ id, fullName, webResource: { url } }, index) => {
                const isLast = index === teamMembersLength

                return (
                  <span key={id}>
                    <Link href={url as string}>{fullName}</Link>
                    {!isLast && `, `}
                  </span>
                )
              }
            )}
          </DetailedList.Item>
        </DetailedList.Row>
      </DetailedList>
    </Section>
  )
}

export default TeamListItem
