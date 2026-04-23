/**
 * TODO: Replace with paymentResolutionTypes enum
 * https://toptal-core.atlassian.net/browse/SPB-3117
 */
export const getResolutionAmountLabel = (paymentResolutionType: string) =>
  `${
    paymentResolutionType === 'Void' ? 'Payment' : paymentResolutionType
  } resolution amount`
