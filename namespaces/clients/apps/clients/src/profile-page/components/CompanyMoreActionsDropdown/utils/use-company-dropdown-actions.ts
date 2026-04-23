/* eslint-disable max-statements */
import { useState } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useModal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import {
  useDeleteApplicationModal,
  useMarkAsBadLeadModal,
  usePauseClientModal,
  BlackFlagModal,
  useCreateConversationForStaff
} from '@staff-portal/clients'
import { useLoginAs } from '@staff-portal/facilities'

import { useEnableEmbeddedSigningModal } from '../../EnableEmbeddedSigningModal'
import { useDisableEmbeddedSigningModal } from '../../DisableEmbeddedSigningModal'
import { useCreateInvoiceModals } from '../../IssueInvoice'
import { useSendMobileAppInvitationsToClientModal } from '../../SendMobileAppInvitationsToClientModal'
import {
  StartNegotiationModal,
  SuspendNegotiationModal,
  UpdateNegotiationModal,
  ImportSTAModal,
  useUnappliedCashModal
} from '../../../../modals'
import { DownloadStatementOfAccountModal } from '../../../components'
import { useClaimClientEnterpriseModal } from '../../ClaimClientEnterpriseModal'
import { useEnableMobileAppModal } from '../../EnableMobileApp'
import { useDisableMobileAppModal } from '../../DisableMobileApp'
import { useDeleteDuplicateModal } from '../../DeleteDuplicate'
import { useTurnIntoTalentModal } from '../../TurnIntoTalent'
import { ClientMetadataFragment } from '../../../data/get-client'
import { useFindClientDuplicates } from '../../PossibleDuplicatesCompaniesSection'
import { useInviteContactModal } from '../../InviteContactModal'
import { useLeaveFeedbackModal } from '../../LeaveFeedbackModal'

interface Props {
  company: ClientMetadataFragment
  representativeId: string
}

export const useCompanyDropdownActions = ({
  company: {
    id: companyId,
    fullName,
    currentNegotiation,
    webResource,
    engagements,
    contact
  },
  representativeId
}: Props) => {
  const { showError } = useNotifications()
  const [loading, setLoading] = useState(false)

  const { showModal: showEnableEmbeddedSigningModal } =
    useEnableEmbeddedSigningModal({ companyId })
  const { showModal: showDisableEmbeddedSigningModal } =
    useDisableEmbeddedSigningModal({ companyId })
  const { showModal: showEnableMobileAppModal } = useEnableMobileAppModal({
    companyId
  })
  const { showModal: showDisableMobileAppModal } = useDisableMobileAppModal({
    companyId
  })
  const { showIssueDepositInvoiceModal, showIssueServiceInvoiceModal } =
    useCreateInvoiceModals({
      clientId: companyId,
      companyName: fullName
    })
  const { showModal: showSendMobileAppInvitationsToClientModal } =
    useSendMobileAppInvitationsToClientModal(companyId)
  const { loginAs } = useLoginAs({
    roleId: representativeId,
    onRedirecting: () => setLoading(true),
    onRedirectingComplete: () => setLoading(false),
    onError: () => {
      showError(`Unable to login as this Company`)
      setLoading(false)
    }
  })
  const { showModal: showClaimClientEnterpriseModal } =
    useClaimClientEnterpriseModal({ clientId: companyId })
  const { showModal: showPauseClientModal } = usePauseClientModal({
    clientId: companyId
  })
  const { showModal: showDeleteDuplicateModal } = useDeleteDuplicateModal({
    companyId,
    fullName
  })
  const { showModal: showTurnIntoTalentModal } = useTurnIntoTalentModal({
    companyId,
    fullName: contact?.fullName || ''
  })
  const { showModal: showUnappliedCashModal } = useUnappliedCashModal({
    companyId
  })
  const { showModal: showMarkAsBadLeadModal } = useMarkAsBadLeadModal({
    clientId: companyId
  })
  const { findDuplicates } = useFindClientDuplicates({
    companyId
  })
  const { showModal: showBlackFlagModal } = useModal(BlackFlagModal, {
    clientId: companyId,
    companyName: fullName
  })
  const { showModal: showDeleteApplicationModal } = useDeleteApplicationModal({
    clientId: companyId
  })

  const { showModal: showDownloadStatementOfAccountModal } = useModal(
    DownloadStatementOfAccountModal,
    {
      companyId,
      operationVariables: {
        operationName: 'downloadStatementOfAccount',
        nodeType: NodeType.CLIENT,
        nodeId: companyId
      }
    }
  )

  const { showModal: showStartNegotiationModal } = useModal(
    StartNegotiationModal,
    {
      companyId,
      companyName: fullName
    }
  )
  const { showModal: showSuspendNegotiationModal } = useModal(
    SuspendNegotiationModal,
    currentNegotiation ? { companyName: fullName, negotiationId: currentNegotiation.id } : null
  )

  const { showModal: showUpdateNegotiationModal } = useModal(
    UpdateNegotiationModal,
    currentNegotiation ? {
      companyName: fullName,
      negotiationId: currentNegotiation.id,
      negotiationStatus: currentNegotiation.status
    } : null
  )
  const { showModal: showImportSTAModal } = useModal(ImportSTAModal, {
    companyId
  })
  const { showModal: showInviteContactModal } = useInviteContactModal(companyId)

  const { showModal: showLeaveFeedbackModal } = useLeaveFeedbackModal({
    companyId,
    companyWebResource: webResource,
    engagements
  })
  const createConversationForStaff = useCreateConversationForStaff({
    representativeId
  })

  return {
    loading,
    setLoading,
    showSendMobileAppInvitationsToClientModal,
    showEnableEmbeddedSigningModal,
    showDisableEmbeddedSigningModal,
    showClaimClientEnterpriseModal,
    showEnableMobileAppModal,
    showDisableMobileAppModal,
    showPauseClientModal,
    showDeleteDuplicateModal,
    showMarkAsBadLeadModal,
    showIssueDepositInvoiceModal,
    showIssueServiceInvoiceModal,
    showTurnIntoTalentModal,
    showDeleteApplicationModal,
    showDownloadStatementOfAccountModal,
    loginAs,
    findDuplicates,
    showBlackFlagModal,
    showStartNegotiationModal,
    showSuspendNegotiationModal,
    showUpdateNegotiationModal,
    showImportSTAModal,
    showInviteContactModal,
    showLeaveFeedbackModal,
    showUnappliedCashModal,
    createConversationForStaff
  }
}
