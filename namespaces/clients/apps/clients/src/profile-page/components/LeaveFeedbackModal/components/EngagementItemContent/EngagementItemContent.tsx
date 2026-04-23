import React from 'react'
import { Link as LinkType } from '@staff-portal/graphql/staff'
import { Link } from '@staff-portal/navigation'

interface Props {
  verticalName?: string
  jobLink?: LinkType
  talentLink?: LinkType
  prependContent?: string
}

const EngagementItemContent = ({
  jobLink,
  verticalName,
  talentLink,
  prependContent
}: Props) => {
  return (
    <>
      {prependContent}{' '}
      <Link target='_blank' href={jobLink?.url as string}>
        {jobLink?.text}
      </Link>{' '}
      with {verticalName?.toLowerCase()}{' '}
      <Link target='_blank' href={talentLink?.url as string}>
        {talentLink?.text}
      </Link>
    </>
  )
}

export default EngagementItemContent
