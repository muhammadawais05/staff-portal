import React from 'react'
import { NodeType } from '@staff-portal/graphql'
import { Operation, OperationType } from '@staff-portal/operations'
import { Container, Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'

import RejectJobApplicantModal from '../RejectJobApplicantModal'

interface Props {
  jobApplication: {
    id: string
    operations: {
      rejectJobApplicant: OperationType
    }
    job: {
      id: string
    }
  }
}

const RejectJobApplicantModalButton = ({ jobApplication }: Props) => {
  const { showModal } = useModal(RejectJobApplicantModal, {
    jobApplicationId: jobApplication.id,
    jobId: jobApplication.job.id,
    operationVariables: {
      nodeId: jobApplication.id,
      nodeType: NodeType.JOB_APPLICATION,
      operationName: 'rejectJobApplicant'
    }
  })

  return (
    <Operation
      operation={jobApplication.operations.rejectJobApplicant}
      render={disabled =>
        !disabled && (
          <Container left='small'>
            <Button
              size='small'
              variant='negative'
              onClick={showModal}
              disabled={disabled}
              data-testid='reject-job-application-button'
            >
              Reject
            </Button>
          </Container>
        )
      }
    />
  )
}

export default RejectJobApplicantModalButton
