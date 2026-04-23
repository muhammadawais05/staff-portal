/**
 * TODO: Replace with paymentResolutionTypes enum
 * https://toptal-core.atlassian.net/browse/SPB-3117
 */
export const getInitialAskLabel = (paymentResolutionType: string) =>
  `Initial ${paymentResolutionType === 'Refund' ? 'refund' : 'credit'} ask`
