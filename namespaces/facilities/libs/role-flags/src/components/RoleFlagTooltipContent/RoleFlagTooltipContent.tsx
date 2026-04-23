import React, { ReactNode } from 'react'
import { Typography } from '@toptal/picasso'
import { MarkdownWithHtml } from '@staff-portal/ui'

type Props = {
  title: string
  formattedFlaggedByCopy: string
  comment?: string | null
  renderTooltipActions?: () => ReactNode
}

const RoleFlagTooltipContent = ({
  title,
  comment,
  formattedFlaggedByCopy,
  renderTooltipActions
}: Props) => (
  <>
    <Typography weight='semibold'>{title}</Typography>

    <MarkdownWithHtml linkProps={{ target: '_blank' }}>
      {comment}
    </MarkdownWithHtml>

    <Typography>
      <i>{formattedFlaggedByCopy}</i>
    </Typography>

    {renderTooltipActions?.()}
  </>
)

export default RoleFlagTooltipContent
