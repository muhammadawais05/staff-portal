import React from 'react'
// import { BaseDecorator } from '@toptal/talent-portal-storybook'

import MentorProgramItem from '.'

export default {
  title: 'Application card/MentorProgramItem'
  // decorators: [BaseDecorator]
}

export const Default = () => (
  <MentorProgramItem
    toggle={() => {}}
    highlighted={false}
    fullName='Talent Name'
  />
)

export const Highlighted = () => (
  <MentorProgramItem toggle={() => {}} highlighted fullName='Talent Name' />
)
