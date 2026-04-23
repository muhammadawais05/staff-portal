import React, { FC, memo, useState } from 'react'
import { Button } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { useNotifications } from '@toptal/picasso/utils'
import { windowOpen } from '@staff-portal/navigation'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { PaymentsFilter, Maybe } from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { OperationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql.types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { getMessagesFromErrors } from '@staff-portal/billing/src/_lib/helpers/apollo'

import { useDownloadPaymentsFromSearchMutation } from '../../data/downloadPaymentsFromSearch.graphql.types'
import { usePaymentListContext } from '../../../../context/PaymentListContext'

const displayName = 'DownloadPayments'

interface Props {
  operation?: OperationItemFragment
  alreadyDownloadedCount?: Maybe<number>
  totalCount?: Maybe<number>
}

const DownloadPayments: FC<Props> = memo<Props>(
  ({ operation, alreadyDownloadedCount, totalCount }) => {
    const [isActionPending, setActionPending] = useState(false)
    const emitMessage = useMessageEmitter()
    const { t: translate } = useTranslation('paymentList')
    const { showError, showSuccess } = useNotifications()
    const { filter: paymentListFilters } = usePaymentListContext()
    const { handleOnRootLevelError, handleOnError } = useFormSubmission()
    const [subscribeDownloadPaymentsFromSearchMutation] =
      useDownloadPaymentsFromSearchMutation({
        onError: handleOnError,
        onRootLevelError: handleOnRootLevelError
      })
    const actionTextKey = 'header.actions.downloadPayments'
    const isMessageVisible =
      alreadyDownloadedCount &&
      totalCount &&
      alreadyDownloadedCount !== totalCount
    const submitDownloadRequest = (filter: PaymentsFilter) => async () => {
      setActionPending(true)
      const result = await subscribeDownloadPaymentsFromSearchMutation({
        variables: {
          input: {
            filter
          }
        }
      })
      const responseObject = result?.data?.downloadPaymentsFromSearch

      if (responseObject?.success) {
        if (isMessageVisible) {
          showSuccess(
            translate(`${actionTextKey}.previouslyDownloaded` as const, {
              alreadyDownloadedCount,
              totalCount
            })
          )
        }

        if (responseObject?.reportUrl) {
          windowOpen(responseObject.reportUrl)
        }

        if (responseObject?.reportGenerationScheduled) {
          showSuccess(translate(`${actionTextKey}.reportTooLarge` as const))
        }

        emitMessage(ApolloContextEvents.paymentDownloadFromSearch)
      } else {
        showError(getMessagesFromErrors({ errors: responseObject?.errors }))
      }
      setActionPending(false)
    }

    return (
      <OperationWrapper
        operation={operation}
        enabledText={translate(`${actionTextKey}.tooltip` as const)}
        isLoading={isActionPending}
      >
        <Button
          data-testid={displayName}
          onClick={submitDownloadRequest(paymentListFilters)}
          size='small'
        >
          {translate(`${actionTextKey}.label` as const)}
        </Button>
      </OperationWrapper>
    )
  }
)

DownloadPayments.displayName = displayName

export default DownloadPayments
