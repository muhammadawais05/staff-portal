import {
  BillCycle,
  EngagementRateMethodEnum,
  NewEngagementWizardStep
} from '@staff-portal/graphql/staff'

import { CandidateSendingStepAttributes } from '../../types'

export const MONTHLY_CYCLES = [BillCycle.MONTHLY, BillCycle.SEMI_MONTHLY]

const adjustDetailsStepFormValues = ({
  markup,
  billCycle,
  billDay,
  rateMethod,
  rateOverrideReason,
  ...restStepAttributes
}: NonNullable<
  CandidateSendingStepAttributes<NewEngagementWizardStep.DETAILS>
>) => {
  const isMonthlyCycle = billCycle ? MONTHLY_CYCLES.includes(billCycle) : false

  const sanitizedStepAttributes = {
    ...restStepAttributes,
    billCycle,
    rateMethod,
    rateOverrideReason:
      rateMethod === EngagementRateMethodEnum.DEFAULT
        ? null
        : rateOverrideReason,
    billDay: isMonthlyCycle ? null : billDay,
    markup: markup ? parseInt(markup) : null
  }

  // We have to remove internal `billCycleConfirmed` field of the Details step form.
  // This field is used for confirmation question and is used for form validation.
  // But we do not need to store value of this fields as attributes
  delete sanitizedStepAttributes.billCycleConfirmed

  return sanitizedStepAttributes
}

export default adjustDetailsStepFormValues
