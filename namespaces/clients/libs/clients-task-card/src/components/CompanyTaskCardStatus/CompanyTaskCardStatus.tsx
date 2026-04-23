import React from 'react'
import { TaskCardLayout } from '@staff-portal/tasks'
import { CompanyStatus } from '@staff-portal/clients'

import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'

export interface Props {
  investigations: TaskCardCompanyFragment['investigations']
  cumulativeStatus: TaskCardCompanyFragment['cumulativeStatus']
}

const CompanyTaskCardStatus = ({ investigations, cumulativeStatus }: Props) => {
  return (
    <TaskCardLayout.SummaryItem
      label='Status'
      value={
        <CompanyStatus
          cumulativeStatus={cumulativeStatus}
          investigations={investigations}
        />
      }
    />
  )
}

export default CompanyTaskCardStatus
