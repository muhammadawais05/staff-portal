import React from 'react'
import {
  Tooltip,
  Container,
  QuestionMark16,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { TaskCardLayout } from '@staff-portal/tasks'

import { TaskTalentFragment } from '../../../../data/talent-fragment'

interface Props {
  talent: TaskTalentFragment
}

const TalentTaskCardJobs = ({
  talent: {
    webResource: { url },
    engagements: {
      jobCounters: { active, removed, closed }
    }
  }
}: Props) => {
  const jobs = (
    <Container as='span' flex alignItems='center'>
      <LinkWrapper wrapWhen={Boolean(url)} href={`${url}#talent_jobs`}>
        <TypographyOverflow as='span' weight='semibold' color='inherit'>
          {`${active} / ${removed} / ${closed}`}
        </TypographyOverflow>
      </LinkWrapper>

      <Tooltip
        content={
          <Typography>
            Active jobs: {active}
            <br />
            Canceled jobs: {removed}
            <br />
            Closed jobs: {closed}
          </Typography>
        }
        interactive
      >
        <Container as='span' left='xsmall' flex alignItems='center'>
          <QuestionMark16 color='dark-grey' />
        </Container>
      </Tooltip>
    </Container>
  )

  return <TaskCardLayout.SummaryItem label='Jobs' value={jobs} />
}

export default TalentTaskCardJobs
