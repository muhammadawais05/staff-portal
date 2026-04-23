import React from 'react'
import { LinkWrapper } from '@staff-portal/ui'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { Typography } from '@toptal/picasso'

import { RelatedJobApplicationFragment } from '../../data/related-job-application-fragment'

type Props = {
  relatedJobApplication: RelatedJobApplicationFragment
}

const RelatedJobApplicationSubject = ({
  relatedJobApplication: { performer }
}: Props) => {
  const currentUser = useGetCurrentUser()

  if (!currentUser) {
    return null
  }

  if (performer?.id === currentUser.id) {
    return <>{'You have'}</>
  }

  if (performer?.webResource) {
    return (
      <LinkWrapper
        wrapWhen={Boolean(performer.webResource.url)}
        href={performer.webResource.url as string}
      >
        <Typography as='span' weight='semibold' size='inherit' color='inherit'>
          {performer.webResource.text}
        </Typography>
      </LinkWrapper>
    )
  }

  return <>{'Someone'}</>
}

export default RelatedJobApplicationSubject
