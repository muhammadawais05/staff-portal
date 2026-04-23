import React from 'react'
import { Typography, TypographyOverflow } from '@toptal/picasso'
import { Maybe } from '@toptal/picasso/utils'
import { LinkWrapper } from '@staff-portal/ui'
import { isNotNullish } from '@staff-portal/utils'

import { JobEngagementFragment } from '../../data'

interface Props {
  talentCount: Maybe<number>
  jobEngagements?: JobEngagementFragment[]
}

const TalentField = ({ jobEngagements, talentCount }: Props) => {
  const firstTalent = jobEngagements?.[0]?.talent

  if (talentCount && talentCount > 1) {
    return (
      <Typography size='medium' data-testid='talent_text'>
        Multiple
      </Typography>
    )
  }

  if (!isNotNullish(firstTalent)) {
    return (
      <Typography size='medium' data-testid='talent_text'>
        Pending
      </Typography>
    )
  }

  const {
    fullName,
    webResource: { url }
  } = firstTalent

  return (
    <LinkWrapper
      href={url as string}
      data-testid='talent_link'
      wrapWhen={Boolean(url)}
      noUnderline
    >
      <TypographyOverflow
        as='span'
        size='medium'
        weight='semibold'
        color='inherit'
        data-testid='talent_text'
      >
        {fullName}
      </TypographyOverflow>
    </LinkWrapper>
  )
}

export default TalentField
