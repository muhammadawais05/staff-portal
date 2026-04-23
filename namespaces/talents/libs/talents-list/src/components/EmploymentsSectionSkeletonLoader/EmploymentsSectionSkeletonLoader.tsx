import React from 'react'
import { Timeline, Container, List, SkeletonLoader } from '@toptal/picasso'

import * as S from '../../containers/EmploymentsSection/styles'

const EmploymentsSectionSkeletonLoader = () => (
  <Container css={S.container}>
    {Array.from({ length: 3 }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Timeline key={index}>
        <Timeline.Row>
          <Container bottom='small'>
            <Container bottom='xsmall'>
              <SkeletonLoader.Header />
              <SkeletonLoader.Typography />
            </Container>
            <List variant='unordered'>
              <List.Item>
                <SkeletonLoader.Typography />
              </List.Item>
              <List.Item>
                <SkeletonLoader.Typography />
              </List.Item>
              <List.Item>
                <SkeletonLoader.Typography />
              </List.Item>
            </List>
            <Container top='xsmall'>
              <SkeletonLoader.Typography />
            </Container>
          </Container>
        </Timeline.Row>
      </Timeline>
    ))}
  </Container>
)

export default EmploymentsSectionSkeletonLoader
