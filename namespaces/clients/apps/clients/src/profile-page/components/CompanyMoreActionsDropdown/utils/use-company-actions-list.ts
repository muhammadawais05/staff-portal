/* eslint-disable max-lines-per-function */
import { concatMessages } from '@staff-portal/data-layer-service'
import { NodeType } from '@staff-portal/graphql'
import { useSendEmailModal } from '@staff-portal/communication-send-email'
import {
  ActionsList,
  DropdownActionType,
  useGetLazyOperationVariables
} from '@staff-portal/facilities'

import { ClientMetadataFragment } from '../../../data/get-client'
import { useCompanyDropdownActions } from './use-company-dropdown-actions'

interface ReturnType {
  loading: boolean
  list: ActionsList
  setLoading: (state: boolean) => void
}

export const useCompanyActionsList = (
  company: ClientMetadataFragment
): ReturnType => {
  const {
    id: companyId,
    addJobLink,
    contact,
    emailMessaging,
    emailMessagesUrl,
    casesUrl,
    gdprReportUrl,
    referralsUrl,
    updateProfileUrl,
    invoicesUrl,
    paymentsUrl,
    operations: companyOperations,
    currentNegotiation
  } = company

  const actions = useCompanyDropdownActions({
    company,
    representativeId: contact?.id ?? ''
  })
  const { loading, setLoading } = actions

  const getLazyOperationVariables = useGetLazyOperationVariables({
    nodeId: companyId,
    nodeType: NodeType.CLIENT,
    operations: companyOperations
  })

  const { showModal: showSendEmailModal } = useSendEmailModal({
    nodeId: companyId,
    operationVariables: {
      nodeId: emailMessaging?.id ?? '',
      nodeType: NodeType.EMAIL_MESSAGING_CLIENT,
      operationName: 'sendEmailTo'
    }
  })

  return {
    loading,
    setLoading,
    list: [
      {
        label: 'Pause company',
        type: DropdownActionType.OPERATION,
        action: actions.showPauseClientModal,
        operation: companyOperations.pauseClient
      },
      {
        label: 'Mark as Bad Lead',
        action: actions.showMarkAsBadLeadModal,
        ...getLazyOperationVariables('markClientAsBadLead')
      },
      {
        label: 'Import STA',
        type: DropdownActionType.OPERATION,
        action: actions.showImportSTAModal,
        operation: companyOperations.importSTA
      },
      {
        label: 'Delete Application',
        action: actions.showDeleteApplicationModal,
        ...getLazyOperationVariables('rejectClient')
      },
      {
        label: 'Enable Embedded Contract Signing',
        action: actions.showEnableEmbeddedSigningModal,
        ...getLazyOperationVariables('enableEmbeddedSigning')
      },
      {
        label: 'Disable Embedded Contract Signing',
        action: actions.showDisableEmbeddedSigningModal,
        ...getLazyOperationVariables('disableEmbeddedSigning')
      },
      {
        label: 'Start Negotiations',
        type: DropdownActionType.OPERATION,
        action: actions.showStartNegotiationModal,
        operation: companyOperations.startNegotiationForClient
      },
      {
        label: 'Update Negotiations Status',
        type: DropdownActionType.OPERATION,
        action: actions.showUpdateNegotiationModal,
        operation: currentNegotiation?.operations.updateNegotiationStatus
      },
      {
        label: 'Suspend Current Negotiation',
        type: DropdownActionType.OPERATION,
        action: actions.showSuspendNegotiationModal,
        operation: currentNegotiation?.operations.suspendNegotiation
      },
      {
        label: 'Add New Job',
        type: DropdownActionType.LINK,
        url: addJobLink?.url,
        // TODO: https://toptal-core.atlassian.net/browse/SPB-2859,
        disabled: !addJobLink?.enabled,
        disabledText: concatMessages(addJobLink?.messages)
      },
      {
        label: 'Leave Feedback',
        action: actions.showLeaveFeedbackModal,
        type: DropdownActionType.OPERATION,
        operation: companyOperations.leaveFeedbackClient
      },
      {
        label: 'Referred Users',
        type: DropdownActionType.LINK,
        url: referralsUrl
      },
      {
        label: 'Edit Profile',
        type: DropdownActionType.LINK,
        url: updateProfileUrl
      },
      {
        label: 'Find duplicates',
        action: actions.findDuplicates,
        ...getLazyOperationVariables('findPossibleClientDuplicates')
      },
      {
        label: 'Delete duplicate',
        action: actions.showDeleteDuplicateModal,
        ...getLazyOperationVariables('deleteDuplicateClient')
      },
      {
        label: 'Send Email',
        action: showSendEmailModal,
        type: DropdownActionType.OPERATION,
        operation: emailMessaging?.operations.sendEmailTo
      },
      {
        label: 'Communication',
        type: DropdownActionType.LINK,
        url: emailMessagesUrl
      },
      {
        label: 'Turn into Talent',
        type: DropdownActionType.OPERATION,
        action: actions.showTurnIntoTalentModal,
        operation: companyOperations.convertClientToTalent
      },
      {
        label: 'Black Flag',
        type: DropdownActionType.OPERATION,
        action: actions.showBlackFlagModal,
        operation: companyOperations.blackFlagClient
      },
      {
        label: 'Enable access to mobile app',
        action: actions.showEnableMobileAppModal,
        ...getLazyOperationVariables('enableMobileAppForClient')
      },
      {
        label: 'Disable access to mobile app',
        action: actions.showDisableMobileAppModal,
        ...getLazyOperationVariables('disableMobileAppForClient')
      },
      {
        label: 'Send Client App invitation email',
        action: actions.showSendMobileAppInvitationsToClientModal,
        ...getLazyOperationVariables('sendMobileAppInvitationsToClient')
      },
      {
        label: 'Invite Contact',
        action: actions.showInviteContactModal,
        type: DropdownActionType.OPERATION,
        operation: companyOperations.inviteCompanyRepresentative
      },
      {
        label: 'Issue an Invoice',
        action: actions.showIssueServiceInvoiceModal,
        ...getLazyOperationVariables('createClientServiceInvoice')
      },
      {
        label: 'Issue a Deposit Invoice',
        action: actions.showIssueDepositInvoiceModal,
        ...getLazyOperationVariables('createClientDepositInvoice')
      },
      {
        label: 'Record Unapplied Cash',
        action: actions.showUnappliedCashModal,
        ...getLazyOperationVariables('manageUnappliedCash')
      },
      {
        label: 'Invoices',
        type: DropdownActionType.LINK,
        url: invoicesUrl?.url,
        // TODO: https://toptal-core.atlassian.net/browse/SPB-2859
        disabled: !invoicesUrl?.enabled,
        disabledText: concatMessages(invoicesUrl?.messages)
      },
      {
        label: 'Payments',
        type: DropdownActionType.LINK,
        url: paymentsUrl?.url,
        // TODO: https://toptal-core.atlassian.net/browse/SPB-2859
        disabled: !paymentsUrl?.enabled,
        disabledText: concatMessages(paymentsUrl?.messages)
      },
      {
        label: 'Statement of Account',
        type: DropdownActionType.OPERATION,
        action: actions.showDownloadStatementOfAccountModal,
        operation: companyOperations?.downloadStatementOfAccount
      },
      {
        label: 'Workflows',
        type: DropdownActionType.LINK,
        url: casesUrl,
        newWindow: true
      },
      {
        label: 'Claim Enterprise',
        type: DropdownActionType.OPERATION,
        action: actions.showClaimClientEnterpriseModal,
        operation: companyOperations.claimClientEnterprise
      },
      {
        label: 'GDPR Report',
        type: DropdownActionType.LINK,
        url: gdprReportUrl
      },
      {
        label: 'Open TopChat Conversation',
        action: actions.createConversationForStaff,
        type: DropdownActionType.LAZY_OPERATION,
        operation: contact?.operations?.createConversationForStaff,
        operationVariables: {
          nodeId: contact?.id ?? '',
          nodeType: NodeType.COMPANY_REPRESENTATIVE,
          operationName: 'createConversationForStaff'
        }
      },
      {
        label: 'Login as Primary Contact',
        type: DropdownActionType.OPERATION,
        visible: !!contact,
        operation: contact?.operations?.loginAs,
        action: actions.loginAs
      }
    ]
  }
}
