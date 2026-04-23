import React from 'react'
import { ArrowLongRight16, Button, Container, Section } from '@toptal/picasso'
import {
  DetailedList,
  LinkWrapper,
  TypographyOverflowLink
} from '@staff-portal/ui'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { isOperationEnabled } from '@staff-portal/operations'
import { getEditPermissionsPath } from '@staff-portal/routes'

import { TeamInformationFragment } from '../../data/get-team-info/get-team-info.staff.gql.types'

type Props = Omit<TeamInformationFragment, 'name'>

const TeamInformationSection = ({
  manager,
  roles,
  ability,
  emailTracking,
  coreTeam,
  escalationPath
}: Props) => {
  const escalationPathLength = escalationPath && escalationPath.nodes.length - 1
  const editPermissionsUrl =
    ability && getEditPermissionsPath(decodeEntityId(ability.id).id)

  return (
    <Section
      title='Team Info'
      variant='withHeaderBar'
      //TODO: https://toptal-core.atlassian.net/browse/SPT-2677
      actions={
        <Button size='small' variant='primary'>
          Edit
        </Button>
      }
    >
      <DetailedList labelColumnWidth={10}>
        <DetailedList.Row>
          <DetailedList.Item label='Team Lead'>
            <LinkWrapper
              wrapWhen={Boolean(manager?.role?.webResource.url)}
              href={manager?.role?.webResource.url as string}
            >
              {manager?.role?.fullName}
            </LinkWrapper>
          </DetailedList.Item>
          <DetailedList.Item label='Position'>
            {manager?.name}
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Core Team'>
            {coreTeam ? 'Yes' : 'No'}
          </DetailedList.Item>
          <DetailedList.Item label='Number of Members'>
            {roles?.totalCount}
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Default Permission'>
            <TypographyOverflowLink tooltipContent={ability?.name}>
              <LinkWrapper
                wrapWhen={isOperationEnabled(ability?.operations?.editAbility)}
                href={editPermissionsUrl as string}
              >
                {ability?.name}
              </LinkWrapper>
            </TypographyOverflowLink>
          </DetailedList.Item>
          <DetailedList.Item label='Email Tracking'>
            {emailTracking ? 'Yes' : 'No'}
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Escalation Path'>
            <Container flex alignItems='center'>
              {escalationPath?.nodes.map(({ role, id }, index) => {
                const isLast = index === escalationPathLength

                return (
                  <Container key={id} flex alignItems='center'>
                    <LinkWrapper
                      wrapWhen={Boolean(role?.webResource.url)}
                      href={role?.webResource.url as string}
                    >
                      {role?.webResource.text}
                    </LinkWrapper>
                    {!isLast && <ArrowLongRight16 />}
                  </Container>
                )
              })}
            </Container>
          </DetailedList.Item>
        </DetailedList.Row>
      </DetailedList>
    </Section>
  )
}

export default TeamInformationSection
