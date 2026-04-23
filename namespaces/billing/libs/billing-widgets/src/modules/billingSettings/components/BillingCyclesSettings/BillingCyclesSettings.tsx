import React, { FC, memo } from 'react'
import { Typography, Section, SectionProps } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import {
  BillCycle,
  ChangeProductBillingFrequencyInput,
  WeekDay
} from '@staff-portal/graphql/staff'
import Divider from '@staff-portal/billing/src/components/Divider'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import InlineForm from '@staff-portal/billing/src/components/InlineForm'
import {
  getCurrentTime,
  isIntervalContains
} from '@staff-portal/billing/src/_lib/dateTime'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { isCallableHidden } from '@staff-portal/billing/src/_lib/helpers/operations'

import {
  adjustValues,
  validator
} from '../../../billingCycleSettings/components/BillingCycleSettingsModalContent/utils'
import BillingCyclesSettingsSkeleton from './Skeleton'
import BillingCyclesSettingsForm from '../BillingCyclesSettingsForm'
import {
  useGetBillingCycleSettingsData,
  useSetChangeProductBillingFrequencyMutation
} from '../../../billingCycleSettings/data'

const displayName = 'BillingCyclesSettings'
const responseKey = 'changeProductBillingFrequency'

interface Props {
  engagementId: string
  variant?: SectionProps['variant']
}

const BillingCyclesSettings: FC<Props> = memo<Props>(
  ({ engagementId, variant = 'default' }) => {
    const { t: translate } = useTranslation('billingSettings')
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()

    const id = encodeId({
      id: engagementId,
      type: 'engagement'
    })

    const {
      job,
      billCycle,
      billDay,
      semiMonthlyPaymentTalentAgreement,
      changeProductBillingFrequencyOperation,
      billingCycles,
      loading,
      initialLoading
    } = useGetBillingCycleSettingsData(engagementId)

    const [changeProductBillingFrequencyGatewayMutation] =
      useSetChangeProductBillingFrequencyMutation({
        onRootLevelError: handleOnRootLevelError
      })

    const lastCycle = billingCycles?.[0] || null
    const hasCycleStartDate =
      lastCycle &&
      isIntervalContains({
        date: getCurrentTime(),
        end: lastCycle.endDate,
        start: lastCycle.startDate
      })
    const currentCycleStartDate = hasCycleStartDate
      ? lastCycle.startDate
      : undefined

    const hideBillingCyclesEdit = isCallableHidden(
      changeProductBillingFrequencyOperation?.callable
    )

    if (hideBillingCyclesEdit) {
      return null
    }

    return (
      <Section
        variant={variant}
        data-testid='billing-settings-edit'
        title={translate('billingSettingsEdit.title')}
      >
        <ContentLoader
          loading={loading}
          showSkeleton={initialLoading}
          skeletonComponent={<BillingCyclesSettingsSkeleton />}
        >
          <>
            <Divider />
            <InlineForm<ChangeProductBillingFrequencyInput>
              label={
                <Typography size='medium'>
                  {translate(
                    'billingSettingsEdit.table.changeBillingCycleSettings.label'
                  )}
                </Typography>
              }
              operation={changeProductBillingFrequencyOperation}
              validate={validator({
                currentCycleStartDate,
                semiMonthlyPaymentTalentAgreement
              })}
              onSubmit={handleSubmit({
                handleError: handleOnSubmissionError(responseKey),
                handleSuccess: handleOnSuccess({
                  apolloEvent: ApolloContextEvents.billingCycleChange,
                  successMessage: translate(
                    'notification.updateBillingCycles.success'
                  )
                }),
                adjustValues,
                responseKey,
                submit: changeProductBillingFrequencyGatewayMutation
              })}
              initialValues={{
                billCycle: billCycle ?? BillCycle.BI_WEEKLY,
                billDay: billDay ?? WeekDay.SUNDAY,
                engagementId: id
              }}
              editComponent={
                <BillingCyclesSettingsForm
                  autoConsolidationEnabled={job?.autoConsolidationEnabled}
                  netTerms={job?.client?.netTerms}
                  semiMonthlyPaymentTalentAgreement={
                    semiMonthlyPaymentTalentAgreement
                  }
                  currentCycleStartDate={currentCycleStartDate}
                />
              }
            />
            <Divider />
          </>
        </ContentLoader>
      </Section>
    )
  }
)

BillingCyclesSettings.displayName = displayName

export default BillingCyclesSettings
