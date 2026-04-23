import React from 'react'
import { Story, StoryShell } from '@staff-portal/story-shell'

import Component from './ClientHierarchy'

export default {
  title: 'Clients/Clients/Pages/Hierarchy',
  argTypes: {
    id: {
      control: { type: 'text' }
    }
  }
}

const Template: Story<{ id: string }> = ({ id }) => (
  <StoryShell render={Component} params={{ id }} />
)

export const Hierarchy = Template.bind({})
Hierarchy.args = { id: '641406' }
