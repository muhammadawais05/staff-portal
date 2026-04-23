import { TalentFragment } from '@staff-portal/talents'

const paymentsHoldButtonText = (
  paymentsHoldDescription: TalentFragment['paymentsHoldDescription']
) =>
  paymentsHoldDescription?.length ? 'Update Hold on Payments' : 'Hold Payments'

export default paymentsHoldButtonText
