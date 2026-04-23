import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { DEFAULT_DATE_FORMAT } from '@staff-portal/date-time-utils'
import { isNotNullish } from '@staff-portal/utils'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'

import { TalentSkillSetVettedResultFragment } from '../../../../../../data/talent-skill-set-vetted-result-fragment'
import VettingSection from '../VettingSection'
import { DEFAULT_PERFORMER_NAME } from './config'
import * as S from './styles'
import { NotVettedSkill } from './components'
import { shouldShowNotVettedSkill } from './utils'

interface Props {
  vettedResult?: TalentSkillSetVettedResultFragment | null
}

const VettingPage = ({ vettedResult }: Props) => {
  const formatDateTime = useUserDateTimeFormatter()

  if (shouldShowNotVettedSkill(vettedResult)) {
    return <NotVettedSkill vettedResult={vettedResult} />
  }

  const {
    workingHoursCount,
    skillConnectionsCount,
    engagementsCount,
    quartiles,
    performer,
    comment,
    createdAt
  } = vettedResult

  const performerName = performer?.fullName ?? DEFAULT_PERFORMER_NAME

  return (
    <>
      <Container css={S.vettingQuartiles}>
        {isNotNullish(workingHoursCount) && (
          <VettingSection
            label='Toptal work hours:'
            value={workingHoursCount}
            threshold25={Number(quartiles?.workingHours25)}
            threshold75={Number(quartiles?.workingHours75)}
          />
        )}
        {isNotNullish(skillConnectionsCount) && (
          <VettingSection
            label='Skill connections:'
            value={skillConnectionsCount}
            threshold25={Number(quartiles?.skillConnections25)}
            threshold75={Number(quartiles?.skillConnections75)}
          />
        )}
        {isNotNullish(engagementsCount) && (
          <VettingSection
            label='Skill engagements:'
            value={engagementsCount}
            threshold25={Number(quartiles?.engagements25)}
            threshold75={Number(quartiles?.engagements75)}
          />
        )}
      </Container>
      <Container top='small'>
        <Typography size='xsmall' color='black'>
          Last vetted by{' '}
          <Typography as='span' weight='semibold' color='inherit'>
            {performerName}, {formatDateTime(createdAt, DEFAULT_DATE_FORMAT)}
          </Typography>
        </Typography>
        {comment && (
          <Container top='xsmall'>
            <Typography size='xsmall' color='dark-grey'>
              "{comment}"
            </Typography>
          </Container>
        )}
      </Container>
    </>
  )
}

VettingPage.displayName = 'VettingPage'

export default VettingPage
