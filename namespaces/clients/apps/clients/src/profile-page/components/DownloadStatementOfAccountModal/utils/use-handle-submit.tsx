import React, { ComponentProps } from 'react'
import { Link } from '@staff-portal/navigation'
import { MutationTuple } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { downloadByUrl } from '@staff-portal/utils'
import { DownloadForPeriodModal } from '@staff-portal/facilities'

import {
  DownloadStatementsOfAccountMutation,
  DownloadStatementsOfAccountMutationVariables
} from '../data/download-statement-of-account.staff.gql.types'

type HandleSubmitCallback = ComponentProps<
  typeof DownloadForPeriodModal
>['onSubmit']

export type MutationCallback = MutationTuple<
  DownloadStatementsOfAccountMutation,
  DownloadStatementsOfAccountMutationVariables
>[0]

const useHandleSubmit = (
  downloadDocument: MutationCallback,
  companyId: string,
  hideModal: () => void
): HandleSubmitCallback => {
  const { handleMutationResult } = useHandleMutationResult()

  return async formData => {
    const { data } = await downloadDocument({
      variables: {
        input: {
          roleOrClientId: companyId,
          ...formData
        }
      }
    })

    const downloadUrl = data?.downloadStatementOfAccount?.downloadUrl ?? ''

    return handleMutationResult({
      mutationResult: data?.downloadStatementOfAccount,
      successNotificationMessage: (
        <>
          Your download should begin momentarily. Please do not refresh the
          page. If for some reason the download doesn't initiate, please click{' '}
          <Link href={downloadUrl}>this link</Link> to download the document
          manually.
        </>
      ),
      successNotificationOptions: {
        persist: true
      },
      onSuccessAction: () => {
        downloadByUrl(downloadUrl)
        hideModal()
      }
    })
  }
}

export default useHandleSubmit
