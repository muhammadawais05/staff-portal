import React from 'react'
import { Story, StoryShell } from '@staff-portal/story-shell'

import Component from './JobCreate'

export default {
  title: 'Jobs/Jobs/Pages/Create',
  argTypes: {
    clientId: {
      control: { type: 'text' }
    },
    roleId: {
      control: { type: 'text' }
    },
    opportunityId: {
      control: { type: 'text' }
    },
    cancelPath: {
      control: { type: 'text' }
    }
  }
}

interface Props {
  clientId: string
  roleId: string
  opportunityId: string
  cancelPath: string
}

const Template: Story<Props> = ({
  clientId,
  roleId,
  opportunityId,
  cancelPath
}) => (
  <StoryShell
    render={Component}
    queryParams={{
      company_id: roleId,
      client_id: clientId,
      opportunity_id: opportunityId,
      cancel_path: cancelPath
    }}
  />
)

export const Create = Template.bind({})
Create.args = {
  clientId: '',
  roleId: '3305789',
  opportunityId: '13616',
  cancelPath: ''
}
