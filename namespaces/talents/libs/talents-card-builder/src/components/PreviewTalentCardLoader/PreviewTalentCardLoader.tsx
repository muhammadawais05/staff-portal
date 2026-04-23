import { Container, Section, SkeletonLoader } from '@toptal/picasso'
import React from 'react'

const PreviewTalentCardLoader = () => (
  <>
    <Container flex alignItems='center'>
      <SkeletonLoader.Media variant='avatar' size='small' />
      <Container left='small'>
        <SkeletonLoader.Header />
        <SkeletonLoader.Header />
      </Container>
    </Container>

    <Section title='Skills'>
      <Container as='span'>
        <SkeletonLoader.Button size='small' />
      </Container>

      <Container as='span' left='xsmall'>
        <SkeletonLoader.Button size='small' />
      </Container>
    </Section>

    <Section title='Highlights'>
      <SkeletonLoader.Header />
      <SkeletonLoader.Typography rows={4} />
    </Section>
  </>
)

export default PreviewTalentCardLoader
