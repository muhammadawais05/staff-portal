import React from 'react'
import { useSendEmailModal } from '@staff-portal/communication-send-email'
import { getRoleTypeText } from '@staff-portal/facilities'
import { NodeType } from '@staff-portal/graphql'
import {
  ApproveApplicationButton,
  RejectJobApplicantModalButton
} from '@staff-portal/jobs'
import { Operation } from '@staff-portal/operations'
import { Button, Container } from '@toptal/picasso'
import { ActionLoader } from '@staff-portal/ui'

import { JobApplicationFragment } from '../../data/get-job-application'

export interface Props {
  loading: boolean
  jobApplication?: JobApplicationFragment | null
}

const JobApplicationActions = ({ loading, jobApplication }: Props) => {
  const emailMessagingJobApplicantId = jobApplication?.emailMessaging?.id ?? ''

  const { showModal: showSendEmailModal } = useSendEmailModal({
    nodeId: emailMessagingJobApplicantId,
    operationVariables: {
      nodeId: jobApplication?.id ?? '',
      nodeType: NodeType.JOB_APPLICATION,
      operationName: 'emailJobApplicant'
    }
  })

  if (loading || !jobApplication) {
    return (
      <Container flex data-testid='job-application-actions-loaders'>
        <ActionLoader />
        <ActionLoader />
        <ActionLoader />
      </Container>
    )
  }

  return (
    <Container flex alignItems='center' data-testid='job-application-actions'>
      <Container right='small'>
        {emailMessagingJobApplicantId && (
          <Operation
            operation={jobApplication.operations.emailJobApplicant}
            render={disabled =>
              !disabled && (
                <Button
                  variant='secondary'
                  size='small'
                  onClick={() => showSendEmailModal()}
                  data-testid='job-application-actions-email-button'
                >
                  Email {getRoleTypeText(jobApplication.talent.type)}
                </Button>
              )
            }
          />
        )}
      </Container>
      <ApproveApplicationButton jobApplication={jobApplication} />
      <RejectJobApplicantModalButton jobApplication={jobApplication} />
    </Container>
  )
}

export default JobApplicationActions
