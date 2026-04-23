import React from 'react'
import { Tooltip, QuestionMark16, Container } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { TypographyOverflowLink } from '@staff-portal/ui'
import {
  getDateDistanceFromNow,
  parseAndFormatDateTime,
  parseAndFormatDate
} from '@staff-portal/date-time-utils'

import { TaskTalentFragment } from '../../../../data'

export const getTalentLastResume = (
  profile: TaskTalentFragment['profile'],
  timeZone?: string
) => {
  if (!profile?.resumeFiles.nodes[0]) {
    return
  }

  const { identifier, url, uploadedAt } = profile?.resumeFiles.nodes[0] || {}

  const linkText = uploadedAt
    ? `${parseAndFormatDate(uploadedAt, { timeZone })} - ${identifier}`
    : identifier

  return (
    <Container flex alignItems='center'>
      <TypographyOverflowLink tooltipContent={linkText}>
        <Link target='_blank' href={url}>
          {linkText}
        </Link>
      </TypographyOverflowLink>
      {!!uploadedAt && (
        <Tooltip
          content={
            <>
              Added on {parseAndFormatDateTime(uploadedAt, { timeZone })}
              <br />({getDateDistanceFromNow(uploadedAt)})
            </>
          }
          interactive
        >
          <Container flex left='xsmall' data-testid='uploaded-at-info'>
            <QuestionMark16 />
          </Container>
        </Tooltip>
      )}
    </Container>
  )
}
