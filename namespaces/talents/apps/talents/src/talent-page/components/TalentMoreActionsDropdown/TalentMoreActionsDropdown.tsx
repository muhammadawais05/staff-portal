/* eslint-disable complexity, max-lines, max-lines-per-function, max-statements */
import React, { useState } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useModal } from '@staff-portal/modals-service'
import {
  getRoleTypeText,
  useLoginAs,
  PaymentHistoryModal,
  useGetLazyOperationVariables,
  ActionsDropdown
} from '@staff-portal/facilities'
import { NodeType } from '@staff-portal/graphql'
import {
  TALENT_UPDATED,
  TalentFragment,
  RejectSpecializationApplicationModal,
  RequestAvailabilityModal
} from '@staff-portal/talents'
import { ADD_TALENT_INFRACTION_MODAL } from '@staff-portal/talents-infractions'
import { isOperationEnabled } from '@staff-portal/operations'
import {
  getTalentPaymentsPath,
  getUpdateTalentProfilePath
} from '@staff-portal/routes'
import { useSendEmailModal } from '@staff-portal/communication-send-email'

import { paymentsHoldButtonText } from './utils'
import { useResetApplicationModal } from '../ResetApplicationModal'
import ReactivateTalentModal from '../ReactivateTalentModal'
import DeactivateTalentModal from '../DeactivateTalentModal'
import RemovePaymentHoldModal from '../RemovePaymentHoldModal'
import { ImportTalentContractModal } from '../ImportTalentContractModal'
import { useRenderDownloadIPHistory } from '../DownloadIPHistoryButton'
import { useResumeTalentApplicationModal } from '../ResumeTalentApplicationModal'
import ConvertToAnotherVerticalModal from '../ConvertToAnotherVerticalModal'
import ConvertOnboardingVerticalModal from '../ConvertOnboardingVerticalModal'
import GdprDataRemoveModal from '../GdprDataRemoveModal'
import { useSetHealthStatusModal } from '../SetHealthStatusModal/hooks'
import { PauseApplicationModal } from '../PauseApplicationModal'
import { ApplyToDifferentVerticalModal } from '../ApplyToDifferentVerticalModal/components'
import { ConvertToSourcingFlowModal } from '../ConvertToSourcingFlowModal/components'
import { CreateHoldPaymentsModal } from '../CreateHoldPaymentsModal'

interface Props {
  talentLegacyId: string
  talent: TalentFragment
}

