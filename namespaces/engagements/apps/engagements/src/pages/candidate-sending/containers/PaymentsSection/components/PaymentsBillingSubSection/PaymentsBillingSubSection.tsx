import React from 'react'
import { DetailedList as DL } from '@staff-portal/ui'
import { useField } from '@toptal/picasso-forms'
import { Alert } from '@toptal/picasso'

import { LABEL_COLUMN_WIDTH } from '../../../../config'
import { MONTHLY_CYCLES } from '../../../../utils'
import { CandidateSendingDetailsStepAttributes } from '../../../../types'
import {
  ClientNetTermsItem,
  BillCycleItem,
  BillDayItem,
  CommitmentCreateHoursItem,
  StartDateItem,
  TimeZoneNameItem,
  BillCycleConfirmationItem
} from './components'

export type Props = {
  commitmentSettingsHoursOptions?: number[]
  commitmentSettingsApplicable?: boolean | null
  talentProfileLink?: {
    url?: string | null
    text: string
  } | null
  talentType: string
  hasInitialBillCycle?: boolean
  hasInitialBillDay?: boolean
  semiMonthlyBilling?: boolean
}

const PaymentsBillingSubSection = ({
  commitmentSettingsHoursOptions,
  commitmentSettingsApplicable,
  talentProfileLink,
  talentType,
  hasInitialBillCycle,
  hasInitialBillDay,
  semiMonthlyBilling
}: Props) => {
  const {
    input: { value: billCycle }
  } = useField<CandidateSendingDetailsStepAttributes['billCycle']>('billCycle')

  const isMonthlyCycle = billCycle ? MONTHLY_CYCLES.includes(billCycle) : false

  return (
    <DL
      labelColumnWidth={LABEL_COLUMN_WIDTH}
      itemPadding='small'
      striped={false}
      divided={false}
      titleCaseLabels={false}
    >
      <ClientNetTermsItem />

      <BillCycleItem hasInitialValue={hasInitialBillCycle} />

      <BillDayItem
        hasInitialValue={hasInitialBillDay}
        isMonthlyCycle={isMonthlyCycle}
      />

      <CommitmentCreateHoursItem
        commitmentSettingsHoursOptions={commitmentSettingsHoursOptions}
        commitmentSettingsApplicable={commitmentSettingsApplicable}
      />

      {semiMonthlyBilling && !isMonthlyCycle && (
        <Alert>
          Semi-monthly billing was set to required in the Job Description.
        </Alert>
      )}

      <BillCycleConfirmationItem
        talentProfileLink={talentProfileLink}
        isMonthlyCycle={isMonthlyCycle}
        talentType={talentType}
      />

      <StartDateItem talentType={talentType} />

      <TimeZoneNameItem talentType={talentType} />
    </DL>
  )
}

export default PaymentsBillingSubSection
