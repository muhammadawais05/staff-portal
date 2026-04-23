import React from 'react'
import { Container, Section } from '@toptal/picasso'
import { PriorityLegend } from '@staff-portal/tasks'
import { RelatedTasks } from '@staff-portal/tasks-lists'
import { TaskSource } from '@staff-portal/graphql/staff'

import { TasksByClientClientFragment } from '../../data/get-clients-names-and-total-count/get-clients-names-and-total-count.staff.gql.types'
import { ClientListTaskCardDetails } from '../ClientListTaskCardDetails/ClientListTaskCardDetails'
import { ClientListTaskCardTitle } from '../ClientListTaskCardTitle/ClientListTaskCardTitle'
import CompanyJobs from '../../../CompanyJobs/CompanyJobs'

type Props = {
  client: TasksByClientClientFragment
}

const TasksByClientsList = ({ client }: Props) => (
  <Container bottom={1.5} key={client.id}>
    <Section
      title={<ClientListTaskCardTitle client={client} />}
      collapsible
      defaultCollapsed
      testIds={{ actions: 'tasks-by-clients-section-actions' }}
      data-testid='tasks-by-clients-section'
      variant='withHeaderBar'
    >
      <ClientListTaskCardDetails client={client} />
      <CompanyJobs clientId={client.id} />
      {/*
          We need to either expand RelatedTasks' abilities to allow for a choice of
          task fields to be displayed, or create a new component for this section
          (https://www.figma.com/file/YBJQ8ePBXTRomxbSsFbwYn/Tasks-by-Companies?node-id=2%3A14)
        */}
      <RelatedTasks
        title='Tasks'
        noResultsMessage='There are no tasks yet.'
        nodeId={client.id}
        showDisputeActions
        taskSource={TaskSource.TASKS_COMPANIES_LIST_HEADER}
        hiddenColumns={['related_to']}
        footer={<PriorityLegend />}
      />
    </Section>
  </Container>
)

export default TasksByClientsList
