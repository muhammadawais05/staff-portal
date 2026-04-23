import React from 'react'
import { Container, Grid, SkeletonLoader } from '@toptal/picasso'
import { SubSection } from '@staff-portal/ui'
import { ItemFieldSkeletonLoader } from '@staff-portal/talents'

import { JobItemStyles } from '../JobItem'

interface Props {
  totalItems?: number
}

const JobItemSkeletonLoader = ({ totalItems = 3 }: Props) => (
  <>
    {Array.from({ length: totalItems }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <SubSection last={index === totalItems - 1} key={index}>
        <Container css={JobItemStyles.container}>
          <Container flex alignItems='center' bottom='small'>
            <Container>
              <SkeletonLoader.Header />
            </Container>
          </Container>
          <Container>
            <Grid>
              <Grid.Item small={6}>
                <ItemFieldSkeletonLoader
                  layout='half-row'
                  labelWidth={30}
                  valueWidth={80}
                />
              </Grid.Item>
              <Grid.Item small={6}>
                <ItemFieldSkeletonLoader
                  layout='half-row'
                  labelWidth={60}
                  valueWidth={60}
                />
              </Grid.Item>
            </Grid>
            <Grid>
              <Grid.Item small={6}>
                <ItemFieldSkeletonLoader
                  layout='half-row'
                  labelWidth={30}
                  valueWidth={45}
                />
              </Grid.Item>
              <Grid.Item small={6}>
                <ItemFieldSkeletonLoader
                  layout='half-row'
                  labelWidth={60}
                  valueWidth={15}
                />
              </Grid.Item>
            </Grid>
            <ItemFieldSkeletonLoader labelWidth={40} valueWidth={25} />
            <ItemFieldSkeletonLoader labelWidth={60} valueWidth={15} />
            <Grid>
              <Grid.Item small={6}>
                <ItemFieldSkeletonLoader
                  layout='half-row'
                  labelWidth={50}
                  valueWidth={45}
                />
              </Grid.Item>
              <Grid.Item small={6}>
                <ItemFieldSkeletonLoader
                  layout='half-row'
                  labelWidth={50}
                  valueWidth={45}
                />
              </Grid.Item>
            </Grid>
          </Container>
        </Container>
      </SubSection>
    ))}
  </>
)

export default JobItemSkeletonLoader
