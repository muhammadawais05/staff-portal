import React, { FunctionComponent } from 'react'
import { Container, ContainerProps, Typography } from '@toptal/picasso'

import TaskCardLayoutActions from './components/TaskCardLayoutActions'
import TaskCardLayoutContent from './components/TaskCardLayoutContent'
import TaskCardLayoutDescription from './components/TaskCardLayoutDescription'
import TaskCardLayoutDescriptionFormatter from './components/TaskCardLayoutDescriptionFormatter'
import TaskCardLayoutHeader from './components/TaskCardLayoutHeader'
import TaskCardLayoutLoading from './components/TaskCardLayoutLoading'
import TaskCardLayoutMoreButton from './components/TaskCardLayoutMoreButton'
import TaskCardLayoutRowItem from './components/TaskCardLayoutRowItem'
import TaskCardLayoutSummary from './components/TaskCardLayoutSummary'
import TaskCardLayoutTag from './components/TaskCardLayoutTag'
import TaskCardLayoutTags from './components/TaskCardLayoutTags'
import TaskCardLayoutTitle from './components/TaskCardLayoutTitle'
import TaskCardLayoutSummaryItem from './components/TaskCardLayoutSummaryItem'

export interface TaskCardLayoutStructure {
  Actions: typeof TaskCardLayoutActions
  Content: typeof TaskCardLayoutContent
  Description: typeof TaskCardLayoutDescription
  DescriptionFormatter: typeof TaskCardLayoutDescriptionFormatter
  Header: typeof TaskCardLayoutHeader
  Loading: typeof TaskCardLayoutLoading
  MoreButton: typeof TaskCardLayoutMoreButton
  RowItem: typeof TaskCardLayoutRowItem
  Summary: typeof TaskCardLayoutSummary
  SummaryItem: typeof TaskCardLayoutSummaryItem
  Tags: typeof TaskCardLayoutTags
  Tag: typeof TaskCardLayoutTag
  Title: typeof TaskCardLayoutTitle
}

export interface TaskCardLayoutProps extends ContainerProps {
  loading?: boolean
}

const TaskCardLayout: FunctionComponent<TaskCardLayoutProps> &
  TaskCardLayoutStructure = ({ loading, children, ...rest }) => (
  <Container {...rest}>
    <Typography as='div' size='xsmall'>
      {loading ? <TaskCardLayoutLoading /> : children}
    </Typography>
  </Container>
)

TaskCardLayout.Actions = TaskCardLayoutActions
TaskCardLayout.Content = TaskCardLayoutContent
TaskCardLayout.Description = TaskCardLayoutDescription
TaskCardLayout.DescriptionFormatter = TaskCardLayoutDescriptionFormatter
TaskCardLayout.Header = TaskCardLayoutHeader
TaskCardLayout.Loading = TaskCardLayoutLoading
TaskCardLayout.MoreButton = TaskCardLayoutMoreButton
TaskCardLayout.RowItem = TaskCardLayoutRowItem
TaskCardLayout.Summary = TaskCardLayoutSummary
TaskCardLayout.SummaryItem = TaskCardLayoutSummaryItem
TaskCardLayout.Tags = TaskCardLayoutTags
TaskCardLayout.Tag = TaskCardLayoutTag
TaskCardLayout.Title = TaskCardLayoutTitle

export default TaskCardLayout
