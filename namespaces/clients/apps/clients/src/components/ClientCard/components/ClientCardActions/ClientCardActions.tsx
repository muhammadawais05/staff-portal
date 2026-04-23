import React from 'react'
import {
  DeleteApplicationModalButton,
  MarkAsBadLeadModalButton,
  ClientFragment
} from '@staff-portal/clients'
import { CreateClaimerButton } from '@staff-portal/clients-applicants'
import { InlineActionsWrapper } from '@staff-portal/operations'

import { ApproveClientButton } from '../ApproveClientButton'
import { PauseClientButton } from '../PauseClientButton'
import { RepauseClientButton } from '../RepauseClientButton'
import { ResumeClientButton } from '../ResumeClientButton'
import RestoreFromBadLeadModalButton from '../../../../modals/components/RestoreFromBadLead/RestoreFromBadLeadModalButton/RestoreFromBadLeadModalButton'
import RestoreApplicationModalButton from '../../../../modals/components/RestoreApplicationModalButton/RestoreApplicationModalButton'
import { ClientCardType } from '../../utils/get-clients-configuration'

export interface Props {
  client: ClientFragment
  type: ClientCardType
}

export const ClientCardActions = ({
  client: {
    id,
    fullName,
    operations: {
      markClientAsBadLead,
      restoreClientFromBadLead,
      rejectClient,
      restoreClient,
      createClientClaimer,
      approveClient,
      pauseClient,
      repauseClient,
      resumeClient
    }
  },
  type
}: Props) => {
  return (
    <InlineActionsWrapper
      marginSizeBetweenChildren='xsmall'
      data-testid='client-card-actions'
    >
      <CreateClaimerButton companyId={id} operation={createClientClaimer} />
      {type === 'client' && [
        <ApproveClientButton
          key='approve'
          clientId={id}
          operation={approveClient}
        />,
        <PauseClientButton key='pause' clientId={id} operation={pauseClient} />,
        <ResumeClientButton
          key='resume'
          clientId={id}
          operation={resumeClient}
        />,
        <RepauseClientButton
          key='repause'
          clientId={id}
          operation={repauseClient}
        />
      ]}
      <MarkAsBadLeadModalButton clientId={id} operation={markClientAsBadLead} />
      <RestoreFromBadLeadModalButton
        clientId={id}
        clientName={fullName}
        operation={restoreClientFromBadLead}
      />
      <DeleteApplicationModalButton clientId={id} operation={rejectClient} />
      <RestoreApplicationModalButton companyId={id} operation={restoreClient} />
    </InlineActionsWrapper>
  )
}
