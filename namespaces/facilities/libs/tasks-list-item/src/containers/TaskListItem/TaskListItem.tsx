import { Table, Tag } from '@toptal/picasso'
import React, {
  memo,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { TaskSource } from '@staff-portal/graphql/staff'
import { TaskCardType } from '@staff-portal/tasks-cards'
import { useDependency } from '@staff-portal/dependency-injector'

import { TASK_CARD_SUBJECT_OPTIONS } from '../../dependencies'
import { TaskListItemFragment } from './data/task-list-item-fragment'
import { generateTaskCardsFromSubjects } from './utils/generate-task-cards-from-subjects'
import CompleteTaskCheckbox from './components/CompleteTaskCheckbox'
import {
  renderPriorityCol,
  renderNameCol,
  renderDueDateCol,
  renderRelatedToCol,
  renderRelatedTimeCol,
  renderAssigneeCol,
  renderActionsCol,
  renderExpandedContent
} from './utils'
import * as S from './styles'
import { TaskColRenderProps } from './types'
import { useGetTaskMetadata } from './data'
import {
  getTaskCompleteOptions,
  TaskCompleteOptions
} from './components/CompleteTaskCheckbox/utils'
import { TaskColumnKeysType } from '../../components/TasksTableHeader'

export interface Props {
  task: TaskListItemFragment
  index: number
  isExpanded: boolean
  expandTask: (taskId: string | null) => void
  showDisputeActions?: boolean
  hiddenColumns?: TaskColumnKeysType[]
}

const ShowIfVisible = ({
  visible,
  children
}: PropsWithChildren<{ visible: boolean }>) =>
  visible ? <>{children}</> : null

const TaskListItem = ({
  task: defaultTask,
  index,
  isExpanded,
  expandTask,
  showDisputeActions = false,
  hiddenColumns
}: Props) => {
  const [task, setCachedTask] = useState(defaultTask)
  const initialTaskCardType = useRef<TaskCardType | null>(null)

  useEffect(() => {
    setCachedTask(defaultTask)
  }, [defaultTask])

  const { id: taskId } = task

  const taskCompleteOptions = useMemo<TaskCompleteOptions | null>(
    () => getTaskCompleteOptions(task),
    [task]
  )
  const taskDefaultCompleted = useMemo<boolean>(
    () => getTaskCompleteOptions(defaultTask)?.completed ?? false,
    [defaultTask]
  )

  const { data: taskMetadata } = useGetTaskMetadata({
    taskId,
    skip: !isExpanded
  })
  const taskCardSubjectOptions = useDependency(TASK_CARD_SUBJECT_OPTIONS)

  const taskCards = generateTaskCardsFromSubjects(
    taskId,
    task.subjects.nodes,
    task.activity,
    taskCardSubjectOptions
  )
  const taskColRenderProps: TaskColRenderProps = {
    task,
    taskMetadata,
    isExpandedVisible: isExpanded
  }

  const expandToDetails = () => {
    initialTaskCardType.current = TaskCardType.TaskDetails
    expandTask(taskId)
  }
  const toggleTaskExpandRow = () => {
    if (initialTaskCardType.current) {
      initialTaskCardType.current = null
    }

    expandTask(isExpanded ? null : taskId)
  }

  return (
    <Table.ExpandableRow
      data-testid='task-row'
      css={S.taskListItemRow}
      content={renderExpandedContent({
        task,
        taskMetadata,
        taskCards,
        defaultTaskCardType: initialTaskCardType.current
      })}
      expanded={isExpanded}
      stripeEven={Boolean(index % 2)}
    >
      <ShowIfVisible visible={!hiddenColumns?.includes('selection')}>
        <Table.Cell css={S.checkboxCol}>
          <CompleteTaskCheckbox
            task={task}
            setCachedTask={setCachedTask}
            taskCompleteOptions={taskCompleteOptions}
            taskDefaultCompleted={taskDefaultCompleted}
          />
        </Table.Cell>
      </ShowIfVisible>
      <ShowIfVisible visible={!hiddenColumns?.includes('priority')}>
        <Table.Cell css={S.priorityCol}>
          {renderPriorityCol(taskColRenderProps)}
        </Table.Cell>
      </ShowIfVisible>
      <ShowIfVisible visible={!hiddenColumns?.includes('task')}>
        <Table.Cell css={S.nameCol}>
          {renderNameCol({
            ...taskColRenderProps,
            expandToDetails
          })}
          {task.source == TaskSource.SALESFORCE && (
            <Tag.Rectangular variant='light-grey'>
              Salesforce Task
            </Tag.Rectangular>
          )}
        </Table.Cell>
      </ShowIfVisible>
      <ShowIfVisible visible={!hiddenColumns?.includes('due_date')}>
        <Table.Cell css={S.dueDateCol}>
          {renderDueDateCol(taskColRenderProps)}
        </Table.Cell>
      </ShowIfVisible>
      <ShowIfVisible visible={!hiddenColumns?.includes('related_to')}>
        <Table.Cell css={S.relatedToCol}>
          {renderRelatedToCol(taskColRenderProps)}
        </Table.Cell>
      </ShowIfVisible>
      <ShowIfVisible visible={!hiddenColumns?.includes('time')}>
        <Table.Cell css={S.timeCol}>
          {renderRelatedTimeCol(taskColRenderProps)}
        </Table.Cell>
      </ShowIfVisible>
      <ShowIfVisible visible={!hiddenColumns?.includes('assignee')}>
        <Table.Cell css={S.assigneeCol}>
          {renderAssigneeCol(taskColRenderProps)}
        </Table.Cell>
      </ShowIfVisible>
      <ShowIfVisible visible={!hiddenColumns?.includes('actions')}>
        <Table.Cell
          data-testid='task-list-item-actions-cell'
          css={S.actionsCol}
        >
          {task.source != TaskSource.SALESFORCE &&
            renderActionsCol({
              ...taskColRenderProps,
              showDisputeActions,
              toggleTaskExpandRow
            })}
        </Table.Cell>
      </ShowIfVisible>
    </Table.ExpandableRow>
  )
}

export default memo(TaskListItem)
