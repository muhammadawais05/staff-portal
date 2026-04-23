import React from 'react'
import { Typography } from '@toptal/picasso'
import pluralize from 'pluralize'

import { ProfileEmployment } from '../../types'

// eslint-disable-next-line @miovision/disallow-date/no-new-date
const getCurrentYear = () => new Date().getFullYear()

const workingPeriod = (startDate: number, endDate?: number | null) => {
  if (startDate === endDate) {
    return startDate
  }

  return `${startDate} – ${endDate || 'Present'}`
}

export interface EmploymentDescriptionProps {
  employment: ProfileEmployment
}

const EmploymentDescription = ({ employment }: EmploymentDescriptionProps) => {
  const numYears =
    (employment.endDate || getCurrentYear()) - employment.startDate

  const messages = [
    employment.company,
    workingPeriod(employment.startDate, employment.endDate)
  ]

  if (numYears > 0) {
    messages.push(pluralize('year', numYears))
  }

  return (
    <Typography size='xsmall' color='dark-grey'>
      {messages.join(' · ')}
    </Typography>
  )
}

export default EmploymentDescription
