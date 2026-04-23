import React from 'react'
import { isNumber } from '@toptal/picasso/utils'

export interface Props {
  yearsOfManagementExperience?: number
  cumulativeReportRange?: {
    from?: number | null
    to?: number | null
  } | null
}

const TalentLeadership = ({
  yearsOfManagementExperience,
  cumulativeReportRange
}: Props) => {
  const raportRange =
    isNumber(cumulativeReportRange?.from) && isNumber(cumulativeReportRange?.to)
      ? ` (${cumulativeReportRange?.from} to ${cumulativeReportRange?.to} reports)`
      : ''

  return (
    <>
      {yearsOfManagementExperience
        ? `${yearsOfManagementExperience} years${raportRange}`
        : 'No'}
    </>
  )
}

export default TalentLeadership
