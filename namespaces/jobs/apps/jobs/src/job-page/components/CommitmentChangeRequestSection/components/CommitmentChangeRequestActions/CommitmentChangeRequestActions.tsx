import React from 'react'
import { Maybe } from '@staff-portal/graphql/staff'
import { ActionLoader } from '@staff-portal/ui'
import { Container } from '@toptal/picasso'
import { Operation } from '@staff-portal/operations'

import { CommitmentChangeRequestFragment } from '../../data'
import ApproveCommitmentChangeRequestButton from '../ApproveCommitmentChangeRequestButton'
import RejectCommitmentChangeRequestButton from '../RejectCommitmentChangeRequestButton'

interface Props {
  jobId: string
  jobTitle?: string
  clientId?: string
  commitmentChangeRequest?: Maybe<CommitmentChangeRequestFragment>
}

const CommitmentChangeRequestActions = ({
  jobId,
  jobTitle,
  clientId,
  commitmentChangeRequest
}: Props) => {
  const { id: commitmentChangeRequestId, operations } =
    commitmentChangeRequest || {}
  const {
    approveCommitmentChangeRequest: approveCommitmentChangeRequestOperation,
    rejectCommitmentChangeRequest: rejectCommitmentChangeRequestOperation
  } = operations || {}

  if (!commitmentChangeRequestId || !jobTitle) {
    return (
      <>
        <ActionLoader />
        <ActionLoader />
      </>
    )
  }

  return (
    <Container left='small'>
      <Operation
        operation={approveCommitmentChangeRequestOperation}
        render={disabled => (
          <ApproveCommitmentChangeRequestButton
            jobId={jobId}
            commitmentChangeRequestId={commitmentChangeRequestId}
            disabled={disabled}
          />
        )}
      />
      <Operation
        operation={rejectCommitmentChangeRequestOperation}
        render={disabled => (
          <RejectCommitmentChangeRequestButton
            jobId={jobId}
            jobTitle={jobTitle}
            commitmentChangeRequestId={commitmentChangeRequestId}
            clientId={clientId}
            disabled={disabled}
          />
        )}
      />
    </Container>
  )
}

export default CommitmentChangeRequestActions
