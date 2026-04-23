import pluralize from 'pluralize'

import getRequiredJobHours from '../get-required-job-hours'

const getRequiredJobHoursVerbose = (props: {
  commitment?: string | null
  expectedWeeklyHours?: number | null
}) => {
  const hours = getRequiredJobHours(props)

  if (hours) {
    return pluralize('hour', hours, true)
  }
}

export default getRequiredJobHoursVerbose
