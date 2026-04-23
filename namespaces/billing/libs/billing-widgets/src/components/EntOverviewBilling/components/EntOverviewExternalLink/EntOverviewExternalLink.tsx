import { Tooltip, Typography } from '@toptal/picasso'
import { Link as PicassoLink } from '@topkit/react-router'
import React, { FC, memo } from 'react'
import { Link } from '@staff-portal/graphql/staff'

import * as S from './styles'

const displayName = 'EntOverviewExternalLink'

export interface Props {
  webResource?: Link
}

export const EntOverviewExternalLink: FC<Props> = memo(({ webResource }) => {
  if (!webResource?.url) {
    return null
  }

  return (
    <Tooltip content={webResource.text} interactive placement='right'>
      <Typography css={S.truncatedTypography}>
        <PicassoLink
          data-testid={`${displayName}-link`}
          noUnderline
          href={webResource.url}
          target='_blank'
        >
          {webResource.text}
        </PicassoLink>
      </Typography>
    </Tooltip>
  )
})

EntOverviewExternalLink.displayName = displayName

export default EntOverviewExternalLink
