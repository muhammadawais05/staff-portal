import { Table } from '@toptal/picasso'
import React from 'react'

import { ColumnHeaderStyles } from '../../containers/TaskListItem/styles'

export const taskColumns = [
  {
    title: '',
    key: 'selection',
    props: {
      css: ColumnHeaderStyles.checkboxColHeader
    }
  },
  {
    key: 'priority',
    title: 'Priority',
    props: {
      css: ColumnHeaderStyles.priorityColHeader
    }
  },
  {
    key: 'task',
    title: 'Task',
    props: {
      css: ColumnHeaderStyles.nameColHeader
    }
  },
  {
    key: 'due_date',
    title: 'Due Date',
    props: {
      css: ColumnHeaderStyles.dueDateColHeader
    }
  },
  {
    key: 'related_to',
    title: 'Related To',
    props: {
      css: ColumnHeaderStyles.relatedToColHeader
    }
  },
  {
    key: 'time',
    title: 'Time',
    props: {
      css: ColumnHeaderStyles.timeColHeader
    }
  },
  {
    key: 'assignee',
    title: 'Assignee',
    props: {
      css: ColumnHeaderStyles.assigneeColHeader
    }
  },
  {
    key: 'actions',
    title: 'Actions',
    props: {
      css: ColumnHeaderStyles.actionsColHeader
    }
  }
] as const

export type TaskColumnKeysType = typeof taskColumns[number]['key']

interface Props {
  hiddenColumns?: TaskColumnKeysType[]
}

export const TasksTableHeader = ({ hiddenColumns }: Props) => {
  return (
    <Table.Head>
      <Table.Row>
        {taskColumns
          .filter(column => !hiddenColumns?.includes(column.key))
          .map(item => (
            <Table.Cell {...item.props} key={item.title} css={item.props.css}>
              {item.title}
            </Table.Cell>
          ))}
      </Table.Row>
    </Table.Head>
  )
}
