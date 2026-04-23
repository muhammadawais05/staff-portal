import React, { useCallback } from 'react'
import {
  SendEmailModal as SEM,
  EmailPreview,
  useGetGeneralEmailContext
} from '@staff-portal/communication-send-email'
import { NodeType } from '@staff-portal/graphql'

import { SendClientClaimEmailDocument } from './data/send-client-claim-email/send-client-claim-email.staff.gql.types'
import { adjustFormValuesMapper } from './services/adjust-form-values-mapper'

interface Props {
  nodeId: string
  preselectedEmailTemplateId?: string | undefined | null
  hideModal: () => void
}

const SendInitialClaimEmailModal = ({
  nodeId,
  preselectedEmailTemplateId,
  hideModal
}: Props) => {
  const adjustFormValues = useCallback(adjustFormValuesMapper(nodeId), [nodeId])

  return (
    <SEM
      nodeId={nodeId}
      queryHook={useGetGeneralEmailContext}
      mutationDocument={SendClientClaimEmailDocument}
      mutationResult='sendClientClaimEmail'
      adjustFormValues={adjustFormValues}
      hideModal={hideModal}
      preselectedEmailTemplateId={preselectedEmailTemplateId}
      operationVariables={{
        nodeId,
        nodeType: NodeType.CLIENT,
        operationName: 'sendClientClaimEmail'
      }}
    >
      {() => (
        <>
          <SEM.EmailTemplatesField />
          <SEM.SubjectField label='Title' />
          <SEM.ToField />
          <SEM.CCSuggestedField />
          <SEM.CCAdditionalField />
          <SEM.EmailBodyField emailPreview={EmailPreview} />
          <SEM.OfacStatusNotification />
          <SEM.SendEmailPendingTasks />
          <SEM.GoogleAppsAuthNotification />
          <SEM.LatestEmailMessageSection />
        </>
      )}
    </SEM>
  )
}

export default SendInitialClaimEmailModal
