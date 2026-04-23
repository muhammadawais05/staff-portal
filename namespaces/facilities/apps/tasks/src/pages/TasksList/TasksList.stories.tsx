import React from 'react'
import { StoryShell } from '@staff-portal/story-shell'

import Component from './TasksList'

export default {
  title: 'Tasks/Pages/Tasks List Page',
  component: Component
}

export const TasksListPage = () => <StoryShell render={Component} />
