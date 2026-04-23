import React from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { CLIENT_UPDATED } from '@staff-portal/clients'
import { TaskCardProps } from '@staff-portal/tasks-cards'

import { CompanyTaskCardLayout } from '../CompanyTaskCardLayout'
import { useGetCompany } from './data'

const CompanyTaskCard = ({
  taskCardConfig: {
    title: taskCardTitle,
    subtitle: taskCardSubtitle,
    entityId: companyId
  },
  task
}: TaskCardProps) => {
  const { data: company, loading, refetch } = useGetCompany(companyId)

  const user = useGetCurrentUser()

  // TODO: remove message listener, once the problem would be investigated
  // https://toptal-core.atlassian.net/browse/SPB-2852
  useMessageListener(
    [CLIENT_UPDATED],
    ({ companyId: id }) => id === companyId && refetch()
  )

  return (
    <CompanyTaskCardLayout
      loading={loading}
      company={company}
      timeZone={user?.timeZone?.value}
      task={task}
      taskCardTitle={taskCardTitle}
      taskCardSubtitle={taskCardSubtitle}
    />
  )
}

export default CompanyTaskCard
