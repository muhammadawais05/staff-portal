import React from 'react'
import {
  Section,
  SectionProps,
  Container,
  SkeletonLoader
} from '@toptal/picasso'

const JobListItemSkeletonLoader = (
  props: Omit<SectionProps, 'title' | 'actions'>
) => (
  <Section
    {...props}
    title={<SkeletonLoader.Typography />}
    actions={
      <>
        {[...Array(2)].map((__, btnIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <Container left='small' key={btnIndex}>
            <SkeletonLoader.Button size='small' />
          </Container>
        ))}
      </>
    }
    data-testid='job-list-item-skeleton-loader'
  >
    <Container>
      {[...Array(6)].map((__, containerIndex) => (
        <Container
          flex
          justifyContent='space-between'
          bottom='xsmall'
          top='small'
          // eslint-disable-next-line react/no-array-index-key
          key={containerIndex}
        >
          {[...Array(4)].map((___, btnIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <Container right='small' key={btnIndex}>
              <SkeletonLoader.Typography />
            </Container>
          ))}
        </Container>
      ))}
    </Container>
    <Container top='small'>
      <SkeletonLoader.Typography />
      <SkeletonLoader.Typography />
    </Container>
  </Section>
)

export default JobListItemSkeletonLoader
