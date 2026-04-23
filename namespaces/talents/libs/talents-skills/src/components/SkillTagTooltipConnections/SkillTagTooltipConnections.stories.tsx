import React from 'react'
import Picasso from '@toptal/picasso-provider'
import { Meta, ComponentStory } from '@storybook/react'

import SkillTagTooltipConnections from './SkillTagTooltipConnections'
import SkillTagTooltipConnectionsDocs from './SkillTagTooltipConnections.mdx'
import { SkillConnection } from '../../types'

export default {
  title: 'Talents/Skills/SkillTagTooltipConnections',
  component: SkillTagTooltipConnections,
  decorators: [Story => <Picasso>{Story()}</Picasso>],
  parameters: {
    docs: {
      page: SkillTagTooltipConnectionsDocs
    },
    viewMode: 'docs'
  }
} as Meta

const skillConnections: SkillConnection[] = [
  {
    title: 'Employment history',
    count: 3,
    items: [
      'Data Products Consultant, Various Clients via TPX Impact · 2020 - Present',
      'Tech Lead and Full-stack Developer, Syncronia Srl • 2015-2020',
      'Global Head of Product Management and Digital Assurance, Hexaware Technologies, Inc. · 2013 - 2015'
    ]
  },
  {
    title: 'Projects',
    count: 2,
    items: [
      'Flight Search App Research and Prototyping',
      'Casino Bonus Club | CMS, Web, and App'
    ]
  },
  {
    title: 'Education',
    count: 1,
    items: ["Bachelor's Degree — Università di Bologna"]
  },
  {
    title: 'Preferred environment',
    count: 1
  }
]

export const Default: ComponentStory<
  typeof SkillTagTooltipConnections
> = () => <SkillTagTooltipConnections skillConnections={skillConnections} />
