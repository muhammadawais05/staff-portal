import { Container, Typography, Tag } from '@toptal/picasso'
import React from 'react'

import { JobSkillSet } from '../../../../../../types'
import { RecommendedSkill } from '../../types/recommended-skill'
import JobRecommendedSkillItem from '../JobRecommendedSkillItem'
import * as S from './styles'

export interface Props {
  jobId: string
  recommendedSkills: RecommendedSkill[]
  onAdd: (skill: JobSkillSet) => void
}

const JobRecommendedSkills = ({ jobId, recommendedSkills, onAdd }: Props) => (
  <div css={S.recommendedSkillsWrapper}>
    <Container bottom='small'>
      <Typography size='medium' weight='semibold'>
        Recommended Skills
      </Typography>
    </Container>
    <Tag.Group>
      {recommendedSkills.map(({ name, totalProfilesCount, requestId }) => (
        <JobRecommendedSkillItem
          key={name}
          jobId={jobId}
          name={name}
          totalProfilesCount={totalProfilesCount}
          requestId={requestId}
          onAdd={onAdd}
        />
      ))}
    </Tag.Group>
  </div>
)

export default JobRecommendedSkills
