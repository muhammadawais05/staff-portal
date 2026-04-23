import React from 'react'
import { Section, Container, SkeletonLoader } from '@toptal/picasso'

type Props = {
  title?: string
}

const TextSectionSkeleton = ({ title }: Props) => (
  <Container data-testid='text-section-skeleton' top='medium'>
    <Section title={title} variant='withHeaderBar'>
      <SkeletonLoader.Header />
    </Section>
  </Container>
)

export default TextSectionSkeleton
