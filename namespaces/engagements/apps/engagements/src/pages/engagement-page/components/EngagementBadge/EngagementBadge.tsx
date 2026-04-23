import React, { ReactNode } from 'react'
import { Container, UserBadge, TypographyOverflow } from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'
import { LinkWrapper } from '@staff-portal/ui'

export interface Props {
  photo?: Maybe<{ default?: Maybe<string> }>
  fullName: string
  profileLink?: Maybe<{ url?: Maybe<string>; newTab?: boolean }>
  defaultAvatar: ReactNode
  'data-testid'?: string
}

const EngagementBadge = ({
  photo,
  fullName,
  profileLink,
  defaultAvatar,
  'data-testid': dataTestId
}: Props) => {
  return (
    <Container bottom='small' data-testid={dataTestId}>
      <UserBadge
        center
        name={fullName}
        avatar={photo?.default ?? defaultAvatar}
        size='small'
        renderName={name => (
          <LinkWrapper
            wrapWhen={Boolean(profileLink?.url)}
            href={profileLink?.url as string}
            target={profileLink?.newTab ? '_blank' : '_self'}
            data-testid='EngagementBadge-link'
          >
            <TypographyOverflow
              size='medium'
              weight='semibold'
              color='inherit'
              as='span'
            >
              {name}
            </TypographyOverflow>
          </LinkWrapper>
        )}
      />
    </Container>
  )
}

export default EngagementBadge
