import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { TalentAvatar } from '@staff-portal/talents'
import { Talent } from '@staff-portal/talents-screening-specialists'

import RoleFlagGroup from '../RoleFlagGroup'

export interface Props {
  talent: Talent
}

const NameCellContent = ({ talent }: Props) => {
  const {
    fullName,
    photo,
    roleFlags,
    webResource: { url: talentProfileUrl },
    talentPartner
  } = talent

  const talentPartnerName = talentPartner?.webResource?.text
  const talentPartnerUrl = talentPartner?.webResource?.url

  return (
    <Container flex alignItems='center'>
      <TalentAvatar
        fullName={fullName}
        photo={photo?.thumb as string}
        talentPartnerName={talentPartnerName}
        talentPartnerUrl={talentPartnerUrl}
        badgeSize='small'
        right='small'
      />
      <Container>
        <LinkWrapper
          target='_blank'
          wrapWhen={Boolean(talentProfileUrl)}
          href={talentProfileUrl as string}
        >
          <Typography color='inherit' size='medium' weight='semibold'>
            {fullName}
          </Typography>
        </LinkWrapper>
        <RoleFlagGroup roleFlags={roleFlags?.nodes} />
      </Container>
    </Container>
  )
}

export default NameCellContent
