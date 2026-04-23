import React from 'react'
import { Section } from '@toptal/picasso'
import { SubSection } from '@staff-portal/ui'
import { DEFAULT_DISCOUNT_MULTIPLIER } from '@staff-portal/billing'

import {
  PaymentsDetails,
  PaymentsRateTable,
  PaymentsBillingSubSection
} from './components'
import {
  DetailsStepPaymentsJobFragment,
  DetailsStepPaymentsTalentFragment,
  DetailsStepNewEngagementFragment
} from '../../data/get-details-step-data'

type Props = {
  hasInitialBillCycle?: boolean
  hasInitialBillDay?: boolean
  job?: DetailsStepPaymentsJobFragment | null
  talent?: DetailsStepPaymentsTalentFragment | null
  newEngagement?: DetailsStepNewEngagementFragment | null
  commitmentSettingsHoursOptions: number[]
  mostRecentEngageableApplication?: {
    baseHourlyRate?: string | null
    requestedHourlyRate?: string | null
  }
}

const PaymentsSection = ({
  hasInitialBillCycle,
  hasInitialBillDay,
  job,
  talent,
  newEngagement,
  commitmentSettingsHoursOptions,
  mostRecentEngageableApplication
}: Props) => {
  if (!job || !talent || !newEngagement) {
    return null
  }

  return (
    <Section
      variant='withHeaderBar'
      title='Payments'
      data-testid='payments-section'
    >
      <SubSection>
        <PaymentsDetails
          client={job.client}
          talent={talent}
          defaultMarkup={newEngagement.defaultMarkup}
          defaultPartTimeDiscount={newEngagement.defaultPartTimeDiscount}
          defaultFullTimeDiscount={newEngagement.defaultFullTimeDiscount}
        />
      </SubSection>

      <SubSection>
        <PaymentsRateTable
          canBeDiscounted={newEngagement.canBeDiscounted ?? false}
          commitment={newEngagement.commitment}
          discountMultiplier={
            newEngagement.discountMultiplier ?? DEFAULT_DISCOUNT_MULTIPLIER
          }
          defaultUpcharge={newEngagement.defaultUpcharge}
          mostRecentEngageableApplication={mostRecentEngageableApplication}
          talent={talent}
        />
      </SubSection>

      <SubSection last>
        <PaymentsBillingSubSection
          commitmentSettingsHoursOptions={commitmentSettingsHoursOptions}
          commitmentSettingsApplicable={
            job.vertical?.commitmentSettingsApplicable
          }
          semiMonthlyBilling={job.semiMonthlyBilling ?? false}
          talentProfileLink={talent.profileLink}
          talentType={talent.type}
          hasInitialBillCycle={hasInitialBillCycle}
          hasInitialBillDay={hasInitialBillDay}
        />
      </SubSection>
    </Section>
  )
}

export default PaymentsSection
