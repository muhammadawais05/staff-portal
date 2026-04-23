import React from 'react'
import { Story, StoryShell } from '@staff-portal/story-shell'

import Component from './EmailMessage'

export default {
  title: 'Facilities/Communication Tracking/Pages/Details',
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
Details.args = { id: '33847796' }
