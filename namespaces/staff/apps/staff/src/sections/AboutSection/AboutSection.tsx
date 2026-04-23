import React from 'react'
import { Section, Container } from '@toptal/picasso'
import {
  ContainerLoader,
  TextSectionSkeleton,
  MultilineTextViewer
} from '@staff-portal/ui'

export interface Props {
  about?: string | null
  loading: boolean
  initialLoading: boolean
}

const AboutSection = ({ about, loading, initialLoading }: Props) => (
  <ContainerLoader
    loading={loading}
    showSkeleton={initialLoading}
    skeletonComponent={<TextSectionSkeleton title='About' />}
  >
    {about && (
      <Container top='medium'>
        <Section title='About' variant='withHeaderBar'>
          {/**
           * TODO: update with the correct component
           * https://toptal-core.atlassian.net/browse/SPB-2822
           */}
          <MultilineTextViewer value={about} />
        </Section>
      </Container>
    )}
  </ContainerLoader>
)

export default AboutSection
