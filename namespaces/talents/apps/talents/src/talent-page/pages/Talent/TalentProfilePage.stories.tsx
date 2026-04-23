import React from 'react'
import { Story, StoryShell } from '@staff-portal/story-shell'

import Component from './TalentProfilePage'

export default {
  title: 'Talents/Talents/Pages/Profile',
  argTypes: {
    id: {
      control: { type: 'text' }
    }
  }
}

const Template: Story<{ id: string }> = ({ id }) => (
  <StoryShell render={Component} params={{ id }} />
)

export const Profile = Template.bind({})
Profile.args = { id: '1569243' }
