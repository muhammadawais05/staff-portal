import React from 'react'
import {
  Container,
  Info16,
  Tooltip,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { titleize } from '@staff-portal/string'
import { TaskCardLayout } from '@staff-portal/tasks'

import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'

export interface Props {
  company: TaskCardCompanyFragment
}

const CompanyTaskCardVerticalsEngaged = ({
  company: { jobsForVerticalsEngaged }
}: Props) => {
  const { verticalsEngaged = [] } = jobsForVerticalsEngaged || {}

  return (
    <TaskCardLayout.SummaryItem
      label='Verticals engaged'
      value={
        <Container as='span' flex alignItems='center'>
          <TypographyOverflow as='span' weight='semibold' color='inherit'>
            {verticalsEngaged.length}
          </TypographyOverflow>

          <Tooltip
            content={verticalsEngaged.map(vertical => (
              <Typography key={vertical}>{titleize(vertical)}</Typography>
            ))}
            interactive
          >
            <Container as='span' left='xsmall' flex alignItems='center'>
              <Info16 color='dark-grey' />
            </Container>
          </Tooltip>
        </Container>
      }
    />
  )
}

export default CompanyTaskCardVerticalsEngaged
