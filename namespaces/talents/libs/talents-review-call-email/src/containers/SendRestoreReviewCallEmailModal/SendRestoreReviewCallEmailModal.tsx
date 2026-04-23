import React, { useCallback } from 'react'
import { NodeType } from '@staff-portal/graphql'
import {
  EmailPreview,
  SendEmailFormValuesToAdjust
} from '@staff-portal/communication-send-email'

import { useGetRestorationReviewCallEmailContext } from './data/get-restoration-review-call-email-context/get-restoration-review-call-email-context.staff.gql'
import { SendActivationStepRestorationEmailDocument } from './data/send-activation-step-restoration-email/send-activation-step-restoration-email.staff.gql.types'
import { ReviewCallEmailModal } from '../ReviewCallEmailModal/ReviewCallEmailModal'

export interface Props {
  stepId: string
  talentId: string
  hideModal: () => void
}

const SendRestoreReviewCallEmailModal = ({
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
        emailMessagingRestorationActivationStepId: to
      }
    },
    []
  )

  return (
    <ReviewCallEmailModal
      nodeId={talentId}
      queryHook={useGetRestorationReviewCallEmailContext}
      mutationDocument={SendActivationStepRestorationEmailDocument}
      mutationResult='sendActivationStepRestorationEmail'
      emailPreview={EmailPreview}
      adjustFormValues={adjustFormValues}
      operationVariables={{
        nodeId: stepId,
        nodeType: NodeType.ACTIVATION_STEP,
        operationName: 'sendRestorationEmail'
      }}
      hideModal={hideModal}
    />
  )
}

export default SendRestoreReviewCallEmailModal
