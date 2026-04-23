import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { isCallableEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'

import BillingCycleSettingsModalContent from '../BillingCycleSettingsModalContent'
import { useGetBillingCycleSettingsData } from '../../data/use-get-billing-cycle-settings-data'

const displayName = 'BillingCycleSettingsModal'

interface Props {
  options: Required<ModalData>
}

export const BillingCycleSettingsModal: FC<Props> = memo(
  ({ options: { engagementId } }) => {
    const { t: translate } = useTranslation(['billingCycleSettings', 'common'])

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

    return (
      <ContentLoader
        isModalContainer={isCallableEnabled(
          changeProductBillingFrequencyOperation?.callable
        )}
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <ModalSkeleton
            title={translate('billingCycleSettings:updateModal.title')}
          />
        }
      >
        <BillingCycleSettingsModalContent
          engagementId={engagementId}
          billCycle={billCycle}
          billDay={billDay}
          billingCycles={billingCycles}
          semiMonthlyPaymentTalentAgreement={semiMonthlyPaymentTalentAgreement}
          jobAutoConsolidationEnabled={job?.autoConsolidationEnabled}
          jobNetTerms={job?.client?.netTerms}
          changeProductBillingFrequencyOperation={
            changeProductBillingFrequencyOperation
          }
        />
      </ContentLoader>
    )
  }
)

BillingCycleSettingsModal.displayName = displayName

export default BillingCycleSettingsModal
