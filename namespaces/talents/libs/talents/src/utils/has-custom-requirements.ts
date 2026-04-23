import { CustomRequirements } from '../types'

export const POSSIBLE_REQUIREMENTS = [
  'backgroundCheck',
  'drugTest',
  'timeTrackingTools'
] as const

export const hasCustomRequirements = (
  customRequirements?: CustomRequirements
) => {
  return (
    !!customRequirements &&
    POSSIBLE_REQUIREMENTS.some(item => customRequirements[item])
  )
}
