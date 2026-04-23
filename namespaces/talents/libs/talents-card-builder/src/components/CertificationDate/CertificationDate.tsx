import { monthYearFormatter } from '@staff-portal/date-time-utils'
import { isNotNullish } from '@staff-portal/utils'
import React from 'react'
interface CertificationDateProps {
  validFromYear?: number | null
  validFromMonth?: number | null
  validToYear?: number | null
  validToMonth?: number | null
}

const CertificationDate = ({
  validFromYear,
  validFromMonth,
  validToYear,
  validToMonth
}: CertificationDateProps) => {
  if (!isNotNullish(validFromYear) || !isNotNullish(validFromMonth)) {
    return null
  }

  const messages = [monthYearFormatter(validFromYear, validFromMonth)]

  if (isNotNullish(validToYear) && isNotNullish(validToMonth)) {
    messages.push(monthYearFormatter(validToYear, validToMonth))
  }

  return <>{messages.join(' – ')}</>
}

export default CertificationDate
