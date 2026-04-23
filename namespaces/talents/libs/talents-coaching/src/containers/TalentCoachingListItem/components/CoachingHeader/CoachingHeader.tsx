import React, { ReactNode } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { TalentAvatar } from '@staff-portal/talents'

import { TalentCoachingEngagementFragment } from '../../../../data/talent-coaching-engagement-fragment'
import Flags from '../Flags'
import * as S from './styles'

interface Props {
  talent: TalentCoachingEngagementFragment['talent']
  actions?: ReactNode
}

export const CoachingHeader = ({ talent, actions }: Props) => {
  const {
    fullName,
    locationV2,
    photo,
    talentType,
    timeZone,
    webResource: { url }
  } = talent

  const talentPartnerName = talent.talentPartner?.webResource?.text
  const talentPartnerUrl = talent.talentPartner?.webResource?.url

  return (
    <>
      {actions && (
        <Container flex justifyContent='flex-end' bottom='small'>
          {actions}
        </Container>
      )}
      <Container flex bottom='small'>
        <TalentAvatar
          fullName={fullName}
          photo={photo?.small}
          talentPartnerName={talentPartnerName}
          talentPartnerUrl={talentPartnerUrl}
          avatarSize='small'
          badgeSize='large'
          right='small'
          data-testid='avatar'
        />
        <Container css={S.fullWidthContainer}>
          <Container flex>
            <LinkWrapper
              wrapWhen={Boolean(url)}
              noUnderline
              href={url ?? undefined}
              data-testid='talent-link'
              css={S.titleName}
            >
              <Container>
                <Typography css={S.text} color='black' weight='semibold'>
                  {fullName}
                </Typography>
              </Container>
            </LinkWrapper>
            <Container flex css={S.flags}>
              <Flags talent={talent} />
            </Container>
          </Container>
          <Typography css={S.text} variant='body' size='medium'>
            {talentType}
            {locationV2?.countryName && ` • ${locationV2.countryName}`}
          </Typography>
          <Typography variant='body' size='medium'>
            {timeZone?.name}
          </Typography>
        </Container>
      </Container>
    </>
  )
}

export default CoachingHeader
