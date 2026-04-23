import React from 'react'

import { PreviewExperiencePortfolioType } from '../../types'
import HighlightItemPreview from '../HighlightItemPreview/HighlightItemPreview'

interface Props {
  data: PreviewExperiencePortfolioType
}

const PortfolioPreview = ({ data }: Props) => {
  const highlightTitle = `Worked on ${data.title}`

  return (
    <HighlightItemPreview
      title={highlightTitle}
      description={data.description}
    />
  )
}

export default PortfolioPreview
