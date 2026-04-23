import React from 'react'
import { Story, StoryShell } from '@staff-portal/story-shell'

import Component from './EntityPerformedActionsListPage'
import { PERFORMED_ACTION_ENTITIES_DATA } from './config'
import { PerformedActionPathEntityType } from './types'

const entityTypes = Object.keys(
  PERFORMED_ACTION_ENTITIES_DATA
) as PerformedActionPathEntityType[]

export default {
  title: 'Facilities/Performed Actions/Pages/Entity List',
  args: {
    entityType: entityTypes[0],
    id: '608107'
  },
  argTypes: {
    entityType: {
      options: entityTypes,
      control: { type: 'radio' }
    },
    id: {
      control: { type: 'text' }
    }
  }
}

interface Props {
  entityType: PerformedActionPathEntityType
  id: string
}

const Template: Story<Props> = ({ id, entityType }) => (
  <StoryShell render={Component} params={{ entityType, entityId: id }} />
)

export const EntityList = Template.bind({})
EntityList.args = {
  entityType: entityTypes[0],
  id: '608107'
}
