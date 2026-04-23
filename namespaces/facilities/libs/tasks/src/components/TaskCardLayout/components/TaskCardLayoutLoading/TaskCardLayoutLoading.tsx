import {
  Container,
  ContainerProps,
  Grid,
  SkeletonLoader
} from '@toptal/picasso'
import React, { Fragment } from 'react'

import * as S from './styles'

export type TaskCardLayoutLoadingProps = Omit<ContainerProps, 'children'>

const TABLE_ROWS = 7
const TABLE_ROW_ITEMS = [...Array(TABLE_ROWS)]

const TaskCardLayoutLoading = (props: TaskCardLayoutLoadingProps) => {
  return (
    <Container {...props}>
      <Container flex bottom='medium'>
        <Container right='small'>
          <SkeletonLoader.Button />
        </Container>

        <Container right='small'>
          <SkeletonLoader.Header />
          <SkeletonLoader.Typography />
        </Container>

        <Container flex>
          <SkeletonLoader.Button />
        </Container>
      </Container>

      <Container bottom='medium'>
        <Grid spacing={64} alignItems='center'>
          <Grid.Item small={3}>
            <Container css={S.summaryBlockHeader}>
              <SkeletonLoader.Typography />
            </Container>
            <SkeletonLoader.Typography />
          </Grid.Item>

          <Grid.Item small={3}>
            <Container css={S.summaryBlockHeader}>
              <SkeletonLoader.Typography />
            </Container>
            <SkeletonLoader.Typography />
          </Grid.Item>

          <Grid.Item small={3}>
            <Container css={S.summaryBlockHeader}>
              <SkeletonLoader.Typography />
            </Container>
            <SkeletonLoader.Typography />
          </Grid.Item>

          <Grid.Item small={3}>
            <Container css={S.summaryBlockHeader}>
              <SkeletonLoader.Typography />
            </Container>
            <SkeletonLoader.Typography />
          </Grid.Item>
        </Grid>
      </Container>

      <Container bottom='medium'>
        <Grid spacing={64} alignItems='center' css={S.gridContainer}>
          {TABLE_ROW_ITEMS.map((_, index) => (
            // TODO: replaced by a reusable Component
            // Skeleton loader, no unique id
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              <Grid.Item small={2} css={S.rowItem}>
                <SkeletonLoader.Typography />
              </Grid.Item>
              <Grid.Item small={4} css={S.rowItem}>
                <SkeletonLoader.Typography />
              </Grid.Item>
              <Grid.Item small={2} css={S.rowItem}>
                <SkeletonLoader.Typography />
              </Grid.Item>
              <Grid.Item small={4} css={S.rowItem}>
                <SkeletonLoader.Typography />
              </Grid.Item>
            </Fragment>
          ))}
        </Grid>
      </Container>
    </Container>
  )
}

export default TaskCardLayoutLoading
