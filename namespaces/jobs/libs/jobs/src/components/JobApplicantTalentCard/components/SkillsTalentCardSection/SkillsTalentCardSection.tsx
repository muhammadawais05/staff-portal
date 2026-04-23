import React from 'react'
import { Section, Tag } from '@toptal/picasso'

import { SkillItemsTalentPitchFragment } from '../../data/get-job-application-talent-card'
import TalentCardSkillTag from '../TalentCardSkillTag'

type Props = {
  skillItems?: SkillItemsTalentPitchFragment['skillItems'] | null
}

const SkillsTalentCardSection = ({ skillItems }: Props) => {
  const skills = skillItems?.nodes

  if (!skills?.length) {
    return null
  }

  return (
    <Section
      data-testid='skills-talent-card-section'
      title='Skills (Years)'
      titleSize='small'
    >
      <Tag.Group>
        {skills.map(skill => (
          <TalentCardSkillTag
            key={skill.skillSet.id}
            title={skill.title}
            experience={skill.skillSet.experience}
          />
        ))}
      </Tag.Group>
    </Section>
  )
}

export default SkillsTalentCardSection
