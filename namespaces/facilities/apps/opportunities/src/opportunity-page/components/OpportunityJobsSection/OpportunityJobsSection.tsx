import React from 'react'
import { Container, Section } from '@toptal/picasso'

import { useGetOpportunityJobs } from './data'
import OpportunityJobsTable from '../OpportunityJobsTable'
import { PROJECT_OPPORTUNITY_TYPE } from './constants'

export interface Props {
  opportunityId: string
}

const OpportunityJobsSection = ({ opportunityId }: Props) => {
  const { opportunity, jobs, loading } = useGetOpportunityJobs(opportunityId)

  return (
    <Container top='medium'>
      <Section title='Jobs' variant='withHeaderBar'>
        <OpportunityJobsTable
          data={jobs}
          project={opportunity?.type == PROJECT_OPPORTUNITY_TYPE}
          loading={loading}
        />
      </Section>
    </Container>
  )
}

export default OpportunityJobsSection
