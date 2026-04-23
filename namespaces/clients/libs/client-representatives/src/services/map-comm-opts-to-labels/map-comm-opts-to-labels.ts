import { communicationOptionLabels } from '../../constants'

export const mapCommOptsToLabels = (
  opt: keyof typeof communicationOptionLabels
) => communicationOptionLabels[opt] || opt
