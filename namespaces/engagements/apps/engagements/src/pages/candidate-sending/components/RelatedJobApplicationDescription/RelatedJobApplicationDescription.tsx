import React from 'react'
import { LinkWrapper } from '@staff-portal/ui'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { Typography } from '@toptal/picasso'

import { RelatedJobApplicationFragment } from '../../data/related-job-application-fragment'
import RelatedJobApplicationSubject from '../RelatedJobApplicationSubject/RelatedJobApplicationSubject'

type Props = {
  relatedJobApplication: RelatedJobApplicationFragment
  hasComment?: boolean
}

const RelatedJobApplicationDescription = ({
  relatedJobApplication,
  hasComment
}: Props) => {
  let text: JSX.Element
  const { performer, talent, createdAt } = relatedJobApplication

  if (performer?.__typename === 'TalentPartner') {
    text = (
      <>
        <RelatedJobApplicationSubject
          relatedJobApplication={relatedJobApplication}
        />{' '}
        suggested{' '}
        <LinkWrapper
          wrapWhen={Boolean(talent.webResource.url)}
          href={talent.webResource.url as string}
        >
          <Typography
            as='span'
            weight='semibold'
            size='inherit'
            color='inherit'
          >
            {talent.webResource.text}
          </Typography>
        </LinkWrapper>
      </>
    )
  } else {
    text = (
      <>
        <RelatedJobApplicationSubject
          relatedJobApplication={relatedJobApplication}
        />{' '}
        applied
      </>
    )
  }

  return (
    <>
      {text}
      {' to the job '}
      {getDateDistanceFromNow(createdAt).toLocaleLowerCase()}
      {hasComment && ' with this comment:'}
    </>
  )
}

export default RelatedJobApplicationDescription
