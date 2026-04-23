import React from 'react'
import { Container, Info16, Tooltip, Typography, View16 } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { getStatusColor } from '@staff-portal/talents'

export type Props = {
  pureScore?: number | null
  maxScore?: number | null
  acceptThreshold?: number | null
  rejectThreshold?: number | null
  resultUrl?: string | null
}

const TalentOnlineTestsScoreTooltip = ({
  pureScore,
  maxScore,
  acceptThreshold,
  rejectThreshold,
  resultUrl
}: Props) => {
  if (!acceptThreshold || !rejectThreshold) {
    return null
  }

  const scoreText = [pureScore, maxScore]
    .map(score => Math.round(score as number))
    .join('/')

  const statusColor = getStatusColor({
    pureScore,
    acceptThreshold,
    rejectThreshold
  })

  const tooltipText = (
    <Container>
      The result of this test is {pureScore} against a reject threshold{' '}
      {rejectThreshold} and an accept threshold of {acceptThreshold}
    </Container>
  )

  return (
    <Container alignItems='center' flex>
      <Typography color={statusColor}>{scoreText}</Typography>
      <Tooltip placement='top' content={tooltipText} interactive>
        <Container as='span' left='xsmall' data-testid='info-icon'>
          <Info16 color='black' />
        </Container>
      </Tooltip>
      <Container left='xsmall'>
        <Link href={resultUrl as string} noUnderline target='_blank'>
          <View16 color='black' />
        </Link>
      </Container>
    </Container>
  )
}

export default TalentOnlineTestsScoreTooltip
