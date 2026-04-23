import React from 'react'
import { Typography } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { LinkOverflow } from '@staff-portal/client-representatives'

type WebsiteViewerProps = {
  website: string | undefined
}

const WebsiteViewer = ({ website }: WebsiteViewerProps) =>
  website ? (
    <LinkOverflow
      link={{ text: website, url: website }}
      target='_blank'
      rel='noopener noreferrer'
    />
  ) : (
    <Typography size='medium'>{NO_VALUE}</Typography>
  )

export default WebsiteViewer
