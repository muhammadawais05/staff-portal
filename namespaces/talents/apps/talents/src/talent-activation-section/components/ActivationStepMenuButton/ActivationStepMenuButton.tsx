import React from 'react'
import { Menu } from '@toptal/picasso'
import { StepMenuButton } from '@staff-portal/ui'
import { ActivationStepFragment } from '@staff-portal/talents'
import {
  useSendIntroduceReviewCallEmailModal,
  useSendRescheduleReviewCallEmailModal,
  useSendRestoreReviewCallEmailModal
} from '@staff-portal/talents-review-call-email'

import { StepOperation } from '../../types'
import {
  getEnabledSecondaryOperations,
  getSecondaryOperationButtonLabel
} from '../../utils'
import { useUnclaimActivationStepModal } from '../../modals/components/UnclaimActivationStepModal'
import { useReassignActivationStepModal } from '../../modals/components/ReassignActivationStepModal'
import { useResetActivationStepModal } from '../../modals/components/ResetActivationStepModal'

export type Props = {
  activationId: string
  talentId: string
  step: ActivationStepFragment
  stepName: string
}

const ActivationStepMenuButton = ({
  activationId,
  talentId,
  step,
  stepName
}: Props) => {
  const { id: stepId, staff } = step
  const secondaryOperations = getEnabledSecondaryOperations(step)

  const { showModal: showUnclaimActivationStepModal } =
    useUnclaimActivationStepModal({ stepId, stepName, talentId })

  const { showModal: showResetActivationStepModal } =
    useResetActivationStepModal({ stepId, stepName, talentId })

  const { showModal: showReassignActivationStepModal } =
    useReassignActivationStepModal({
      activationId,
      stepId,
      stepName,
      staff,
      talentId
    })

  const { showModal: showSendIntroduceReviewCallEmailModal } =
    useSendIntroduceReviewCallEmailModal({ stepId, talentId })

  const { showModal: showSendReviewCallRescheduleEmailModal } =
    useSendRescheduleReviewCallEmailModal()

  const { showModal: showSendRestoreReviewCallEmailModal } =
    useSendRestoreReviewCallEmailModal({ stepId, talentId })

  const handleMenuItemClick = (key: StepOperation) => {
    switch (key) {
      case StepOperation.Unassign:
        showUnclaimActivationStepModal()
        break
      case StepOperation.Reset:
        showResetActivationStepModal()
        break
      case StepOperation.Reassign:
        showReassignActivationStepModal()
        break
      case StepOperation.SendIntroductionEmail:
        showSendIntroduceReviewCallEmailModal()
        break
      case StepOperation.SendRescheduleEmail:
        showSendReviewCallRescheduleEmailModal({ stepId, talentId })
        break
      case StepOperation.SendRestorationEmail:
        showSendRestoreReviewCallEmailModal()
        break
    }
  }

  return (
    <>
      <StepMenuButton>
        <Menu>
          {secondaryOperations.length > 0 ? (
            secondaryOperations.map(key => (
              <Menu.Item key={key} onClick={() => handleMenuItemClick(key)}>
                {getSecondaryOperationButtonLabel(key)}
              </Menu.Item>
            ))
          ) : (
            <Menu.Item disabled>No additional actions</Menu.Item>
          )}
        </Menu>
      </StepMenuButton>
    </>
  )
}

export default ActivationStepMenuButton
