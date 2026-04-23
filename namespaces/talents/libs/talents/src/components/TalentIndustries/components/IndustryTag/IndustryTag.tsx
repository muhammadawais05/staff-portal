import React, { memo } from 'react'
import {
  Container,
  Link16,
  Tag,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'

import * as S from './styles'

export interface Props {
  industryName: string
  connectionsCount: number
}

const IndustryTag = ({ industryName, connectionsCount }: Props) => (
  <Tag css={S.industryTag} data-testid='industry-tag'>
    <Container as='span' flex alignItems='center'>
      <Container inline css={S.industryName}>
        <TypographyOverflow color='inherit'>{industryName}</TypographyOverflow>
      </Container>

      {!!connectionsCount && (
        <>
          <Link16 css={S.connectionsIcon} />
          <Typography as='span' color='inherit' size='medium'>
            {connectionsCount}
          </Typography>
        </>
      )}
    </Container>
  </Tag>
)

export default memo(IndustryTag)
