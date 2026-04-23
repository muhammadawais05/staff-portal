import React from 'react'
// import { BaseDecorator } from '@toptal/talent-portal-storybook'

import PublicationItemPreview from '.'

export default {
  title: 'Application card/PublicationItemPreview'
  // decorators: [BaseDecorator]
}

export const Default = () => (
  <PublicationItemPreview
    item={{
      id: 'publication1',
      title: 'This is example publication.',
      url: 'https://toptal.com',
      excerpt: ''
    }}
  />
)

export const Highlighted = () => (
  <PublicationItemPreview
    item={{
      id: 'publication1',
      title: 'This is example publication.',
      url: 'https://toptal.com',
      excerpt: ''
    }}
  />
)
