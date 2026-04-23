import React from 'react'
import { Container } from '@toptal/picasso'
import { WorkloadTab } from '@staff-portal/talents-workload'

interface Props {
  talentId: string
}

export const WorkloadSection = ({ talentId }: Props) => {
  return (
    <Container data-testid='workload-section'>
      <WorkloadTab talentId={talentId} />
    </Container>
  )
}

export default WorkloadSection
