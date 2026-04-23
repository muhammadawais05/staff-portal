import React from 'react'
import { Typography } from '@toptal/picasso'
import { SkypeLink } from '@staff-portal/communication'
import { NO_VALUE } from '@staff-portal/config'

type Props = {
  skypeId?: string
}

const SkypeViewer = ({ skypeId }: Props) =>
  skypeId ? (
    <SkypeLink size='medium' skypeId={skypeId} />
  ) : (
    <Typography size='medium'>{NO_VALUE}</Typography>
  )

export default SkypeViewer
