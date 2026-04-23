import { Form, FormRenderProps } from '@toptal/picasso-forms'
import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BillCycle,
  ChangeProductBillingFrequencyInput,
  Operation,
  WeekDay,
  Maybe
} from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  getCurrentTime,
  isIntervalContains
} from '@staff-portal/billing/src/_lib/dateTime'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { isCallableEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'
import AlertModal from '@staff-portal/billing/src/components/AlertModal'

import { BillingCyclesItemFragment } from '../../../__fragments__/billingCyclesFragment.graphql.types'
import BillingCycleSettingsModalForm from '../BillingCycleSettingsModalForm'
import { adjustValues, validator } from './utils'
import { useSetChangeProductBillingFrequencyMutation } from '../../data/setChangeProductBillingFrequency.graphql.types'

const RESPONSE_KEY = 'changeProductBillingFrequency'
const ENGAGEMENT_TYPE = 'engagement'

interface Props {
  engagementId: string
  billCycle?: Maybe<BillCycle>
  billDay?: Maybe<WeekDay>
  billingCycles: BillingCyclesItemFragment[]
  semiMonthlyPaymentTalentAgreement?: boolean
  jobAutoConsolidationEnabled?: boolean
  jobNetTerms?: number
  changeProductBillingFrequencyOperation?: Operation
}

const BillingCycleSettingsModalContent: FC<Props> = memo(
  ({
    engagementId,
    billCycle,
    billDay,
    billingCycles,
    semiMonthlyPaymentTalentAgreement,
    jobAutoConsolidationEnabled,
    jobNetTerms,
    changeProductBillingFrequencyOperation
  }) => {
    const encodedEngagementId = encodeId({
      id: engagementId,
      type: ENGAGEMENT_TYPE
    })

    const { t: translate } = useTranslation(['billingCycleSettings', 'common'])
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()

    const [changeProductBillingFrequencyGatewayMutation] =
      useSetChangeProductBillingFrequencyMutation({
        onRootLevelError: handleOnRootLevelError
      })

    const isEnabled = isCallableEnabled(
      changeProductBillingFrequencyOperation?.callable
    )

    if (!isEnabled) {
      return (
        <AlertModal
          message={
            changeProductBillingFrequencyOperation?.messages?.length
              ? changeProductBillingFrequencyOperation.messages.join('\n\n')
              : translate('common:actionUnavailable')
          }
          title={translate('billingCycleSettings:updateModal.title')}
        />
      )
    }

    const initialValues: ChangeProductBillingFrequencyInput = {
      billCycle: billCycle ?? BillCycle.BI_WEEKLY,
      billDay: billDay || WeekDay.SUNDAY,
      engagementId: encodedEngagementId
    }
    const lastCycle = billingCycles[0] || null
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

    const renderForm = (
      formProps: FormRenderProps<ChangeProductBillingFrequencyInput>
    ) => (
      <BillingCycleSettingsModalForm
        formProps={formProps}
        autoConsolidationEnabled={!!jobAutoConsolidationEnabled}
        netTerms={jobNetTerms}
        semiMonthlyPaymentTalentAgreement={semiMonthlyPaymentTalentAgreement}
        currentCycleStartDate={currentCycleStartDate}
      />
    )

    return (
      <Form
        initialValues={initialValues}
        validate={validator({
          currentCycleStartDate,
          semiMonthlyPaymentTalentAgreement
        })}
        onSubmit={handleSubmit({
          adjustValues,
          handleError: handleOnSubmissionError(RESPONSE_KEY),
          handleSuccess: handleOnSuccess({
            apolloEvent: ApolloContextEvents.billingCycleChange,
            outboundEvent: { key: 'billing_cycle_settings:changed' },
            successMessage: translate(
              'billingCycleSettings:notification.success.update'
            )
          }),
          responseKey: RESPONSE_KEY,
          submit: changeProductBillingFrequencyGatewayMutation
        })}
        render={renderForm}
      />
    )
  }
)

export default BillingCycleSettingsModalContent
