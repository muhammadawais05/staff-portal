import { Container } from '@toptal/picasso'
import React from 'react'
import { OperationFragment } from '@staff-portal/operations'

import { RepresentativeJobFragment } from '../../data'
import { JobsLinks } from '../../components'
import AssignToJobButton from '../AssignToJobButton'

const JobsWithAssignButton = ({
  jobs,
  assignCompanyRepresentativeToJob,
  companyRepresentativeId
}: {
  jobs?: RepresentativeJobFragment[]
  assignCompanyRepresentativeToJob?: OperationFragment
  companyRepresentativeId: string
}) => (
  <Container flex direction='column' gap='xsmall'>
    <JobsLinks jobs={jobs} />

    {assignCompanyRepresentativeToJob && (
      <Container>
        <AssignToJobButton
          operation={assignCompanyRepresentativeToJob}
          companyRepresentativeId={companyRepresentativeId}
        />
      </Container>
    )}
  </Container>
)

export default JobsWithAssignButton
