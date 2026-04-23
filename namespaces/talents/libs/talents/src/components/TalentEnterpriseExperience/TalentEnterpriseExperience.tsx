import React from 'react'

export interface Props {
  yearsOfEnterpriseExperience?: string
}

const formatYearsOfExperience = (yearsStr = '') => {
  const years = Number(yearsStr)

  if (years === 0) {
    return 'No'
  } else if (years < 1) {
    return 'less than a year'
  }

  const roundedYears = Math.round(years)

  return `${roundedYears} year${roundedYears > 1 ? 's' : ''}`
}

const TalentEnterpriseExperience = ({
  yearsOfEnterpriseExperience
}: Props) => {
  return <>{formatYearsOfExperience(yearsOfEnterpriseExperience)}</>
}

export default TalentEnterpriseExperience
