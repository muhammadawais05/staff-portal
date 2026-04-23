import React from 'react'

import { PreviewCertificationType } from '../../types'
import { getCertificationDate } from '../../utils/get-certification-date/get-certification-date'
import HighlightItemPreview from '../HighlightItemPreview/HighlightItemPreview'

interface Props {
  data: PreviewCertificationType
}

const CertificationPreview = ({
  data: {
    certificate,
    institution,
    validFromMonth,
    validFromYear,
    validToMonth,
    validToYear
  }
}: Props) => {
  const title = `${certificate} at ${institution}`
  const startDate = getCertificationDate(validFromMonth, validFromYear)
  const endDate = getCertificationDate(validToMonth, validToYear)

  return (
    <HighlightItemPreview
      title={title}
      startDate={startDate}
      endDate={endDate}
    />
  )
}

export default CertificationPreview
