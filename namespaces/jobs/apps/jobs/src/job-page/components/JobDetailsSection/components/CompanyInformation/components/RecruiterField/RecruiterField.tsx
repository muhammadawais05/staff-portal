import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'
import { JobClaimerField } from '@staff-portal/jobs'

import { JobDetailsStaffFragment } from '../../data/get-job-company-data.staff.gql.types'
import RecruiterModal from './components/RecruiterModal'

export type Props = {
  jobId: string
  claimer?: JobDetailsStaffFragment | null
  claimerReplacement?: JobDetailsStaffFragment | null
  operation: OperationType | undefined
}

const RecruiterField = ({
  jobId,
  claimer,
  claimerReplacement,
  operation
}: Props) => {
  const { showModal } = useModal(RecruiterModal, {
    jobId,
    claimerId: claimer?.id
  })

  return (
    <Container flex justifyContent='space-between' gap='small'>
      <JobClaimerField
        claimer={claimer}
        claimerReplacement={claimerReplacement}
      />
      <Operation
        operation={operation}
        render={disabled => (
          <Button
            variant='secondary'
            size='small'
            disabled={disabled}
            onClick={showModal}
          >
            Edit
          </Button>
        )}
      />
    </Container>
  )
}

export default RecruiterField
