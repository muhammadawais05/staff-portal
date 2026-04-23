import pluralize from 'pluralize'

export const getTrialLengthOptions = () => {
  const options = Array.from(Array(10), (_, item) => {
    const value = item + 1

    return {
      text: `${value} business ${pluralize('day', value)}`,
      value
    }
  }).reverse()

  options.push({
    text: 'No trial',
    value: 0
  })

  return options
}
