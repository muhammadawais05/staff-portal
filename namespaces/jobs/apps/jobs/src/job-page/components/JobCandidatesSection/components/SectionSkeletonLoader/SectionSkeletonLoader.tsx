import React from 'react'
import { Container } from '@toptal/picasso'
import Section, { SectionProps } from '@toptal/picasso/Section'
import { TableSkeleton } from '@staff-portal/ui'

interface Props {
  title: string
  sectionVariant?: SectionProps['variant']
}

const SectionSkeletonLoader = ({
  title,
  sectionVariant = 'bordered'
}: Props) => {
  return (
    <Container top='large'>
      <Section title={title} variant={sectionVariant}>
        <TableSkeleton
          dataTestId='JobCandidatesSection-table-skeleton'
          rows={3}
          cols={1}
        />
      </Section>
    </Container>
  )
}

export default SectionSkeletonLoader
