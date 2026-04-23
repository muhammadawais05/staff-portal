import React from 'react'
import { Section, Tag } from '@toptal/picasso'

import TalentCardSkillTag from '../TalentCardSkillTag'
import { IndustryItemsTalentPitchFragment } from '../../data/get-job-application-talent-card'

type Props = {
  industryItems?: IndustryItemsTalentPitchFragment['industryItems'] | null
}

const IndustriesTalentCardSection = ({ industryItems }: Props) => {
  const industries = industryItems?.nodes

  if (!industries?.length) {
    return null
  }

  return (
    <Section
      data-testid='industries-talent-card-section'
      title='Industries'
      titleSize='small'
    >
      <Tag.Group>
        {industries.map(industry => (
          <TalentCardSkillTag key={industry.title} title={industry.title} />
        ))}
      </Tag.Group>
    </Section>
  )
}

export default IndustriesTalentCardSection
