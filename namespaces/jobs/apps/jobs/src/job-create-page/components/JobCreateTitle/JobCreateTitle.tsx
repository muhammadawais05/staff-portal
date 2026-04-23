import React from 'react'
import { LinkWrapper } from '@staff-portal/ui'
import { Link } from '@staff-portal/graphql/staff'

export interface Props {
  clientWebResource: Link
  opportunityWebResource?: Link
}

const JobCreateTitle = ({
  clientWebResource,
  opportunityWebResource
}: Props) => {
  const clientLink = (
    <LinkWrapper
      wrapWhen={!!clientWebResource.url}
      href={clientWebResource.url as string}
    >
      {clientWebResource.text}
    </LinkWrapper>
  )

  if (!opportunityWebResource) {
    return <>Add New Job for {clientLink}</>
  }

  const opportunityLink = (
    <LinkWrapper
      wrapWhen={!!opportunityWebResource.url}
      href={opportunityWebResource.url as string}
    >
      {opportunityWebResource.text}
    </LinkWrapper>
  )

  return (
    <>
      Link New Job for {clientLink} to Opportunity {opportunityLink}
    </>
  )
}

export default JobCreateTitle
