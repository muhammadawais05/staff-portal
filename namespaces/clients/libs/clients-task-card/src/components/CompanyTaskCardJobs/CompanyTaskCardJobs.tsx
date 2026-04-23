import React from 'react'
import { Container, Info16, Tooltip, TypographyOverflow } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { isNotNullish } from '@staff-portal/utils'
import { TaskCardLayout } from '@staff-portal/tasks'

import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'

export interface Props {
  company: TaskCardCompanyFragment
}

const CompanyTaskCardJobs = ({
  company: {
    totalJobs,
    activeJobs,
    webResource: { url }
  }
}: Props) => {
  const totalJobCount = totalJobs?.totalCount
  const activeJobCount = activeJobs?.totalCount

  if (!isNotNullish(totalJobCount) || !isNotNullish(activeJobCount)) {
    return null
  }

  return (
    <TaskCardLayout.SummaryItem
      label='Jobs'
      value={
        <Container as='span' flex alignItems='center'>
          <LinkWrapper wrapWhen={Boolean(url)} href={`${url}#company_jobs`}>
            <TypographyOverflow as='span' weight='semibold' color='inherit'>
              {`${activeJobCount} / ${totalJobCount}`}
            </TypographyOverflow>
          </LinkWrapper>

          <Tooltip content='Active / Total' interactive>
            <Container as='span' left='xsmall' flex alignItems='center'>
              <Info16 color='dark-grey' />
            </Container>
          </Tooltip>
        </Container>
      }
    />
  )
}

export default CompanyTaskCardJobs
