import React from 'react'
import { Story, StoryShell } from '@staff-portal/story-shell'

import Component from './JobApplication'

export default {
  title: 'Jobs/Applications/Pages',
  argTypes: {
    id: {
      control: { type: 'text' }
    }
  }
}

const Template: Story<{ id: string }> = ({ id }) => (
  <StoryShell render={Component} params={{ id }} />
)

export const Application = Template.bind({})
Application.args = { id: '165412' }
