import React from 'react'
import { Story, StoryShell } from '@staff-portal/story-shell'

import Component from './CallRequest'

export default {
  title: 'Clients/Call Requests/Pages/Details',
  argTypes: {
    id: {
      control: { type: 'text' }
    }
  }
}

const Template: Story<{ id: string }> = ({ id }) => (
  <StoryShell render={Component} params={{ id }} />
)

export const Details = Template.bind({})
Details.args = { id: '165412' }
