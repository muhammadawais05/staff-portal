import React from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { REFRESH_INVESTIGATIONS } from '@staff-portal/clients'

import { SetCreateClientInvestigationDocument } from './data/create-client-investigation.staff.gql.types'
import { InvestigationUpdateModal } from '..'

/**
 * TODO use a Context for passing props between components
 * https://toptal-core.atlassian.net/browse/SPB-2273
 */
export interface Props {
  clientId: string
  hideModal: () => void
}

const InvestigationCreateModal = ({ clientId, hideModal }: Props) => {
  const emitMessage = useMessageEmitter()

  const { handleSubmit, loading: submittingCreate } = useModalFormChangeHandler(
    {
      mutationDocument: SetCreateClientInvestigationDocument,
      mutationResultOptions: {
        successNotificationMessage: 'Investigation has been started.',
        onSuccessAction: () => {
          hideModal()
          emitMessage(REFRESH_INVESTIGATIONS, { companyId: clientId })
        }
      }
    }
  )

  return (
    <InvestigationUpdateModal
      clientId={clientId}
      hideModal={hideModal}
      handleSubmit={handleSubmit}
      submittingCreate={submittingCreate}
      modalTitle='Start Investigation'
      noCommsCheckbox
    />
  )
}

export default InvestigationCreateModal
