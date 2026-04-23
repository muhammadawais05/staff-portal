import React from 'react'
import { Story, StoryShell } from '@staff-portal/story-shell'

import Component from './PublicationRequest'

export default {
  title: 'Talents/PublicationRequests/Pages/Details',
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
Primary.args = { id: 'VjEtUHVibGljYXRpb25HaWctODM' }

export const Secondary = Template.bind({})
Secondary.args = { id: 'VjEtUDJQUmVxdWVzdC0zNw' }
