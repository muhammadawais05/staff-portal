import React from 'react'
import { StoryShell, Story } from '@staff-portal/story-shell'

import Component from './EditSourcingRequest'

export default {
  title: 'Jobs/Sourcing Requests/Pages/Edit',
  argTypes: {
    id: {
      control: { type: 'text' }
    }
  }
}

const Template: Story<{ id: string }> = ({ id }) => (
  <StoryShell render={Component} params={{ id }} />
)

export const Primary = Template.bind({})
Primary.args = { id: '682' }

export const Secondary = Template.bind({})
Secondary.args = { id: '683' }
