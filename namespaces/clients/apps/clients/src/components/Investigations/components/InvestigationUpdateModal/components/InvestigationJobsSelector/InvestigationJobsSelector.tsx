import React from 'react'
import { Container, Typography } from '@toptal/picasso'

import JobListingTable from '../../../JobListingTable'
import { InvestigationJobFragment } from '../../../../data'

type Props = {
  companyName: string
  jobs: InvestigationJobFragment[]
}

const InvestigationJobsSelector = ({ companyName, jobs }: Props) => {
  const hasSelectableJobs = jobs.length > 0

  return (
    <Container top='small'>
      <Typography size='medium' data-testid='JobsAssociationMessage-text'>
        {hasSelectableJobs
          ? `Would you like to associate ${companyName}'s jobs with the investigation?`
          : `${companyName} doesn't have jobs in a state appropriate for associating with the investigation.`}
      </Typography>
      {hasSelectableJobs && (
        <JobListingTable
          jobs={jobs}
          selectable
          showStatusTooltips={false}
          ignoreInvestigationStatus
        />
      )}
    </Container>
  )
}

export default InvestigationJobsSelector
