import React from 'react'
import { Story, StoryShell } from '@staff-portal/story-shell'

import EmailTemplatePage from './EmailTemplatePage'

const Template: Story<{ id: string }> = ({ id }) => (
  <StoryShell render={EmailTemplatePage} params={{ id }} />
)

export default {
  title: 'Facilities/Communication Email Templates/Pages',
  argTypes: {
    id: {
      control: { type: 'text' }
    }
  }
}

export const Details = Template.bind({})
Details.args = { id: '121208' }
