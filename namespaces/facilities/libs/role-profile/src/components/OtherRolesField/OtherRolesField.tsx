import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { getTalentProfilePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { getRoleTypeText } from '@staff-portal/facilities'

import { OtherRoleFragment } from '../../data/other-role-fragment'

const getCompanyRepresentativeClientFullName = (
  otherRole: OtherRoleFragment
) => {
  if ('client' in otherRole) {
    return otherRole.client ? `${otherRole.client.fullName} - ` : ''
  }

  return ''
}

const getHref = (otherRole: OtherRoleFragment) =>
  otherRole.__typename === 'Talent'
    ? getTalentProfilePath(decodeEntityId(otherRole.id).id)
    : otherRole.webResource.url || ''

const getCumulativeStatusText = (otherRole: OtherRoleFragment) =>
  (
    ('cumulativeStatus' in otherRole && otherRole.cumulativeStatus) ||
    ('talentCumulativeStatus' in otherRole &&
      otherRole.talentCumulativeStatus) ||
    ('companyRepresentativeCumulativeStatus' in otherRole &&
      otherRole.companyRepresentativeCumulativeStatus) ||
    ''
  ).toLowerCase()

export interface Props {
  otherRoles?: OtherRoleFragment[] | null
}

const OtherRolesField = ({ otherRoles }: Props) => {
  if (!otherRoles || otherRoles.length === 0) {
    return null
  }

  return (
    <Container data-testid='other-roles-field'>
      {otherRoles.map(otherRole => (
        <Typography as='div' key={otherRole.id} weight='semibold' size='medium'>
          <Link href={getHref(otherRole)}>
            {getCompanyRepresentativeClientFullName(otherRole)}
            {getRoleTypeText(otherRole.type)} (
            {getCumulativeStatusText(otherRole)})
          </Link>
        </Typography>
      ))}
    </Container>
  )
}

export default OtherRolesField
