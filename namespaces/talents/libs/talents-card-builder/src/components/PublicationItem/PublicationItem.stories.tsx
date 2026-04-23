import React from 'react'
// import { BaseDecorator } from '@toptal/talent-portal-storybook'

import PublicationItem from '.'

export default {
  title: 'Application card/PublicationItem'
  // decorators: [BaseDecorator]
}

export const Default = () => (
  <PublicationItem
    toggle={() => {}}
    highlighted={false}
    item={{
      id: 'publication1',
      title: 'This is example publication.',
      url: 'https://toptal.com',
      excerpt: ''
    }}
  />
)

export const Highlighted = () => (
  <PublicationItem
    toggle={() => {}}
    highlighted
    item={{
      id: 'publication1',
      title: 'This is example publication.',
      url: 'https://toptal.com',
      excerpt: ''
    }}
  />
)
