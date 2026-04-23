import React from 'react'
import { WebResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql.types'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import { decodeRawIdAndType } from '@staff-portal/billing/src/_lib/helpers/apollo'

export const renderEngagementLinkOrEmpty = (engagement?: {
  id: string
  webResource: WebResourceFragment
}) => {
  if (!engagement) {
    return EMPTY_DATA
  }

  return (
    <LinkWrapper href={engagement.webResource.url}>
      {`#${decodeRawIdAndType(engagement.id).id}`}
    </LinkWrapper>
  )
}
