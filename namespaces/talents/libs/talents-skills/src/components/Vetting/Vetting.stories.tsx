import React from 'react'
import Picasso from '@toptal/picasso-provider'
import { Meta, ComponentStory } from '@storybook/react'
import { Container } from '@toptal/picasso'

import Vetting from './Vetting'
import VettingDocs from './Vetting.mdx'

export default {
  title: 'Talents/Skills/Vetting',
  component: Vetting,
  decorators: [Story => <Picasso>{Story()}</Picasso>],
  parameters: {
    docs: {
      page: VettingDocs
    },
    viewMode: 'docs'
  }
} as Meta

export const Top25: ComponentStory<typeof Vetting> = args => (
  <Container {...args}>
    <Vetting
      label='Toptal work hours'
      value={293}
      threshold25={250}
      threshold75={150}
    />
  </Container>
)

export const Between25And75: ComponentStory<typeof Vetting> = args => (
  <Container {...args}>
    <Vetting
      label='Skill connections'
      value={5}
      threshold25={5}
      threshold75={8}
    />
  </Container>
)

export const Bottom25: ComponentStory<typeof Vetting> = args => (
  <Container {...args}>
    <Vetting
      label='Skill engagements'
      value={36}
      threshold25={40}
      threshold75={50}
    />
  </Container>
)
