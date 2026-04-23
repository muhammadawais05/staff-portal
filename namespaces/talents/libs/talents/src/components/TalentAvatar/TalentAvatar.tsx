import React from 'react'
import { Avatar, Container, Tooltip, SizeType } from '@toptal/picasso'
import { Props as PicassoContainerProps } from '@toptal/picasso/Container/Container'
import { Props as PicassoAvatarProps } from '@toptal/picasso/Avatar/Avatar'
import { LinkWrapper } from '@staff-portal/ui'

import * as S from './styles'

export interface Props extends Omit<PicassoContainerProps, 'children'> {
  fullName: string
  photo?: string | null
  talentPartnerName?: string | null
  talentPartnerUrl?: string | null
  badgeSize?: SizeType<'small' | 'large'>
  avatarSize?: PicassoAvatarProps['size']
}

const badgeSizes = {
  small: S.smallSize,
  large: S.largeSize
}

export const TalentAvatar = ({
  fullName,
  photo,
  talentPartnerName,
  talentPartnerUrl,
  avatarSize,
  badgeSize = 'large',
  ...containerProps
}: Props) => {
  const wrapWhen = Boolean(talentPartnerUrl)
  const badgeSizeClass = badgeSizes[badgeSize]

  const badgeStyles = [
    S.talentPartnerBadge,
    badgeSizeClass,
    !wrapWhen && S.defaultCursor
  ]

  const talentPartnerBadge = talentPartnerName && (
    <Tooltip
      content={`Talent Partner: ${talentPartnerName}`}
      placement='top'
      compact
    >
      <Container css={badgeStyles} data-testid='talent-partner-badge'>
        <LinkWrapper
          color='white'
          wrapWhen={wrapWhen}
          noUnderline
          href={talentPartnerUrl as string}
          target='_blank'
          rel='noopener'
        >
          P
        </LinkWrapper>
      </Container>
    </Tooltip>
  )

  return (
    <Container css={S.avatarContainer} {...containerProps}>
      <Avatar name={fullName} src={photo as string} size={avatarSize} />
      {talentPartnerBadge}
    </Container>
  )
}

export default TalentAvatar
