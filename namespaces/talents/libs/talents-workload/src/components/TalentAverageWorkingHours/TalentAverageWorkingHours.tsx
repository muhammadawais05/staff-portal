import React from 'react'
import { Tooltip, QuestionMark16, Container } from '@toptal/picasso'
import { formatDuration } from '@staff-portal/date-time-utils'

interface Props {
  hours?: number | null
}

const TOOLTIP_CONTENT = 'Average number of hours billed over past 3 weeks.'

const IconWithTooltip = () => (
  <Tooltip placement='top' maxWidth='none' content={TOOLTIP_CONTENT}>
    <Container flex left='xsmall'>
      <QuestionMark16 color='dark-grey' data-testid='info-icon' />
    </Container>
  </Tooltip>
)

const TalentAverageWorkingHours = ({ hours }: Props) => {
  return (
    <Container flex as='span' alignItems='center' inline>
      {formatDuration({ hours: Number(hours || 0) }, { zero: true })}{' '}
      <IconWithTooltip />
    </Container>
  )
}

export default TalentAverageWorkingHours
