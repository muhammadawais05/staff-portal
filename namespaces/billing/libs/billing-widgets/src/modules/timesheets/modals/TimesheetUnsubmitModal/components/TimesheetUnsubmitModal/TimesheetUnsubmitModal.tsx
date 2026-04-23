import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { WatchQueryFetchPolicy } from '@apollo/client'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ModalSkeleton } from '@staff-portal/ui'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { isOperationEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'

import { BillingCycleItemFragment } from '../../../../../__fragments__/billingCycleItemFragment.graphql.types'
import { useGetBillingCycleQuery } from '../../../../data/getBillingCycle.graphql.types'
import TimesheetUnsubmitModalForm from '../TimesheetUnsubmitModalForm'
import { useSetTimesheetUnsubmitMutation } from '../../data/setTimesheetUnsubmit.graphql.types'

const displayName = 'TimesheetUnsubmitModal'

interface Props {
  options: Required<ModalData>
}

const responseKey = 'unsubmitTimesheet'

const TimesheetUnsubmitModal: FC<Props> = memo(({ options }) => {
  const billingCycleId = encodeId({
    type: 'billingCycle',
    id: options.billingCycleId
  })
  const { t: translate } = useTranslation('timesheet')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [setTimesheetUnsubmitMutation] = useSetTimesheetUnsubmitMutation({
    onRootLevelError: handleOnRootLevelError
  })

  const { data, loading, initialLoading } = useGetBillingCycleQuery({
    fetchPolicy: 'cache-and-network' as WatchQueryFetchPolicy,
    variables: {
      billingCycleId
    }
  })

  const billingCycle = (data?.billingCycle || {}) as BillingCycleItemFragment
  const { timesheetSubmitted, operations } = billingCycle

  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: handleOnSuccess({
      apolloEvent: ApolloContextEvents.timesheetUnsubmit,
      successMessage: translate('notification.success.unsubmit'),
      outboundEvent: { key: 'timesheet-unsubmit', payload: { billingCycleId } }
    }),
    responseKey,
    submit: setTimesheetUnsubmitMutation,
    spreadInputProps: true
  })

  const initialValues = {
    comment: '',
    billingCycleId
  }

  const { handleOnCloseModal } = useModals()
  const canUnsubmit =
    timesheetSubmitted &&
    isOperationEnabled({ operations, key: 'timesheetUnsubmit' })

  if (!loading && !canUnsubmit) {
    handleOnCloseModal()

    return null
  }

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <ModalSkeleton title={translate('UnsubmitTimesheet.title')} />
      }
    >
      <TimesheetUnsubmitModalForm
        handleOnSubmit={handleOnSubmit}
        initialValues={initialValues}
        billingCycle={billingCycle}
      />
    </ContentLoader>
  )
})

TimesheetUnsubmitModal.displayName = displayName

export default TimesheetUnsubmitModal
