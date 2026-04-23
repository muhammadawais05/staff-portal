import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import {
  SkillBadgedSearchInput,
  SkillRating
} from '@staff-portal/graphql/staff'

import SkillsFilterItem from '../SkillsFilterItem/SkillsFilterItem'
import * as S from './styles'

export interface Props {
  description: string
  skills: string[]
  onSkillSelect: (skill: SkillBadgedSearchInput) => void
  onSkillDeselect: (skillName: string) => void
  selectedSkills: SkillBadgedSearchInput[]
}

const SkillsFilter = ({
  description,
  skills,
  selectedSkills,
  onSkillSelect,
  onSkillDeselect
}: Props) => {
  if (!skills.length) {
    return null
  }

  // TODO: use Helpbox component once this issue is resolved:
  // https://toptal-core.atlassian.net/browse/FX-1824
  return (
    <Container
      variant='blue'
      rounded
      padded='medium'
      bottom='medium'
      data-testid='candidates-skills-filter'
    >
      <Container bottom='xsmall'>
        <Typography size='medium' weight='semibold' color='black'>
          This search was initiated from the Toptal request with the following
          requirements:
        </Typography>
        <Container bottom='small' top='small'>
          <Typography
            size='medium'
            variant='body'
            css={S.description}
            data-testid='gig-skills-filter-request-description'
          >
            {description}
          </Typography>
        </Container>
      </Container>
      <Container>
        {skills.map(skill => (
          <SkillsFilterItem
            key={skill}
            skill={skill}
            rating={SkillRating.EXPERT}
            checked={Boolean(selectedSkills.find(({ name }) => name === skill))}
            onSkillSelect={onSkillSelect}
            onSkillDeselect={onSkillDeselect}
          />
        ))}
      </Container>
    </Container>
  )
}

export default SkillsFilter
