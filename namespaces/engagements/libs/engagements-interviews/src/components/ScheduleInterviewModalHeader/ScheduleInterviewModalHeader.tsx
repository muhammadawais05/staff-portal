import { Alert, Button, Container, Typography } from '@toptal/picasso'
import React from 'react'

import * as S from './styles'
import { getScheduleInterviewDescription } from './utils'

export interface Props {
  isTopSchedulerAvailable: boolean
  isClassic: boolean
  showClaimerWarning: boolean
  onToggle: () => void
}

const ScheduleInterviewModalHeader = ({
  isTopSchedulerAvailable,
  isClassic,
  showClaimerWarning,
  onToggle
}: Props) => {
  const description = getScheduleInterviewDescription(isClassic)

  return (
    <>
      <Container bottom='small'>
        {showClaimerWarning && (
          <Container
            bottom='xsmall'
            data-testid='ScheduleInterviewModalHeader-claimer-warning'
          >
            <Alert>
              This job is not claimed by you. The job claimer will receive
              interview feedback.
            </Alert>
          </Container>
        )}

        {isTopSchedulerAvailable && (
          <Alert variant='green' css={S.scheduleAlert}>
            <Container
              flex
              alignItems='center'
              justifyContent='space-between'
              data-testid='ScheduleInterviewModalHeader-scheduling-switcher'
            >
              <Typography>
                Schedule an interview with the{' '}
                {isClassic ? 'TopScheduler' : 'Classic Scheduler'}.
              </Typography>
              <Button
                size='small'
                variant='secondary'
                onClick={onToggle}
                data-testid='ScheduleInterviewModalHeader-scheduling-toggle-button'
              >
                {isClassic
                  ? 'Use TopScheduler Scheduling'
                  : 'Use Classic Scheduling'}
              </Button>
            </Container>
          </Alert>
        )}
      </Container>

      <Container bottom='medium'>
        <Typography size='medium'>{description}</Typography>
      </Container>
    </>
  )
}

export default ScheduleInterviewModalHeader
