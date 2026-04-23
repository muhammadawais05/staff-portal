import React from 'react'
import { Container, Grid, SkeletonLoader } from '@toptal/picasso'

import { ItemFieldSkeletonLoader } from '../../components'

interface Props {
  amount?: number
}

const CommunityLeaderListSkeletonLoader = ({ amount = 3 }: Props) => (
  <>
    {[...Array(amount)].map((_, index) => (
      <Container
        bottom='large'
        rounded
        padded='large'
        variant='white'
        // eslint-disable-next-line react/no-array-index-key
        key={index}
      >
        <Container flex justifyContent='space-between'>
          <Container flex alignItems='center' bottom='small'>
            <SkeletonLoader.Media variant='avatar' size='small' />
            <Container left='small'>
              <SkeletonLoader.Header />
              <Container flex top='xsmall'>
                {[...Array(2)].map((__, btnIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Container right='small' key={btnIndex}>
                    <SkeletonLoader.Button size='small' />
                  </Container>
                ))}
              </Container>
            </Container>
          </Container>
        </Container>
        <Container>
          <Grid>
            <Grid.Item small={8}>
              <Container flex bottom='xsmall' top='small'>
                {[...Array(6)].map((__, btnIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Container right='small' key={btnIndex}>
                    <SkeletonLoader.Typography />
                  </Container>
                ))}
              </Container>
            </Grid.Item>
          </Grid>
          {[...Array(6)].map((__, itemIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={itemIndex}>
              <Grid.Item small={6}>
                <ItemFieldSkeletonLoader
                  layout='half-row'
                  labelWidth={80}
                  valueWidth={60}
                />
              </Grid.Item>
              <Grid.Item small={6}>
                <ItemFieldSkeletonLoader
                  layout='half-row'
                  labelWidth={80}
                  valueWidth={60}
                />
              </Grid.Item>
            </Grid>
          ))}
          <ItemFieldSkeletonLoader labelWidth={80} valueWidth={60} />
          <ItemFieldSkeletonLoader labelWidth={80} valueWidth={70} />
          <ItemFieldSkeletonLoader labelWidth={80} valueWidth={30} />
        </Container>
      </Container>
    ))}
  </>
)

export default CommunityLeaderListSkeletonLoader
