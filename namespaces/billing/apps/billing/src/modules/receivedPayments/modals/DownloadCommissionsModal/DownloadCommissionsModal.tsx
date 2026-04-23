import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { ReactNode } from 'react'
import { downloadByUrl } from '@staff-portal/utils'
import {
  DownloadCommissionsInput,
  CommissionStatus
} from '@staff-portal/graphql/staff'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { translateWithComponent } from '@staff-portal/billing/src/_lib/translation'

import DownloadCommissionsModalForm from '../DownloadCommissionsModalForm'
import { useDownloadCommissionsMutation } from '../../data'
import { DownloadRolePaymentHistoryMutation } from '../../data/setDownloadRolePaymentHistory.graphql.types'
import adjustValues from './adjustValues'

const displayName = 'DownloadCommissionsModal'
const responseKey = 'downloadCommissions'

type MutationResponse = Exclude<
  DownloadRolePaymentHistoryMutation['downloadRolePaymentHistory'],
  undefined
>

export const DownloadCommissionsModal = () => {
  const { t: translate } = useTranslation('receivedPayments')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [setDownloadCommissions] = useDownloadCommissionsMutation({
    onRootLevelError: handleOnRootLevelError
  })

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
    submit: setDownloadCommissions
  })

  return (
    <Form<DownloadCommissionsInput>
      initialValues={{ filter: { commissionStatus: CommissionStatus.PAID } }}
      data-testid={displayName}
      onSubmit={handleOnSubmit}
      keepDirtyOnReinitialize
    >
      <DownloadCommissionsModalForm />
    </Form>
  )
}

DownloadCommissionsModal.displayName = displayName

export default DownloadCommissionsModal
