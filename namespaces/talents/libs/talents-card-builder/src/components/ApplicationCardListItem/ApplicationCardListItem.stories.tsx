import React from 'react'
// import { BaseDecorator } from '@toptal/talent-portal-storybook'

import ApplicationCardListItem from '.'

export default {
  title: 'Application card/ApplicationCardListItem'
  // decorators: [BaseDecorator]
}

export const Default = () => (
  <ApplicationCardListItem onClick={() => {}} highlighted={false}>
    This is the item content
  </ApplicationCardListItem>
)

export const Highlighted = () => (
  <ApplicationCardListItem onClick={() => {}} highlighted>
    This is the item content
  </ApplicationCardListItem>
)
