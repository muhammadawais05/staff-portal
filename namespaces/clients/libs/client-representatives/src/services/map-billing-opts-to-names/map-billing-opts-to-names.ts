import { billingCommunicationOptionLabels } from '../../constants'

export const mapBillingOptsToNames = (
  opt: keyof typeof billingCommunicationOptionLabels
) => billingCommunicationOptionLabels[opt] || opt
