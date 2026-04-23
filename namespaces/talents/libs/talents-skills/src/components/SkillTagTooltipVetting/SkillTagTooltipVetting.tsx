import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Separator } from '@staff-portal/ui'

import { Vetting } from '../Vetting'
import { VettingType, VettedResult } from '../../types'

interface Props {
  vettedResult: VettedResult
}

const SkillTagTooltipVetting = ({ vettedResult }: Props) => {
  if (vettedResult.type === VettingType.NotVetted) {
    return (
      <Typography color='dark-grey' size='medium'>
        {vettedResult.message}
      </Typography>
    )
  }

  const {
    workingHoursCount,
    skillConnectionsCount,
    engagementsCount,
    quartiles: {
      workingHours25,
      workingHours75,
      skillConnections25,
      skillConnections75,
      engagements25,
      engagements75
    },
    performerName,
    formattedCreatedAt,
    comment
  } = vettedResult

  return (
    <Container flex direction='column' gap='small'>
      <Container flex direction='column' gap='small'>
        <Vetting
          label='Toptal work hours'
          value={workingHoursCount}
          threshold25={workingHours25}
          threshold75={workingHours75}
        />
        <Vetting
          label='Skill connections'
          value={skillConnectionsCount}
          threshold25={skillConnections25}
          threshold75={skillConnections75}
        />
        <Vetting
          label='Skill engagements'
          value={engagementsCount}
          threshold25={engagements25}
          threshold75={engagements75}
        />
      </Container>
      <Separator />
      <Container>
        <Typography size='xsmall' color='black'>
          Last vetted by{' '}
          <Typography as='span' weight='semibold' color='inherit'>
            {performerName}, {formattedCreatedAt}
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
    </Container>
  )
}

export default SkillTagTooltipVetting
