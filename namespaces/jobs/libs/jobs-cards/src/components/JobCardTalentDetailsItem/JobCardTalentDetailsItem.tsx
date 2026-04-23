import React, { ReactNode } from 'react'
import { Grid, TypographyOverflow } from '@toptal/picasso'

import * as S from './styles'

interface Props {
  leftContent: string
  rightContent: ReactNode
}

const JobCardTalentDetailsItem = ({ leftContent, rightContent }: Props) => {
  return (
    <Grid spacing={8}>
      <Grid.Item small={6}>
        <TypographyOverflow size='inherit'>{leftContent}</TypographyOverflow>
      </Grid.Item>
      <Grid.Item small={6}>
        <TypographyOverflow
          size='inherit'
          weight='semibold'
          css={S.rightContent}
          noWrap
        >
          {rightContent}
        </TypographyOverflow>
      </Grid.Item>
    </Grid>
  )
}

export default JobCardTalentDetailsItem