const TalentMoreActionsDropdown = ({ talentLegacyId, talent }: Props) => {
  const { showError } = useNotifications()

  const {
    id,
    operations,
    fullName,
    specializationApplications,
    profileEditorUrl,
    emailMessagesUrl,
    referralsUrl,
    casesUrl,
    gdprReportUrl,
    payments,
    eligibleForAutomaticRestore,
    paymentsHoldDescription,
    type,
    emailMessaging
  } = talent

  const specializationApplication = specializationApplications?.nodes[0]

  const talentType = getRoleTypeText(type)

  const getLazyOperationVariables = useGetLazyOperationVariables({
    nodeId: id,
    nodeType: NodeType.TALENT,
    operations
  })

  const [loading, setLoading] = useState(false)

  const { showModal: showCreateInfractionModal } = useModal(
    ADD_TALENT_INFRACTION_MODAL,
    { forTalentId: id }
  )

  const { showModal: showConvertToAnotherVerticalModal } = useModal(
    ConvertToAnotherVerticalModal,
    {
      talentId: talent.id,
      fullName: talent.fullName,
      type: talent.type,
      verticals: talent.otherVerticals?.nodes || [],
      screeningRoleSteps: talent.screeningRoleSteps
    }
  )

  const { showModal: showConvertOnboardingVerticalModal } = useModal(
    ConvertOnboardingVerticalModal,
    {
      talentId: talent.id,
      fullName: talent.fullName,
      type: talent.type,
      verticals: talent.otherVerticals?.nodes || []
    }
  )

  const { showModal: showSetHealthStatusModal } =
    useSetHealthStatusModal(talent)

  const { showModal: showApplyToDifferentVerticalModal } = useModal(
    ApplyToDifferentVerticalModal,
    {
      type: talent.type,
      talentId: talent.id,
      fullName: talent.fullName,
      verticals: talent.otherVerticals?.nodes || []
    }
  )

  const { showModal: showResetTalentApplicationModal } =
    useResetApplicationModal({
      talentId: id
    })

  const { showModal: showSendEmailModal } = useSendEmailModal({
    nodeId: id,
    operationVariables: {
      // emailMessaging id shouldn't be null here at runtime. Using `??` only to cast its type to the string
      nodeId: talent.emailMessaging?.id ?? '',
      nodeType: NodeType.EMAIL_MESSAGING_ROLE,
      operationName: 'sendEmailTo'
    }
  })

  const { downloadIpHistory } = useRenderDownloadIPHistory({
    talentId: id
  })

  const { loginAs } = useLoginAs({
    roleId: id,
    onRedirecting: () => setLoading(true),
    onRedirectingComplete: () => setLoading(false),
    onError: () => {
      showError(`Unable to login as this ${talentType}`)
      setLoading(false)
    }
  })

  const { showResumeTalentApplicationModal } = useResumeTalentApplicationModal({
    talentId: id
  })

  const editProfileDetailsUrl = getUpdateTalentProfilePath(talentLegacyId)
  const talentPaymentsUrl = getTalentPaymentsPath(talentLegacyId)

  const paymentsHoldLabel = paymentsHoldButtonText(paymentsHoldDescription)

  return (
    <ActionsDropdown
      fullHeight
      disablePopper
      // TODO: Remove the below 3 lines once all modals are migrated to modals-service (https://toptal-core.atlassian.net/browse/SP-2468)
      loading={loading}
      onStart={() => setLoading(true)}
      onSettled={() => setLoading(false)}
    >
      <ActionsDropdown.LazyMenuItem
        {...getLazyOperationVariables('createTalentInfraction')}
        onSuccess={showCreateInfractionModal}
      >
        Add Infraction
      </ActionsDropdown.LazyMenuItem>

      <ActionsDropdown.ModalItem
        operation={operations.convertToSourcingFlow}
        modal={ConvertToSourcingFlowModal}
        modalProps={{ talentId: id }}
      >
        Convert to Sourcing Flow
      </ActionsDropdown.ModalItem>

      {specializationApplication && (
        <ActionsDropdown.ModalItem
          operation={
            specializationApplication.operations.rejectSpecializationApplication
          }
          modal={RejectSpecializationApplicationModal}
          modalProps={{
            talentId: id,
            specializationApplicationId: specializationApplication.id
          }}
        >
          Reject Application
        </ActionsDropdown.ModalItem>
      )}

      <ActionsDropdown.ModalItem
        operation={operations.pauseTalent}
        modal={PauseApplicationModal}
        modalProps={{ talentId: id }}
      >
        Pause Application
      </ActionsDropdown.ModalItem>

      <ActionsDropdown.MenuItem
        operation={operations.resetRejectedTalentApplication}
        onClick={showResetTalentApplicationModal}
      >
        Reset Application
      </ActionsDropdown.MenuItem>

      {isOperationEnabled(operations.updateTalentProfile) && (
        <ActionsDropdown.LinkItem href={editProfileDetailsUrl}>
          Edit Details
        </ActionsDropdown.LinkItem>
      )}

      <ActionsDropdown.LinkItem href={profileEditorUrl}>
        Talent Profile
      </ActionsDropdown.LinkItem>

      {emailMessaging && (
        <ActionsDropdown.MenuItem
          operation={emailMessaging?.operations?.sendEmailTo}
          onClick={showSendEmailModal}
        >
          Send Email
        </ActionsDropdown.MenuItem>
      )}

      <ActionsDropdown.LinkItem href={emailMessagesUrl}>
        Communication
      </ActionsDropdown.LinkItem>

      <ActionsDropdown.ModalItem
        operation={operations.createTalentAvailabilityRequest}
        modal={RequestAvailabilityModal}
        modalProps={{ talentId: id }}
      >
        Request Availability
      </ActionsDropdown.ModalItem>

      <ActionsDropdown.LinkItem href={referralsUrl}>
        Referred Users
      </ActionsDropdown.LinkItem>

      <ActionsDropdown.ModalItem
        operation={operations.removeTalent}
        modal={DeactivateTalentModal}
        modalProps={{ talentId: id, fullName, talentType }}
      >{`Deactivate ${talentType}`}</ActionsDropdown.ModalItem>

      <ActionsDropdown.ModalItem
        operation={operations.reactivateTalent}
        modal={ReactivateTalentModal}
        modalProps={{ talentId: id, fullName, talentType }}
      >{`Restore ${talentType}`}</ActionsDropdown.ModalItem>

      <ActionsDropdown.LazyMenuItem
        key='convertOnboardingTalent'
        {...getLazyOperationVariables('convertOnboardingTalent')}
        onSuccess={showConvertOnboardingVerticalModal}
      >
        Convert to...
      </ActionsDropdown.LazyMenuItem>

      <ActionsDropdown.LazyMenuItem
        {...getLazyOperationVariables('convertTalent')}
        onSuccess={showConvertToAnotherVerticalModal}
      >
        Convert to...
      </ActionsDropdown.LazyMenuItem>

      <ActionsDropdown.LazyMenuItem
        {...getLazyOperationVariables('setHealthStatusTalent')}
        onSuccess={showSetHealthStatusModal}
      >
        Talent Health Status
      </ActionsDropdown.LazyMenuItem>

      <ActionsDropdown.ModalItem
        operation={operations.importTalentContract}
        modal={ImportTalentContractModal}
        modalProps={{ talentId: id }}
      >
        Import Contract
      </ActionsDropdown.ModalItem>

      <ActionsDropdown.LinkItem href={casesUrl} newWindow>
        Workflows
      </ActionsDropdown.LinkItem>

      <ActionsDropdown.ModalItem
        operation={operations.createPaymentHold}
        modal={CreateHoldPaymentsModal}
        modalProps={{ talentId: id, fullName, paymentsHoldDescription }}
      >
        {paymentsHoldLabel}
      </ActionsDropdown.ModalItem>

      <ActionsDropdown.ModalItem
        operation={operations.removePaymentHold}
        modal={RemovePaymentHoldModal}
        modalProps={{ talentId: id, fullName }}
      >
        Remove Hold on Payments
      </ActionsDropdown.ModalItem>

      <ActionsDropdown.LinkItem
        href={talentPaymentsUrl}
        disabled={!payments?.totalCount}
        disabledText={`This ${talentType} does not have any payments`}
      >
        Payments
      </ActionsDropdown.LinkItem>

      <ActionsDropdown.ModalItem
        operation={operations.downloadRolePaymentHistory}
        modal={PaymentHistoryModal}
        modalProps={{
          nodeId: id,
          nodeType: NodeType.TALENT,
          successMessageEmitOptions: {
            type: TALENT_UPDATED,
            payload: { talentId: id }
          }
        }}
      >
        Payment History
      </ActionsDropdown.ModalItem>

      <ActionsDropdown.LazyMenuItem
        {...getLazyOperationVariables('downloadTalentIpHistory')}
        onSuccess={downloadIpHistory}
      >
        Download IP History
      </ActionsDropdown.LazyMenuItem>

      <ActionsDropdown.LinkItem href={gdprReportUrl}>
        GDPR Report
      </ActionsDropdown.LinkItem>

      <ActionsDropdown.ModalItem
        operation={operations.processGdprRemovalTalent}
        modal={GdprDataRemoveModal}
        modalProps={{ talentId: id }}
      >
        GDPR Remove Data
      </ActionsDropdown.ModalItem>

      <ActionsDropdown.MenuItem
        operation={operations.loginAs}
        onClick={loginAs}
      >{`Login as this ${talentType}`}</ActionsDropdown.MenuItem>

      <ActionsDropdown.LazyMenuItem
        {...getLazyOperationVariables('applyTalentToAnotherVertical')}
        onSuccess={showApplyToDifferentVerticalModal}
      >
        Apply to Different Vertical
      </ActionsDropdown.LazyMenuItem>

      {!eligibleForAutomaticRestore && (
        <ActionsDropdown.MenuItem
          operation={operations.resumeTalentApplication}
          onClick={showResumeTalentApplicationModal}
        >
          Exceptional Restoration
        </ActionsDropdown.MenuItem>
      )}
    </ActionsDropdown>
  )
}

export default TalentMoreActionsDropdown
