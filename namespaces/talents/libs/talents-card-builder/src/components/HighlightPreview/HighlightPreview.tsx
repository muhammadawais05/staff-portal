import React, { memo } from 'react'

import { PreviewHighlightType } from '../../types'
import CertificationPreview from '../CertificationPreview/CertificationPreview'
import EducationPreview from '../EducationPreview/EducationPreview'
import EmploymentPreview from '../EmploymentPreview/EmploymentPreview'
import MentorshipPreview from '../MentorshipPreview/MentorshipPreview'
import PortfolioPreview from '../PortfolioPreview/PortfolioPreview'
import PublicationPreview from '../PublicationPreview/PublicationPreview'

interface Props {
  fullName: string
  highlight: PreviewHighlightType
  sortable?: boolean
}

const HighlightPreview = ({ fullName, highlight, sortable }: Props) => {
  switch (highlight.type) {
    case 'certification':
      return <CertificationPreview data={highlight} />
    case 'education':
      return <EducationPreview data={highlight} />
    case 'employment':
      return <EmploymentPreview sortable={sortable} data={highlight} />
    case 'mentorship':
      return <MentorshipPreview fullName={fullName} />
    case 'portfolio':
      return <PortfolioPreview data={highlight} />
    case 'publication':
      return <PublicationPreview data={highlight} />
    default:
      return null
  }
}

export default memo(HighlightPreview)
