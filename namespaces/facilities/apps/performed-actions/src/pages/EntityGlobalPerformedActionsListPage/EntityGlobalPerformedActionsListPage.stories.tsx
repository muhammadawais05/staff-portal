import React from 'react'
import { Story, StoryShell } from '@staff-portal/story-shell'

import Component from './EntityGlobalPerformedActionsListPage'
import { PERFORMED_ACTION_ENTITIES_DATA } from './config'
import { PerformedActionPathEntityType } from './types'

const entityTypes = Object.keys(
  PERFORMED_ACTION_ENTITIES_DATA
) as PerformedActionPathEntityType[]

export default {
  title: 'Facilities/Performed Actions/Pages/Entity Global List',
  args: {
    entityType: entityTypes[0]
  },
  argTypes: {
    entityType: {
      options: entityTypes,
      control: { type: 'radio' }
    }
  }
}

const Template: Story<{ entityType: PerformedActionPathEntityType }> = ({
  entityType
}) => <StoryShell render={Component} params={{ entityType }} />

export const EntityGlobalList = Template.bind({})
EntityGlobalList.args = { entityType: entityTypes[0] }
