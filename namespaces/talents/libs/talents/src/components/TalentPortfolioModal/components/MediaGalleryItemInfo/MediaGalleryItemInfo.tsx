import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { MarkdownWithHtml } from '@staff-portal/ui'

import * as S from './styles'

type Props = {
  title?: string | null
  description?: string | null
}

const MediaGalleryItemInfo = ({ description, title }: Props) => {
  if (!title && !description) {
    return null
  }

  return (
    <Container
      rounded
      variant='grey'
      padded='small'
      top='medium'
      css={S.gallery}
    >
      <Container css={S.content}>
        {title && (
          <Typography as='div' size='xsmall' color='black' weight='semibold'>
            {title}
          </Typography>
        )}
        {description && (
          <Container top='xsmall'>
            <Typography as='div' size='medium'>
              <MarkdownWithHtml allowDangerousHtml>
                {description}
              </MarkdownWithHtml>
            </Typography>
          </Container>
        )}
      </Container>
    </Container>
  )
}

export default MediaGalleryItemInfo
