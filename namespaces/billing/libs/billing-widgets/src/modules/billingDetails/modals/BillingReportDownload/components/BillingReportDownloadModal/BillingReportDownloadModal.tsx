import React, { FC, memo } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { downloadByUrl } from '@staff-portal/utils'
import { DownloadClientBillingReportInput } from '@staff-portal/graphql/staff'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import i18n from '@staff-portal/billing/src/utils/i18n'

import { useSetDownloadClientBillingReportMutation } from '../../data'
import { SetDownloadClientBillingReportMutation } from '../../data/setDownloadClientBillingReport.graphql.types'
import BillingReportDownloadModalForm from '../BillingReportDownloadModalForm'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

const displayName = 'BillingReportDownloadModal'
const responseKey = 'downloadClientBillingReport'

const BillingReportDownloadModal: FC<Props> = memo(
  ({ options: { nodeId } }) => {
    const { t: translate } = useTranslation('billingDetails')
    const { handleOnSuccess } = useFormSubmission()
    const [setDownloadClientBillingReport] =
      useSetDownloadClientBillingReportMutation()
    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: (
        input: DownloadClientBillingReportInput,
        response: SetDownloadClientBillingReportMutation['downloadClientBillingReport']
      ) => {
        const downloadUrl = response?.downloadUrl

        if (downloadUrl) {
          downloadByUrl(downloadUrl)
        }

        const successMessage = (
          <Trans
            i18n={i18n}
            t={translate}
            i18nKey='modals.billingReportDownload.notification.success'
            components={[<LinkWrapper key='downloadLink' href={downloadUrl} />]}
          />
        )

        return handleOnSuccess({
          successMessage,
          successMessageOptions: {
            persist: true
          }
        })()
      },
      responseKey,
      submit: setDownloadClientBillingReport,
      variables: {
        clientId: nodeId
      }
    })

    return <BillingReportDownloadModalForm handleOnSubmit={handleOnSubmit} />
  }
)

BillingReportDownloadModal.displayName = displayName

export default BillingReportDownloadModal
