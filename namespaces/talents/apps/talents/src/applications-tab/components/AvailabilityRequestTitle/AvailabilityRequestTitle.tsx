import React from 'react'
import { Link } from '@staff-portal/graphql/staff'
import { LinkWrapper } from '@staff-portal/ui'

interface RequestForProps {
  jobLink: Link
  clientLink: Link
  color?: 'white'
}

const AvailabilityRequestTitle = ({
  jobLink,
  clientLink,
  color
}: RequestForProps) => {
  return (
    <>
      <LinkWrapper
        color={color}
        wrapWhen={Boolean(jobLink.url)}
        href={jobLink.url as string}
      >
        {jobLink.text}
      </LinkWrapper>
      {' at '}
      <LinkWrapper
        color={color}
        wrapWhen={Boolean(clientLink.url)}
        href={clientLink.url as string}
      >
        {clientLink.text}
      </LinkWrapper>
    </>
  )
}

export default AvailabilityRequestTitle
