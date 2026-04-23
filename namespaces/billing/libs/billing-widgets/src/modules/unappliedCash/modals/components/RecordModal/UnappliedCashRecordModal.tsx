import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleSubmit,
  handleOnSubmissionError
} from '@staff-portal/billing/src/_lib/form/handlers'
import { getCurrentDayAsJSDate } from '@staff-portal/billing/src/_lib/dateTime'

import UnappliedCashRecordModalForm from '../ModalForm'
import { useRecordUnappliedCashMutation } from '../../data'
import adjustValues from '../../utils'

interface Props {
  options: Required<ModalData>
  handleOnClose?: () => void
}

const displayName = 'UnappliedCashRecordModal'
const responseKey = 'recordUnappliedCash'

const UnappliedCashRecordModal: FC<Props> = memo(
  ({ options: { clientId }, handleOnClose }) => {
    const { t: translate } = useTranslation(['billingDetails', 'common'])
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
    const [recordUnappliedCash] = useRecordUnappliedCashMutation({
      onRootLevelError: handleOnRootLevelError
    })

    const title = translate('billingDetails:modals.recordUnappliedCash.title')

    const initialValues = {
      effectiveDate: getCurrentDayAsJSDate(),
      clientId
    }

    return (
      <UnappliedCashRecordModalForm
        handleOnSubmit={handleSubmit({
          handleError: handleOnSubmissionError(responseKey),
          handleSuccess: () => {
            handleOnSuccess({
              apolloEvent: ApolloContextEvents.unappliedCashRecord,
              successMessage: translate(
                'billingDetails:actions.recordUnappliedCash.notification.success'
              ),
              outboundEvent: { key: 'unapplied-cash:record' }
            })()
            handleOnClose?.()
          },
          responseKey,
          adjustValues,
          submit: recordUnappliedCash
        })}
        handleOnClose={handleOnClose}
        initialValues={initialValues}
        title={title}
        submitButtonText={translate('common:actions.create')}
      />
    )
  }
)

UnappliedCashRecordModal.displayName = displayName

export default UnappliedCashRecordModal
