import React from 'react'
import { Grid, SkeletonLoader } from '@toptal/picasso'
import { ItemFieldSkeletonLoader } from '@staff-portal/talents'

import * as S from './styles'

const ResizableSkeletonLoader = ({ width }: { width: number }) => (
  <SkeletonLoader.Typography css={S.width(width)} />
)

const WorkloadTabSkeletonLoader = () => (
  <>
    <ItemFieldSkeletonLoader labelWidth={50} valueWidth={55} />
    <ItemFieldSkeletonLoader labelWidth={70} valueWidth={20} />
    <ItemFieldSkeletonLoader labelWidth={50} valueWidth={90} />
    <ItemFieldSkeletonLoader labelWidth={95} valueWidth={12} />
    <ItemFieldSkeletonLoader labelWidth={60}>
      <Grid>
        <Grid.Item small={3}>
          <ResizableSkeletonLoader width={65} />
        </Grid.Item>
        <Grid.Item small={3}>
          <ResizableSkeletonLoader width={45} />
        </Grid.Item>
        <Grid.Item small={6}>
          <ResizableSkeletonLoader width={30} />
        </Grid.Item>
      </Grid>
      {[...Array(4)].map((_, index) => (
        // Skeleton loader, no unique id
        // eslint-disable-next-line react/no-array-index-key
        <Grid key={index}>
          <Grid.Item small={3}>
            <ResizableSkeletonLoader width={50} />
          </Grid.Item>
          <Grid.Item small={3}>
            <ResizableSkeletonLoader width={35} />
          </Grid.Item>
          <Grid.Item small={6}>
            <ResizableSkeletonLoader width={80} />
          </Grid.Item>
        </Grid>
      ))}
    </ItemFieldSkeletonLoader>
  </>
)

export default WorkloadTabSkeletonLoader
