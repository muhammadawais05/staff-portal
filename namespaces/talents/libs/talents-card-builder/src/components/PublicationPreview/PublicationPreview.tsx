import React from 'react'

import { PreviewExperiencePublicationType } from '../../types'
import HighlightItemPreview from '../HighlightItemPreview/HighlightItemPreview'

interface Props {
  data: PreviewExperiencePublicationType
}

const PublicationPreview = ({ data }: Props) => {
  const highlightTitle = `${data.title} (Publication)`

  return (
    <HighlightItemPreview title={highlightTitle} description={data.excerpt} />
  )
}

export default PublicationPreview
