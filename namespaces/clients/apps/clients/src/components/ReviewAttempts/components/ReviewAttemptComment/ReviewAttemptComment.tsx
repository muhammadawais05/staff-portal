import React, { FC, memo } from 'react'
import { Typography, TypographyOverflow } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { TypographyOverflowLink } from '@staff-portal/ui'

type Props = {
  commentary?: string | null
  reviewLink?: string | null
}

const displayName = 'ReviewAttemptComment'

const ReviewAttemptComment: FC<Props> = memo(({ commentary, reviewLink }) => {
  if (commentary) {
    return (
      <TypographyOverflow data-testid={`${displayName}-commentary`}>
        {commentary}
      </TypographyOverflow>
    )
  }

  if (reviewLink) {
    return (
      <TypographyOverflowLink
        tooltipContent={reviewLink}
        data-testid={`${displayName}-reviewLink`}
      >
        <Link href={reviewLink} target='_blank'>
          {reviewLink}
        </Link>
      </TypographyOverflowLink>
    )
  }

  return <Typography data-testid={`${displayName}-empty`}>--</Typography>
})

export default ReviewAttemptComment
