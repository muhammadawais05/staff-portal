import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { RoleStepNextActions } from '@staff-portal/graphql/staff'
import { ROLE_STEP_UPDATED } from '@staff-portal/talents'
import { useSendEmailModal } from '@staff-portal/communication-send-email'

import useSendTalentToPortfolioReviewModal from '../../../../../talent-page/components/SendTalentToPortfolioReviewModal/hooks'
import { useSendIntroduceBookingEmailModal } from '../../../../modals/SendIntroduceScreeningEmailModal/services/use-send-introduce-booking-email-modal/use-send-introduce-booking-email-modal'

/**
 * @deprecated Must be replaced to a generated one (from __generate__ folder) as soon as `RoleStepMutationResult` will be introduced
 * https://toptal-core.atlassian.net/browse/GOLD-1439
 * https://toptal-core.atlassian.net/browse/SPB-2082
 */
export type RoleStepNextActionFragment = any // eslint-disable-line @typescript-eslint/no-explicit-any

const useNextAction = ({ talentId }: { talentId: string }) => {
  const emitMessage = useMessageEmitter()
  const { showModal: showSendEmailModal } = useSendEmailModal()
  const { showModal: showTalentToPortfolioReviewModal } =
    useSendTalentToPortfolioReviewModal({
      talentId,
      onSuccess: () => emitMessage(ROLE_STEP_UPDATED)
    })

  const { showModal: showIntroduceBookingModal } =
    useSendIntroduceBookingEmailModal({ talentId, scheduledSend: true })

  return {
    triggerNextAction: ({
      roleStep,
      nextAction,
      emailTemplate
    }: RoleStepNextActionFragment) => {
      emitMessage(ROLE_STEP_UPDATED)

      switch (nextAction) {
        case RoleStepNextActions.SEND_EMAIL:
          showSendEmailModal({
            nodeId: roleStep?.emailMessaging?.id,
            preselectedEmailTemplateId: emailTemplate?.id
          })
          break
        case RoleStepNextActions.INTRODUCE_BOOKING:
          showIntroduceBookingModal()
          break
        case RoleStepNextActions.SEND_TO_PORTFOLIO_REVIEW:
          showTalentToPortfolioReviewModal(emailTemplate?.id)
          break
      }
    }
  }
}

export default useNextAction
