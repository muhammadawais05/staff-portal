import React from 'react'
import { Story, StoryShell } from '@staff-portal/story-shell'

import Component from './MeetingProfile'

export default {
  title: 'Facilities/Meetings/Pages/Profile'
}

const Template: Story<{ id: string }> = ({ id }) => (
  <StoryShell render={Component} params={{ id }} />
)

export const Profile = Template.bind({})
Profile.args = { id: '1237676' }
