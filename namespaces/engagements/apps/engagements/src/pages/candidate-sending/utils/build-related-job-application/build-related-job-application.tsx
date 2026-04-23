import React from 'react'

import { RelatedJobApplicationFragment } from '../../data/related-job-application-fragment'
import { RelatedJobApplicationDescription } from '../../components'

const buildRelatedJobApplication = (
  relatedJobApplication: RelatedJobApplicationFragment
) => {
  const { applicationComment } = relatedJobApplication

  const renderDescription = () => {
    return (
      <RelatedJobApplicationDescription
        relatedJobApplication={relatedJobApplication}
        hasComment={Boolean(applicationComment)}
      />
    )
  }

  return {
    renderDescription,
    applicationComment
  }
}

export default buildRelatedJobApplication
