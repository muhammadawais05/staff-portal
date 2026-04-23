import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { Container } from '@toptal/picasso'
import { WatchQueryFetchPolicy } from '@apollo/client'
import { AnyObject } from '@toptal/picasso-forms'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { isOperationEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'

import { BillingCycleItemFragment } from '../../../../../__fragments__/billingCycleItemFragment.graphql.types'
import TimesheetModalView from '../TimesheetModalView'
import TimesheetModalForm from '../TimesheetModalForm'
import TimesheetModalTitle from '../../../components/TimesheetModalTitle'
import { useSetTimesheetSubmitMutation } from '../../data/setTimesheetSubmit.graphql.types'
import { useSetTimesheetUpdateMutation } from '../../data/setTimesheetUpdate.graphql.types'
import { useGetBillingCycleQuery } from '../../../../data/getBillingCycle.graphql.types'
import {
  getTimesheetInputEmptyInitValues,
  getTimesheetInputInitValues,
  getTimesheetSubmitChanges
} from '../../../../utils/timesheet'
import { TimesheetModalFormInput } from '../TimesheetModalForm/TimesheetModalForm'

interface Props {
  options: Required<ModalData>
}

const displayName = 'TimesheetModal'

const TimesheetModal: FC<Props> = memo(({ options }) => {
  const billingCycleId = encodeId({
    type: 'billingCycle',
    id: options.billingCycleId
  })
  const { t: translate } = useTranslation('timesheet')
  const { data, loading, initialLoading } = useGetBillingCycleQuery({
    fetchPolicy: 'cache-and-network' as WatchQueryFetchPolicy,
    variables: {
      billingCycleId
    }
  })

  const timesheet = (data?.billingCycle || {}) as BillingCycleItemFragment

  const {
    breaksPeriod = [],
    endDate,
    startDate,
    operations,
    timesheetComment,
    timesheetRecords = []
  } = timesheet

  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [setTimesheetUpdateMutation] = useSetTimesheetUpdateMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const [setTimesheetSubmitMutation] = useSetTimesheetSubmitMutation({
    onRootLevelError: handleOnRootLevelError
  })

  const handleOnSubmit = (values: AnyObject) => {
    const isSubmit = values.action === 'submitTimesheet'

    const submitTimesheet = handleSubmit({
      handleError: handleOnSubmissionError('submitTimesheet'),
      handleSuccess: handleOnSuccess({
        apolloEvent: ApolloContextEvents.timesheetSubmit,
        successMessage: translate('notification.success.save'),
        outboundEvent: {
          key: 'timesheet-submit',
          payload: { billingCycleId }
        }
      }),
      responseKey: 'submitTimesheet',
      submit: setTimesheetSubmitMutation,
      spreadInputProps: true,
      adjustValues: getTimesheetSubmitChanges
    })

    const updateTimesheet = handleSubmit({
      handleError: handleOnSubmissionError('updateTimesheet'),
      handleSuccess: () => {
        handleOnSuccess({
          apolloEvent: ApolloContextEvents.timesheetUpdate,
          successMessage: !isSubmit && translate('notification.success.save'),
          outboundEvent: {
            key: 'timesheet-update',
            payload: { billingCycleId }
          }
        })()

        if (isSubmit) {
          submitTimesheet(values)
        }
      },
      responseKey: 'updateTimesheet',
      submit: setTimesheetUpdateMutation,
      spreadInputProps: true,
      adjustValues: getTimesheetSubmitChanges
    })

    return updateTimesheet(values)
  }

  const timesheetRecordsInitialValues = !timesheetRecords.length
    ? getTimesheetInputEmptyInitValues(startDate, endDate, breaksPeriod)
    : getTimesheetInputInitValues(timesheetRecords, breaksPeriod)

  const initialValues: TimesheetModalFormInput = {
    timesheetComment: timesheetComment || '',
    timesheetRecords: timesheetRecordsInitialValues,
    billingCycleId,
    action: ''
  }

  const canEdit = isOperationEnabled({ operations, key: 'timesheetUpdate' })

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<ModalSkeleton title={translate('Timesheet.title')} />}
    >
      <Container data-testid={displayName}>
        <TimesheetModalTitle timesheet={timesheet}>
          {translate('Timesheet.title')}
        </TimesheetModalTitle>
        {canEdit ? (
          <TimesheetModalForm
            timesheet={timesheet}
            initialValues={initialValues}
            handleOnSubmit={handleOnSubmit}
          />
        ) : (
          <TimesheetModalView
            timesheet={timesheet}
            timesheetRecords={timesheetRecordsInitialValues}
          />
        )}
      </Container>
    </ContentLoader>
  )
})

TimesheetModal.displayName = displayName

export default TimesheetModal
