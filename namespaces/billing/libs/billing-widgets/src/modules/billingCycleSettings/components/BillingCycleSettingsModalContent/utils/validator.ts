import { AnyObject } from '@toptal/picasso-forms'
import {
  BillCycle,
  ChangeProductBillingFrequencyInput,
  Scalars
} from '@staff-portal/graphql/staff'

import isBillingCycleTooLong from '../../BillingCycleSettingsModalForm/isBillingCycleTooLong'

interface Validator {
  semiMonthlyPaymentTalentAgreement?: boolean
  currentCycleStartDate?: Scalars['Date']
}

const validator =
  ({ semiMonthlyPaymentTalentAgreement, currentCycleStartDate }: Validator) =>
  ({ billCycle, currentCycleEndDate }: ChangeProductBillingFrequencyInput) => {
    const formError: AnyObject = {}

    if (
      billCycle === BillCycle.SEMI_MONTHLY &&
      !semiMonthlyPaymentTalentAgreement
    ) {
      formError.billCycle = ''
    }

    if (isBillingCycleTooLong(currentCycleStartDate, currentCycleEndDate)) {
      formError.currentCycleEndDate = ''
    }

    return formError
  }

export default validator
