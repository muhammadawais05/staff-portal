import React from 'react'

import { PreviewEducationType } from '../../types'
import HighlightItemPreview from '../HighlightItemPreview/HighlightItemPreview'

interface Props {
  data: PreviewEducationType
}

const EducationPreview = ({
  data: { degree, fieldOfStudy, title, yearFrom, yearTo }
}: Props) => {
  const highlightTitle = `${degree} in ${fieldOfStudy} at ${title}`

  return (
    <HighlightItemPreview
      title={highlightTitle}
      startDate={yearFrom}
      endDate={yearTo}
    />
  )
}

export default EducationPreview
