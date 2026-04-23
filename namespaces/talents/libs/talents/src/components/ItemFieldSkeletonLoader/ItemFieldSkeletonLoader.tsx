import React, { ReactNode } from 'react'
import { Container, Grid, SkeletonLoader } from '@toptal/picasso'

import * as S from './styles'

const ItemFieldSkeletonLoaderStack = () => {
  return (
    <Grid>
      <Grid.Item small={12}>
        <SkeletonLoader.Header />
        <Container top='xsmall'>
          <SkeletonLoader.Typography />
        </Container>
      </Grid.Item>
    </Grid>
  )
}

interface ItemFieldSkeletonLoaderRowProps {
  layout?: 'half-row' | 'full-row'
  labelWidth: number
  valueWidth?: number
  children?: ReactNode
}

const ItemFieldSkeletonLoaderRow = ({
  layout = 'full-row',
  labelWidth,
  valueWidth,
  children
}: ItemFieldSkeletonLoaderRowProps) => {
  const isFullRow = layout === 'full-row'

  return (
    <Grid>
      <div css={S.getLabelContainerStyle(isFullRow)}>
        <SkeletonLoader.Typography css={S.typographyWidth(labelWidth)} />
      </div>
      <div css={S.getValueContainerStyle(isFullRow)}>
        {valueWidth ? (
          <SkeletonLoader.Typography css={S.typographyWidth(valueWidth)} />
        ) : (
          children
        )}
      </div>
    </Grid>
  )
}

interface Props {
  layout?: 'half-row' | 'full-row' | 'stack'
  labelWidth: number
  valueWidth?: number
  children?: ReactNode
}

const ItemFieldSkeletonLoader = ({
  layout = 'full-row',
  labelWidth,
  valueWidth,
  children
}: Props) => {
  if (layout === 'stack') {
    return <ItemFieldSkeletonLoaderStack />
  }

  return (
    <ItemFieldSkeletonLoaderRow
      labelWidth={labelWidth}
      valueWidth={valueWidth}
      layout={layout}
    >
      {children}
    </ItemFieldSkeletonLoaderRow>
  )
}

export default ItemFieldSkeletonLoader
