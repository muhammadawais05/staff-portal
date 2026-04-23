import React from 'react'
import { PromptModal } from '@staff-portal/modals-service'

import {
  RESTORE_FROM_BAD_LEAD_SUBMIT_BUTTON,
  RESTORE_FROM_BAD_LEAD_TITLE
} from '../config'
import { getRestoreFromBadLeadMessage } from '../utils'

export interface Props {
  clientName?: string
  loading: boolean
  hideModal: () => void
  onSubmit: (onCompleted: () => void) => void
}

const RestoreFromBadLeadPromptModal = ({
  clientName,
  loading,
  onSubmit,
  hideModal
}: Props) => (
  <PromptModal
    onClose={hideModal}
    title={RESTORE_FROM_BAD_LEAD_TITLE}
    submitText={RESTORE_FROM_BAD_LEAD_SUBMIT_BUTTON}
    message={getRestoreFromBadLeadMessage(clientName)}
    onSubmit={() => onSubmit(hideModal)}
    loading={loading}
    open
    variant='positive'
    size='small'
  />
)

export default RestoreFromBadLeadPromptModal
