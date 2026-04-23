import { useTranslation } from 'react-i18next'
import React, { ReactNode } from 'react'
import { downloadByUrl } from '@staff-portal/utils'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { useUserContext } from '@staff-portal/billing/src/_lib/context/userContext'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import { translateWithComponent } from '@staff-portal/billing/src/_lib/translation'

import PaymentsHistoryModalForm from '../PaymentsHistoryModalForm'
import { useDownloadRolePaymentHistoryMutation } from '../../data'
import { DownloadRolePaymentHistoryMutation } from '../../data/setDownloadRolePaymentHistory.graphql.types'
import adjustValues from './adjustValues'

const displayName = 'PaymentsHistoryModal'
const responseKey = 'downloadRolePaymentHistory'

type MutationResponse = Exclude<
  DownloadRolePaymentHistoryMutation['downloadRolePaymentHistory'],
  undefined
>

export const PaymentsHistoryModal = () => {
  const { t: translate } = useTranslation('receivedPayments')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const { currentUser } = useUserContext()
  const [setDownloadRolePaymentHistory] = useDownloadRolePaymentHistoryMutation(
    {
      onRootLevelError: handleOnRootLevelError
    }
  )

  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: (_: unknown, response: MutationResponse) => {
      downloadByUrl(response?.downloadUrl ?? '')

      const linkWrapper = ({ children }: { children: ReactNode }) => {
        return (
          <LinkWrapper
            data-testid='memo-invoice-link'
            key={response?.downloadUrl}
            href={response?.downloadUrl}
          >
            {children}
          </LinkWrapper>
        )
      }

      const successMessage = translateWithComponent(
        translate('modals.notifications.success'),
        linkWrapper
      )

      handleOnSuccess({ successMessage })()
    },
    adjustValues,
    responseKey,
    variables: { roleId: currentUser?.id },
    submit: setDownloadRolePaymentHistory
  })

  return <PaymentsHistoryModalForm handleOnSubmit={handleOnSubmit} />
}

PaymentsHistoryModal.displayName = displayName

export default PaymentsHistoryModal
