import React from 'react'
import { Story, StoryShell } from '@staff-portal/story-shell'

import Component from './TalentUpdatePage'

export default {
  title: 'Talents/Talents/Pages/Edit',
  argTypes: {
    id: {
      control: { type: 'text' }
    }
  }
}

const Template: Story<{ id: string }> = ({ id }) => (
  <StoryShell render={Component} params={{ id }} />
)

export const Edit = Template.bind({})
Edit.args = { id: '1569243' }
