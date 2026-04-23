import { useModal } from '@staff-portal/modals-service'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { ROLE_STEP_UPDATED, TALENT_UPDATED } from '@staff-portal/talents'

import { ScreeningRoleStepFragment } from '../../../data/get-talent-screening-role-steps'
import ReassignScreeningStepModal from '../ReassignScreeningStepModal'

export const useReassignScreeningStepModal = ({
  roleStep
}: {
  roleStep: ScreeningRoleStepFragment
}) => {
  const emitMessage = useMessageEmitter()
  const { showModal } = useModal(ReassignScreeningStepModal, {
    onSuccess: () => {
      emitMessage(ROLE_STEP_UPDATED)
      emitMessage(TALENT_UPDATED, { talentId: roleStep.talent.id })
    },
    roleStep
  })

  return {
    showModal
  }
}
