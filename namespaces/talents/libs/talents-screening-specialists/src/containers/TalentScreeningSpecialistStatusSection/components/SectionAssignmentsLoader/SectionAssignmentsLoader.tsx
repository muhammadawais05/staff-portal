import React from 'react'
import { Grid, SkeletonLoader } from '@toptal/picasso'
import Section, { SectionProps } from '@toptal/picasso/Section'

export interface Props {
  title: string
  sectionVariant?: SectionProps['variant']
}

const SectionAssignmentsLoader = ({
  title,
  sectionVariant = 'default'
}: Props) => {
  return (
    <Section title={title} variant={sectionVariant}>
      <div data-testid='skeleton-loader'>
        <Grid spacing={8}>
          <Grid.Item small={12}>
            <SkeletonLoader.Typography rows={3} />
          </Grid.Item>
        </Grid>
      </div>
    </Section>
  )
}

export default SectionAssignmentsLoader
