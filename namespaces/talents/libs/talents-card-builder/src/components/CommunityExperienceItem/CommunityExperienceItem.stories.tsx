import React from 'react'
import { Container } from '@toptal/picasso'
// import { BaseDecorator } from '@toptal/talent-portal-storybook'

import CommunityExperienceItem from '.'

export default {
  title: 'Application card/CommunityExperienceItem'
  // decorators: [BaseDecorator]
}

export const Default = () => (
  <Container flex>
    <CommunityExperienceItem
      icon='ICON'
      topText='This is the top text'
      bottomText='This is the bottom text'
    />
  </Container>
)
