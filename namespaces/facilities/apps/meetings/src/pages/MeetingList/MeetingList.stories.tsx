import React from 'react'
import { StoryShell } from '@staff-portal/story-shell'

import Component from './MeetingList'

export default {
  title: 'Facilities/Meetings/Pages'
}

export const List = () => <StoryShell render={Component} />
