import React from 'react'
import { Story, StoryShell } from '@staff-portal/story-shell'

import Component from './CreateRepresentative'

export default {
  title: 'Clients/Client Representatives/Pages/Create',
  argTypes: {
    clientId: {
      control: { type: 'text' }
    }
  }
}

const Template: Story<{ clientId: string }> = ({ clientId }) => (
  <StoryShell render={Component} params={{ clientId }} />
)

export const Create = Template.bind({})
Create.args = { clientId: '198120' }
