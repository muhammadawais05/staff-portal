import React from 'react'
import { Story, StoryShell } from '@staff-portal/story-shell'

import Component from './CommunityLeader'

export default {
  title: 'Community/Leaders/Pages/Details',
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
Details.args = { id: 'VjEtVGFsZW50LTU0NzQ0OQ' }
