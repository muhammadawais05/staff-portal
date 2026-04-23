import { Container } from '@toptal/picasso'
import React from 'react'
import { NodeType } from '@staff-portal/graphql'
import { SendEmailActionItem } from '@staff-portal/communication-send-email'
import { getRoleTypeText } from '@staff-portal/facilities'
import { ApproveApplicationButton } from '@staff-portal/jobs'

import { CancelledJobApplicantFragment } from '../../data/get-cancelled-job-applicants/get-cancelled-job-applicants.staff.gql.types'

type Props = {
  cancelledJobApplicant: CancelledJobApplicantFragment
}

const CancelledJobApplicantsTableItemActions = ({
  cancelledJobApplicant
}: Props) => (
  <Container flex alignItems='center' left='xsmall'>
    {cancelledJobApplicant.emailMessaging && (
      <SendEmailActionItem
        componentType='button'
        variant='secondary'
        size='small'
        nodeId={cancelledJobApplicant.emailMessaging.id}
        operation={cancelledJobApplicant.operations.emailJobApplicant}
        operationVariables={{
          nodeId: cancelledJobApplicant.id,
          nodeType: NodeType.JOB_APPLICATION,
          operationName: 'emailJobApplicant'
        }}
        data-testid='email-talent-button'
      >
        Email {getRoleTypeText(cancelledJobApplicant.talent.type)}
      </SendEmailActionItem>
    )}

    <Container left='small'>
      <ApproveApplicationButton
        jobApplication={cancelledJobApplicant}
        buttonText='Approve Application'
      />
    </Container>
  </Container>
)

export default CancelledJobApplicantsTableItemActions
