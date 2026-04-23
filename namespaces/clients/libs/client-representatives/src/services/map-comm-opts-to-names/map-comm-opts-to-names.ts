import { communicationOptionNames } from '../../constants'

export const mapCommOptsToNames = (
  opt: keyof typeof communicationOptionNames
) => communicationOptionNames[opt] || opt
