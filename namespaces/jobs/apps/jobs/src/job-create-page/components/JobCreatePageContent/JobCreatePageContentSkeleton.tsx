import React from 'react'
import { GridItemField } from '@staff-portal/ui'
import { Container, Section, SkeletonLoader, Stepper } from '@toptal/picasso'

import { JOB_CREATE_WIZARD_STEPS_MAPPING } from '../../config'

const JobCreatePageContentSkeleton = () => {
  return (
    <Section
      variant='withHeaderBar'
      title={<Stepper active={0} steps={JOB_CREATE_WIZARD_STEPS_MAPPING} />}
    >
      <GridItemField label={<SkeletonLoader.Typography />}>
        {Array.from(Array(7).keys()).map(item => (
          <Container key={item} top={item ? 'small' : undefined}>
            <SkeletonLoader.Typography rows={2} />
          </Container>
        ))}
      </GridItemField>
      <GridItemField label={<SkeletonLoader.Typography />}>
        <SkeletonLoader.Typography />
      </GridItemField>
      <GridItemField label={<SkeletonLoader.Typography />}>
        <SkeletonLoader.Typography rows={5} />
      </GridItemField>
    </Section>
  )
}

export default JobCreatePageContentSkeleton
