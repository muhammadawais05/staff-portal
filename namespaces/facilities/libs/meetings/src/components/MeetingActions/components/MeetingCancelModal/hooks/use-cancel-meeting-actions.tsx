import { CancelMeetingPostActionName } from '@staff-portal/graphql/staff'
import { useSendEmailModal } from '@staff-portal/communication-send-email'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useDependency } from '@staff-portal/dependency-injector'

import { CancelMeetingMutation } from '../data'
import { MEETING_CANCELED } from '../../../../../messages'
import { MEETING_CANCELED_NEXT_ACTION_HOOKS } from '../../../../../dependencies'

export type CancelMutationResultType = NonNullable<
  CancelMeetingMutation['cancelMeeting']
>

export type CancelMutationSuccessHandler = (
  mutationResult: CancelMutationResultType
) => void

export const useCancelMeetingActions = (meetingId: string) => {
  const nextActionModals = useDependency(MEETING_CANCELED_NEXT_ACTION_HOOKS)
  const emitMessage = useMessageEmitter()
  const { showModal: showSendEmailModal } = useSendEmailModal()

  if (!nextActionModals) {
    throw new Error('Missing required dependencies')
  }

  const {
    useSendRescheduleReviewCallEmailModal,
    useSendRescheduleScreeningEmailModal
  } = nextActionModals
  const { showModal: showRescheduleScreeningModal } =
    useSendRescheduleScreeningEmailModal()
  const { showModal: showRescheduleActivationModal } =
    useSendRescheduleReviewCallEmailModal()

  const cancelSuccessHandler = ({
    nextActionName,
    cancelMeetingEmailTemplate,
    meeting
  }: CancelMutationResultType) => {
    const attendeeId = meeting?.attendee?.id

    emitMessage(MEETING_CANCELED, {
      meetingId,
      attendeeId,
      nextActionName,
      emailTemplateId: cancelMeetingEmailTemplate?.id
    })

    switch (nextActionName) {
      case CancelMeetingPostActionName.SEND_TO_EMAIL_POST_ACTION:
        showSendEmailModal({
          nodeId: meetingId,
          preselectedEmailTemplateId: cancelMeetingEmailTemplate?.id
        })
        break
      case CancelMeetingPostActionName.RESCHEDULE_POST_ACTION:
        showRescheduleScreeningModal({ talentId: attendeeId })
        break
      case CancelMeetingPostActionName.TALENT_ACTIVATION_RESCHEDULE_POST_ACTION:
        showRescheduleActivationModal({ talentId: attendeeId })
        break
    }
  }

  return { cancelSuccessHandler }
}
