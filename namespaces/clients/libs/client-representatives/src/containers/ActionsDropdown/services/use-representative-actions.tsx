import { useCallback, useState } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useModal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import {
  useLoginAs,
  ActionsList,
  DropdownActionType,
  useGetLazyOperationVariables
} from '@staff-portal/facilities'
import { useCreateConversationForStaff } from '@staff-portal/clients'
import { concatMessages } from '@staff-portal/data-layer-service'

import InviteToLoginModal from '../../InviteToLoginModal'
import { useMarkCompanyRepresentativeAsPrimary } from '../data/mark-as-primary-representative/mark-as-primary-representative.staff.gql'
import DeactivateModal from '../../DeactivateModal'
import ReactivateModal from '../../ReactivateModal'
import { RepresentativeFragment } from '../../../data'

const useActions = (representative: RepresentativeFragment) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [loading, setLoading] = useState(false)

  const { loginAs } = useLoginAs({
    roleId: representative.id,
    onRedirecting: () => setLoading(true),
    onRedirectingComplete: () => setLoading(false),
    onError: () => {
      showError(`Unable to login as this User.`)
      setLoading(false)
    }
  })

  const [markAsPrimaryMutation] = useMarkCompanyRepresentativeAsPrimary({
    companyRepresentativeId: representative.id,
    onError: () => {
      showError('Unable to mark this user as primary representative.')
      setLoading(false)
    },
    onCompleted: () => setLoading(false)
  })
  const markAsPrimary = useCallback(async () => {
    setLoading(true)

    const { data } = await markAsPrimaryMutation()

    handleMutationResult({
      mutationResult: data?.markCompanyRepresentativeAsPrimary,
      successNotificationMessage: 'Primary representative updated.'
    })
  }, [handleMutationResult, markAsPrimaryMutation])

  const { showModal: showInviteToLoginModal } = useModal(InviteToLoginModal, {
    contact: representative
  })

  const { showModal: showDeactivateModal } = useModal(DeactivateModal, {
    contact: representative
  })

  const { showModal: showReactivateModal } = useModal(ReactivateModal, {
    contact: representative
  })

  const createConversationForStaff = useCreateConversationForStaff({
    representativeId: representative.id
  })

  return {
    loading,
    setLoading,
    actions: {
      loginAs,
      markAsPrimary,
      showInviteToLoginModal,
      showDeactivateModal,
      showReactivateModal,
      createConversationForStaff
    }
  }
}

const orEmptyArray = (condition: boolean | undefined, items: ActionsList) =>
  condition ? items : []

export const useCompanyRepresentativeActions = (
  representative: RepresentativeFragment,
  options: { fullList?: boolean } = {}
) => {
  const { fullList } = options
  const { actions, loading, setLoading } = useActions(representative)
  const { operations } = representative

  const {
    url: paymentsUrl,
    enabled: paymentsUrlEnabled,
    messages: paymentsUrlMessages
  } = representative.paymentsUrl || {}

  const getLazyOperationVariables = useGetLazyOperationVariables({
    nodeId: representative.id,
    nodeType: NodeType.COMPANY_REPRESENTATIVE,
    operations
  })

  const list: ActionsList = [
    {
      label: 'Invite to Login',
      action: actions.showInviteToLoginModal,
      type: DropdownActionType.OPERATION,
      operation: operations.inviteToLoginCompanyRepresentative
    },
    ...orEmptyArray(!fullList, [
      {
        label: 'Make primary contact',
        action: actions.markAsPrimary,
        type: DropdownActionType.OPERATION,
        operation: operations.markCompanyRepresentativeAsPrimary
      }
    ]),

    {
      label: 'Delete',
      action: actions.showDeactivateModal,
      ...getLazyOperationVariables('deactivateCompanyRepresentative')
    },
    {
      label: 'Restore',
      action: actions.showReactivateModal,
      ...getLazyOperationVariables('reactivateCompanyRepresentative')
    },

    ...orEmptyArray(fullList, [
      {
        label: 'Payments',
        type: DropdownActionType.LINK,
        url: paymentsUrl,
        disabled: !paymentsUrlEnabled,
        disabledText: concatMessages(paymentsUrlMessages)
      },
      {
        label: 'GDPR report',
        type: DropdownActionType.LINK,
        url: representative.gdprReportUrl
      }
    ]),
    {
      label: 'Open TopChat Conversation',
      action: actions.createConversationForStaff,
      ...getLazyOperationVariables('createConversationForStaff')
    },
    {
      label: 'Login as this user',
      action: actions.loginAs,
      type: DropdownActionType.OPERATION,
      operation: operations.loginAs
    }
  ]

  return {
    loading,
    setLoading,
    list
  }
}
