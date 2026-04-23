import pluralize from 'pluralize'

const getBusinessCopy = (trialLength: number) =>
  `${trialLength} business ${pluralize('day', trialLength)}`

export default getBusinessCopy
