import { useState } from 'react'
import { concatMessages } from '@staff-portal/data-layer-service'
import { useModal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { useNotifications } from '@staff-portal/error-handling'
import {
  useLoginAs,
  ActionsList,
  DropdownActionType,
  PaymentHistoryModal
} from '@staff-portal/facilities'
import { useSendEmailModal } from '@staff-portal/communication-send-email'

import { GetStaffProfileQuery } from '../../../data/get-staff-profile.staff.gql.types'
import useNavigateToEditProfile from './use-navigate-to-edit-profile'
import { RestoreStaffModal } from '../../RestoreStaffModal'
import { DeleteStaffModal } from '../../DeleteStaffModal'

interface ReturnType {
  loading: boolean
  setLoading: (state: boolean) => void
  actions: ActionsList
}

type Props = {
  staffProfile: NonNullable<GetStaffProfileQuery['node']>
}

export const useStaffProfileActionsList = ({
  staffProfile: {
    referralsUrl,
    emailMessagesUrl,
    paymentsUrl,
    gdprReportUrl,
    editDayoffsPage,
    editAbilitiesPage,
    operations: {
      loginAs,
      deactivateStaff,
      reactivateStaff,
      updateProfileStaff,
      downloadRolePaymentHistory
    },
    fullName,
    emailMessaging,
    id: staffId
  }
}: Props): ReturnType => {
  const [loading, setLoading] = useState(false)
  const { showError } = useNotifications()
  const handleEditClick = useNavigateToEditProfile(staffId)
  const { showModal: showPaymentHistoryModal } = useModal(PaymentHistoryModal, {
    nodeId: staffId,
    nodeType: NodeType.STAFF
  })
  const { showModal: showRestoreStaffModal } = useModal(RestoreStaffModal, {
    staffId,
    fullName
  })
  const { showModal: showDeleteStaffModal } = useModal(DeleteStaffModal, {
    staffId,
    fullName
  })
  const { loginAs: loginAsStaff } = useLoginAs({
    roleId: staffId,
    onRedirecting: () => setLoading(true),
    onRedirectingComplete: () => setLoading(false),
    onError: () => {
      showError(`Unable to login as this User`)
      setLoading(false)
    }
  })
  const { showModal: showSendEmailModal } = useSendEmailModal({
    nodeId: staffId,
    operationVariables: {
      nodeId: emailMessaging?.id ?? '',
      nodeType: NodeType.EMAIL_MESSAGING_ROLE,
      operationName: 'sendEmailTo'
    }
  })

  return {
    loading,
    setLoading,
    actions: [
      {
        label: 'Edit Profile',
        type: DropdownActionType.OPERATION,
        action: handleEditClick,
        operation: updateProfileStaff
      },
      {
        label: 'Referred Users',
        type: DropdownActionType.LINK,
        url: referralsUrl
      },
      {
        label: 'Send Email',
        type: DropdownActionType.OPERATION,
        action: showSendEmailModal,
        operation: emailMessaging?.operations.sendEmailTo
      },
      {
        label: 'Communication',
        type: DropdownActionType.LINK,
        url: emailMessagesUrl
      },
      {
        label: 'Restore',
        type: DropdownActionType.OPERATION,
        action: showRestoreStaffModal,
        operation: reactivateStaff
      },
      {
        label: 'Delete',
        type: DropdownActionType.OPERATION,
        action: showDeleteStaffModal,
        operation: deactivateStaff
      },
      {
        label: 'Payments',
        type: DropdownActionType.LINK,
        url: paymentsUrl?.url,
        disabled: !paymentsUrl?.enabled,
        disabledText: concatMessages(paymentsUrl?.messages)
      },
      {
        label: 'Payment History',
        type: DropdownActionType.OPERATION,
        action: showPaymentHistoryModal,
        operation: downloadRolePaymentHistory
      },
      {
        label: 'Download GDPR',
        type: DropdownActionType.LINK,
        url: gdprReportUrl
      },
      {
        label: 'Edit Working/Non-working days',
        type: DropdownActionType.LINK,
        url: editDayoffsPage?.url,
        disabled: !editDayoffsPage?.enabled,
        disabledText: concatMessages(editDayoffsPage?.messages)
      },
      {
        label: 'Login as this User',
        type: DropdownActionType.OPERATION,
        operation: loginAs,
        action: loginAsStaff
      },
      {
        label: 'Permissions',
        type: DropdownActionType.LINK,
        url: editAbilitiesPage?.url,
        disabled: !editAbilitiesPage?.enabled,
        disabledText: concatMessages(editAbilitiesPage?.messages)
      }
    ]
  }
}
