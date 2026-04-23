import React from 'react'
import Picasso from '@toptal/picasso-provider'
import { Meta, ComponentStory } from '@storybook/react'

import SkillTagTooltipVetting from './SkillTagTooltipVetting'
import SkillTagTooltipVettingDocs from './SkillTagTooltipVetting.mdx'
import { VettedResult, VettingType } from '../../types'

export default {
  title: 'Talents/Skills/SkillTagTooltipVetting',
  decorators: [Story => <Picasso>{Story()}</Picasso>],
  component: SkillTagTooltipVetting,
  parameters: {
    docs: {
      page: SkillTagTooltipVettingDocs
    },
    viewMode: 'docs'
  }
} as Meta

const vettedResult: VettedResult = {
  type: VettingType.Vetted,
  workingHoursCount: 293,
  skillConnectionsCount: 5,
  engagementsCount: 36,
  quartiles: {
    workingHours25: 250,
    workingHours75: 150,
    skillConnections25: 5,
    skillConnections75: 8,
    engagements25: 40,
    engagements75: 50
  },
  performerName: 'John Doe',
  formattedCreatedAt: 'Aug 21, 2021',
  comment: 'Vetted as expert beacuse of the lorem ipsum dolor sit amet.'
}

const notVettedResult: VettedResult = {
  type: VettingType.NotVetted,
  message: 'Not yet vetted due to not enough data to calculate quartiles.'
}

export const WithVettedResult: ComponentStory<
  typeof SkillTagTooltipVetting
> = () => <SkillTagTooltipVetting vettedResult={vettedResult} />

export const NotVettedResult: ComponentStory<
  typeof SkillTagTooltipVetting
> = () => <SkillTagTooltipVetting vettedResult={notVettedResult} />
