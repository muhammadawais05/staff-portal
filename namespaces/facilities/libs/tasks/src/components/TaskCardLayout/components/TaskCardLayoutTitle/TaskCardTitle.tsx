import React, { ReactNode } from 'react'
import { Typography, UserBadge, TypographyOverflow } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'

import * as S from './styles'

export interface TaskCardLayoutTitleProps {
  children: ReactNode
  title: string
  link?: string | null
  icon: ReactNode
}

const TaskCardLayoutTitle = ({
  children,
  title,
  link,
  icon
}: TaskCardLayoutTitleProps) => {
  return (
    <UserBadge
      center
      name={title}
      avatar={icon}
      renderName={name => (
        <LinkWrapper
          target='_blank'
          wrapWhen={Boolean(link)}
          href={link as string}
          css={S.link}
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
    >
      <Typography size='xsmall'>{children}</Typography>
    </UserBadge>
  )
}

export default TaskCardLayoutTitle
