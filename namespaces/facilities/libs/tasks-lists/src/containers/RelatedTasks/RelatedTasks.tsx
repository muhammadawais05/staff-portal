import React, { ReactNode, useState } from 'react'
import Section, { SectionProps } from '@toptal/picasso/Section'
import {
  TypedMessage,
  useMessageListener
} from '@toptal/staff-portal-message-bus'
import { RelatedTasksFilter, TaskSource } from '@staff-portal/graphql/staff'
import { useGetCreateTaskOperation } from '@staff-portal/tasks'
import { TaskColumnKeysType } from '@staff-portal/tasks-list-item'

import GenericTaskList from '../GenericTaskList'
import RelatedTasksActions from './components/RelatedTasksActions'
import { useGetRelatedTasks } from './data'

export interface Props {
  nodeId: string
  taskSource: TaskSource
  showDisputeActions?: boolean
  listenedMessages?: TypedMessage[]
  sectionVariant?: SectionProps['variant']
  title?: string
  noResultsMessage?: string
  hiddenColumns?: TaskColumnKeysType[]
  footer?: ReactNode
}

const RelatedTasks = ({
  nodeId,
  taskSource,
  showDisputeActions = false,
  listenedMessages = [],
  sectionVariant = 'default',
  title = 'Related Tasks',
  noResultsMessage = 'There are no related tasks yet.',
  hiddenColumns,
  footer
}: Props) => {
  const [filter, setFilter] = useState<RelatedTasksFilter>({ completed: false })

  const { data, error, loading, refetch } = useGetRelatedTasks(
    nodeId,
    filter,
    showDisputeActions
  )
  const { data: createTaskOperation } = useGetCreateTaskOperation()

  useMessageListener(listenedMessages, refetch)

  if (!data && error) {
    return null
  }

  return (
    <Section
      data-testid='RelatedTasks'
      title={title}
      variant={sectionVariant}
      actions={
        <RelatedTasksActions
          primaryTaskSubjectId={nodeId}
          source={taskSource}
          completedCount={data?.completedCount}
          filter={filter}
          loading={loading}
          createTaskOperation={createTaskOperation}
          onFilterChange={setFilter}
          onTaskCreated={refetch}
        />
      }
    >
      <GenericTaskList
        tasks={data?.nodes}
        showDisputeActions={showDisputeActions}
        loading={loading && !data}
        noResultsMessage={noResultsMessage}
        refreshTaskList={refetch}
        hiddenColumns={hiddenColumns}
        footer={footer}
      />
    </Section>
  )
}

export default RelatedTasks
