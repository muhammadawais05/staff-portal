import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'
import Section, { SectionProps } from '@toptal/picasso/Section'
import { NoteCardSkeletonLoader } from '@staff-portal/ui'

type Props = {
  title: string
  sectionVariant?: SectionProps['variant']
}

const NoteTabSkeletonLoader = ({ title, sectionVariant }: Props) => {
  return (
    <Section
      title={title}
      variant={sectionVariant}
      actions={
        <Container flex>
          <Container right='xsmall'>
            <SkeletonLoader.Button size='small' />
          </Container>
          <SkeletonLoader.Button size='small' />
        </Container>
      }
    >
      <Container bottom='medium'>
        <NoteCardSkeletonLoader />
      </Container>

      <Container bottom='medium'>
        <NoteCardSkeletonLoader />
      </Container>

      <NoteCardSkeletonLoader />
    </Section>
  )
}

export default NoteTabSkeletonLoader
