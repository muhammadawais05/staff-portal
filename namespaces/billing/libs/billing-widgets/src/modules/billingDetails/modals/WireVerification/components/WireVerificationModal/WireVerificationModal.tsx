import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

import {
  useSetVerifyWireBillingOptionMutation,
  useSetUnverifyWireBillingOptionMutation
} from '../../data'
import WireVerificationModalForm from '../WireVerificationModalForm'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'isVerify'>>
}

const displayName = 'WireVerificationModal'
const verifyResponseKey = 'verifyWireBillingOption'
const unverifyResponseKey = 'unverifyWireBillingOption'

const WireVerificationModal: FC<Props> = memo(
  ({ options: { nodeId, isVerify } }) => {
    const { t: translate } = useTranslation('billingDetails')
    const { handleOnSuccess } = useFormSubmission()
    const [setVerifyWireBillingOptionMutation] =
      useSetVerifyWireBillingOptionMutation()
    const [setUnverifyWireBillingOptionMutation] =
      useSetUnverifyWireBillingOptionMutation()
    const handleOnSubmit = isVerify
      ? handleSubmit({
          handleError: handleOnSubmissionError(verifyResponseKey),
          handleSuccess: handleOnSuccess({
            apolloEvent: ApolloContextEvents.wireVerification,
            successMessage: translate(
              'modals.wireVerification.notification.success.verify'
            )
          }),
          responseKey: verifyResponseKey,
          submit: setVerifyWireBillingOptionMutation,
          variables: {
            billingOptionId: nodeId
          }
        })
      : handleSubmit({
          handleError: handleOnSubmissionError(unverifyResponseKey),
          handleSuccess: handleOnSuccess({
            apolloEvent: ApolloContextEvents.wireVerification,
            successMessage: translate(
              'modals.wireVerification.notification.success.unverify'
            )
          }),
          responseKey: unverifyResponseKey,
          submit: setUnverifyWireBillingOptionMutation,
          variables: {
            billingOptionId: nodeId
          }
        })

    return (
      <WireVerificationModalForm
        handleOnSubmit={handleOnSubmit}
        isVerify={isVerify}
      />
    )
  }
)

WireVerificationModal.displayName = displayName

export default WireVerificationModal
