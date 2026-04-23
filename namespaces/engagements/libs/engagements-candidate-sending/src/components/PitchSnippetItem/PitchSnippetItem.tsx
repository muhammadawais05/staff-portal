import { NO_VALUE } from '@staff-portal/config'
import { Maybe } from '@staff-portal/graphql/staff'
import { Link } from '@staff-portal/navigation'
import {
  AvailabilityStatusMode,
  getTalentAvailabilityStatusSettings
} from '@staff-portal/talents'
import { joinTruthy } from '@staff-portal/utils'
import { Container, Typography, TypographyProps } from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'
import React from 'react'

import { EngagementPitchSnippetFragment } from '../../data/engagement-pitch-snippet-fragment'
import {
  NON_BREAKING_DASH_SYMBOL,
  NON_BREAKING_SPACE_SYMBOL
} from '../constants'
import PitchSnippetRow from './components/PitchSnippetRow'
import * as S from './styles'

export type Props = {
  hourlyRate: EngagementPitchSnippetFragment['talentHourlyRate']
  talent: EngagementPitchSnippetFragment['talent']
  hideRole?: boolean
  hideAllocatedHours?: boolean
  mode?: AvailabilityStatusMode
  size?: TypographyProps['size']
  engagementUrl?: Maybe<string>
}

const PitchSnippetItem = ({
  talent,
  hourlyRate,
  hideRole = false,
  hideAllocatedHours = false,
  size = 'xsmall',
  mode = 'compact',
  engagementUrl
}: Props) => {
  if (!talent) {
    return null
  }

  const {
    allocatedHours,
    allocatedHoursAvailability,
    allocatedHoursConfirmedAt,
    availableHours,
    fullName,
    locationV2,
    type,
    roleTitle,
    resumeUrl: talentResumeUrl,
    webResource
  } = talent

  const publicResumeUrl = engagementUrl || talentResumeUrl
  const publicResumeLabel =
    engagementUrl && engagementUrl !== talentResumeUrl
      ? `Job${NON_BREAKING_DASH_SYMBOL}Specific${NON_BREAKING_SPACE_SYMBOL}Resume`
      : 'Profile'

  const talentHourlyRate = hourlyRate
    ? `${formatAmount({
        amount: hourlyRate
      })}/h`
    : NO_VALUE
  const talentAvailability = getTalentAvailabilityStatusSettings(
    {
      type: hideRole ? '' : type,
      roleTitle: hideRole ? '' : roleTitle,
      allocatedHours,
      allocatedHoursAvailability,
      allocatedHoursConfirmedAt,
      availableHours
    },
    mode,
    { hideAllocatedHours }
  ).text
  const talentLocation = joinTruthy([
    locationV2?.cityName,
    locationV2?.stateName,
    locationV2?.country?.name
  ])

  return (
    <>
      <Container bordered rounded padded='small' bottom='xsmall'>
        <Typography as='div' size={size}>
          <PitchSnippetRow label='Talent'>
            <Link href={webResource.url ?? undefined}>{fullName}</Link>
          </PitchSnippetRow>

          <PitchSnippetRow label={publicResumeLabel}>
            <Link href={publicResumeUrl}>{publicResumeUrl}</Link>
          </PitchSnippetRow>

          <PitchSnippetRow label='Talent Rate'>
            {talentHourlyRate}
          </PitchSnippetRow>

          <PitchSnippetRow label='Availability'>
            {talentAvailability}
          </PitchSnippetRow>

          <PitchSnippetRow label='Location'>{talentLocation}</PitchSnippetRow>
        </Typography>
      </Container>

      <br css={S.pitchSnippetSeparator} />
    </>
  )
}

export default PitchSnippetItem
