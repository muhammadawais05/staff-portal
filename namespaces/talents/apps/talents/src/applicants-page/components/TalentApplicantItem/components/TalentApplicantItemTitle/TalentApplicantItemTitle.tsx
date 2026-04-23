import React, { useMemo } from 'react'
import {
  Bell16,
  Container,
  Eye16,
  Tooltip,
  TypographyOverflow
} from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'

import { TalentApplicantItemFragment } from '../../data/get-talent-applicant-item'

export interface Props {
  talent: TalentApplicantItemFragment
}

const HIGH_PRIORITY_BADGE_FLAGS = [
  'vip_screening',
  'sourcing_call',
  'signing_bonus'
]

const TalentApplicantItemTitle = ({ talent }: Props) => {
  const shouldRenderHighPriorityBadge = useMemo(
    () =>
      !!talent.roleFlags?.nodes?.some(role =>
        HIGH_PRIORITY_BADGE_FLAGS.includes(role.flag.token ?? '')
      ),
    [talent.roleFlags?.nodes]
  )
  const shouldRenderHighlightedBadge =
    talent.isNew && !shouldRenderHighPriorityBadge

  return (
    <Container flex alignItems='center' gap='xsmall'>
      {talent.admissionPostUrl && (
        <Tooltip content='An admission post about Toptal has been submitted by this applicant'>
          <Container as='span'>
            <Eye16 color='red' />
          </Container>
        </Tooltip>
      )}

      {shouldRenderHighPriorityBadge && (
        <Tooltip content='High priority talent'>
          <Container as='span'>
            <Bell16 color='red' />
          </Container>
        </Tooltip>
      )}

      {shouldRenderHighlightedBadge && (
        <Tooltip content='New'>
          <Container as='span'>
            <Bell16 color='blue' />
          </Container>
        </Tooltip>
      )}

      <TypographyOverflow weight='inherit' tooltipContent={talent.fullName}>
        <LinkWrapper
          wrapWhen={Boolean(talent.webResource.url)}
          href={talent.webResource.url as string}
        >
          {talent.fullName}
        </LinkWrapper>
      </TypographyOverflow>
    </Container>
  )
}

export default TalentApplicantItemTitle
