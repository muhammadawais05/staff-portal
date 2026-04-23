import React, { useCallback } from 'react'
import { NodeType } from '@staff-portal/graphql'
import {
  EmailPreview,
  SendEmailFormValuesToAdjust
} from '@staff-portal/communication-send-email'

import { useGetRescheduleReviewCallEmailContext } from './data/get-reschedule-review-call-email-context/get-reschedule-review-call-email-context.staff.gql'
import { SendActivationStepRescheduleEmailDocument } from './data/send-activation-step-reschedule-email/send-activation-step-reschedule-email.staff.gql.types'
import { ReviewCallEmailModal } from '../ReviewCallEmailModal/ReviewCallEmailModal'

interface Props {
  stepId?: string
  talentId: string
  hideModal: () => void
}

const SendRescheduleReviewCallEmailModal = ({
  stepId,
  talentId,
  hideModal
}: Props) => {
  const adjustFormValues = useCallback(
    ({
      body,
      ccSuggested,
      ccAdditional,
      bookingObjectId,
      to,
      title
    }: SendEmailFormValuesToAdjust) => {
      if (!bookingObjectId) {
        throw new Error(
          'Cannot find "bookingObjectId", make sure the field is rendered'
        )
      }

      return {
        title,
        body,
        cc: [...ccSuggested, ...ccAdditional.map(({ value }) => value)],
        bookingObjectId,
        emailMessagingRescheduleActivationStepId: to
      }
    },
    []
  )

  return (
    <ReviewCallEmailModal
      nodeId={talentId}
      queryHook={useGetRescheduleReviewCallEmailContext}
      mutationDocument={SendActivationStepRescheduleEmailDocument}
      mutationResult='sendActivationStepRescheduleEmail'
      emailPreview={EmailPreview}
      adjustFormValues={adjustFormValues}
      operationVariables={
        stepId
          ? {
              nodeId: stepId,
              nodeType: NodeType.ACTIVATION_STEP,
              operationName: 'sendRescheduleEmail'
            }
          : undefined
      }
      hideModal={hideModal}
    />
  )
}

export default SendRescheduleReviewCallEmailModal
