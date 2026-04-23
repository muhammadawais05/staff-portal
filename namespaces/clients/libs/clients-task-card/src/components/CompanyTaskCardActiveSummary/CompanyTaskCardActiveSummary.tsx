import React from 'react'
import { TaskCardLayout } from '@staff-portal/tasks'

import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'
import CompanyTaskCardJobs from '../CompanyTaskCardJobs'
import CompanyTaskCardRevenue from '../CompanyTaskCardRevenue'
import CompanyTaskCardStatus from '../CompanyTaskCardStatus'
import CompanyTaskCardVerticalsEngaged from '../CompanyTaskCardVerticalsEngaged'

export interface Props {
  company: TaskCardCompanyFragment
}

const CompanyTaskCardActiveSummary = ({ company }: Props) => {
  const { investigations, cumulativeStatus } = company

  return (
    <TaskCardLayout.Summary>
      <CompanyTaskCardStatus
        investigations={investigations}
        cumulativeStatus={cumulativeStatus}
      />
      <CompanyTaskCardJobs company={company} />
      <CompanyTaskCardRevenue company={company} />
      <CompanyTaskCardVerticalsEngaged company={company} />
    </TaskCardLayout.Summary>
  )
}

export default CompanyTaskCardActiveSummary
