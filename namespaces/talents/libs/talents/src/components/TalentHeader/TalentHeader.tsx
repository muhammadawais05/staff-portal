import React, { ReactNode } from 'react'
import { Container, Tag } from '@toptal/picasso'
import { LinkWrapper, TypographyOverflowLink } from '@staff-portal/ui'

import TalentAvatar from '../TalentAvatar/TalentAvatar'
import * as S from './styles'

interface Props {
  fullName: string
  actions?: ReactNode
  photo?: string | null
  flags?: ReactNode
  url?: string | null
  talentPartnerName?: string | null
  talentPartnerUrl?: string | null
  withNameLink?: boolean
}

export const TalentHeader = ({
  actions,
  flags,
  photo,
  fullName,
  url,
  talentPartnerName,
  talentPartnerUrl,
  withNameLink = false
}: Props) => {
  return (
    <Container>
      {(withNameLink || actions) && (
        <Container flex bottom='small' justifyContent='space-between'>
          {withNameLink && (
            <TypographyOverflowLink weight='semibold'>
              <LinkWrapper
                wrapWhen={Boolean(url)}
                href={url as string}
                data-testid='talent-link'
              >
                {fullName}
              </LinkWrapper>
            </TypographyOverflowLink>
          )}

          {actions && (
            <Container flex left='xsmall'>
              {actions}
            </Container>
          )}
        </Container>
      )}
      <Container flex alignItems='center'>
        <TalentAvatar
          fullName={fullName}
          photo={photo}
          talentPartnerName={talentPartnerName}
          talentPartnerUrl={talentPartnerUrl}
          avatarSize='small'
          badgeSize='large'
          right='small'
        />
        {flags && (
          <Container data-testid='container-flex-flags' css={S.flagsContainer}>
            <Tag.Group>{flags}</Tag.Group>
          </Container>
        )}
      </Container>
    </Container>
  )
}

export default TalentHeader
