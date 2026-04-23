import React from 'react'
import { TaskCardLayout, TaskWithOptionalMetadata } from '@staff-portal/tasks'
import { ClientIcon } from '@staff-portal/clients'

import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'
import { getCompanyContentItems } from '../../utils'
import CompanyTaskCardActions from '../CompanyTaskCardActions'
import CompanyTaskCardActiveSummary from '../CompanyTaskCardActiveSummary'
import CompanyTaskCardAppliedSummary from '../CompanyTaskCardAppliedSummary'
import CompanyTaskCardFlags from '../CompanyTaskCardFlags'

interface Props {
  loading: boolean
  company?: TaskCardCompanyFragment | null
  task: TaskWithOptionalMetadata
  taskCardTitle: string
  taskCardSubtitle?: string
  timeZone?: string
}

const CompanyTaskCardLayout = ({
  loading,
  company,
  task,
  taskCardTitle,
  taskCardSubtitle,
  timeZone
}: Props) => {
  const isActiveCompany = Boolean(company?.engagements?.totalCount)

  return (
    <TaskCardLayout loading={!company && loading}>
      {company && (
        <>
          <TaskCardLayout.Header>
            <TaskCardLayout.Title
              title={taskCardTitle}
              icon={company.photo?.thumb ?? <ClientIcon />}
              link={company.webResource.url}
            >
              {taskCardSubtitle}
            </TaskCardLayout.Title>
            <CompanyTaskCardActions company={company} task={task} />
          </TaskCardLayout.Header>

          <CompanyTaskCardFlags flags={company.flags} />

          {isActiveCompany ? (
            <CompanyTaskCardActiveSummary company={company} />
          ) : (
            <CompanyTaskCardAppliedSummary company={company} />
          )}

          <TaskCardLayout.Content
            items={getCompanyContentItems(company, isActiveCompany, timeZone)}
          />
        </>
      )}
    </TaskCardLayout>
  )
}

export default CompanyTaskCardLayout
