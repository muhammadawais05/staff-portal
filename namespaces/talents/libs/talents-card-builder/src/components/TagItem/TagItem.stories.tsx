import React from 'react'
// import { BaseDecorator } from '@toptal/talent-portal-storybook'

import TagItem from '.'

export default {
  title: 'Application card/TagItem'
  // decorators: [BaseDecorator]
}

export const Default = () => (
  <TagItem selected={false} name='Tag Name' onClick={() => {}} />
)
