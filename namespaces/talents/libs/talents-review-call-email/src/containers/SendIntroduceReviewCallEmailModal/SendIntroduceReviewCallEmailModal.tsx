import React, { useCallback } from 'react'
import { NodeType } from '@staff-portal/graphql'
import {
  EmailPreview,
  SendEmailFormValuesToAdjust
} from '@staff-portal/communication-send-email'

import { SendActivationStepIntroductionEmailDocument } from './data/send-activation-step-introduction-email/send-activation-step-introduction-email.staff.gql.types'
import { useGetIntroductionReviewCallEmailContext } from './data/get-introduction-review-call-email-context/get-introduction-review-call-email-context.staff.gql'
import { ReviewCallEmailModal } from '../ReviewCallEmailModal/ReviewCallEmailModal'

export interface Props {
  stepId: string
  talentId: string
  hideModal: () => void
}

const SendIntroduceReviewCallEmailModal = ({
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
        emailMessagingIntroductionActivationStepId: to
      }
    },
    []
  )

  return (
    <ReviewCallEmailModal
      nodeId={talentId}
      queryHook={useGetIntroductionReviewCallEmailContext}
      mutationDocument={SendActivationStepIntroductionEmailDocument}
      mutationResult='sendActivationStepIntroductionEmail'
      emailPreview={EmailPreview}
      adjustFormValues={adjustFormValues}
      operationVariables={{
        nodeId: stepId,
        nodeType: NodeType.ACTIVATION_STEP,
        operationName: 'sendIntroductionEmail'
      }}
      hideModal={hideModal}
    />
  )
}

export default SendIntroduceReviewCallEmailModal
