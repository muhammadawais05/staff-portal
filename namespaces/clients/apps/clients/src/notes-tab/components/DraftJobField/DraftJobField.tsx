import React, { ReactNode } from 'react'
import { Grid, Typography, TypographyProps, GridSize } from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'

import * as S from './styles'

interface Props {
  label?: Maybe<ReactNode>
  labelCols: GridSize
  children?: Maybe<ReactNode>
  childrenWeight?: TypographyProps['weight']
  noContent?: string
}

const DraftJobField = ({
  label,
  labelCols,
  children,
  childrenWeight = 'regular',
  noContent = NO_VALUE
}: Props) => {
  const TOTAL_COLS = 12
  const contentCols =
    labelCols !== 'auto' ? ((TOTAL_COLS - labelCols) as GridSize) : 'auto'

  return (
    <Grid
      direction='row'
      spacing={0}
      justifyContent='space-between'
      alignItems='baseline'
    >
      {Boolean(label) && <Grid.Item small={labelCols}>{label}</Grid.Item>}

      <Grid.Item small={contentCols} css={S.fieldValue}>
        <Typography as='span' weight={childrenWeight}>
          {children || noContent}
        </Typography>
      </Grid.Item>
    </Grid>
  )
}

export default DraftJobField
