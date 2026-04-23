import React, { useState } from 'react'
import { Typography, Accordion, List } from '@toptal/picasso'

import * as S from './styles'
import { CandidateEmploymentFragment } from '../../data/get-candidate-profile/get-candidate-profile.staff.gql.types'
import { SkillPair } from '../../../../types'
import SkillsList from '../../../../components/SkillsList'

interface Props {
  employment: CandidateEmploymentFragment
  talentSkills?: SkillPair[]
}

const EmploymentItem = ({ employment, talentSkills }: Props) => {
  const [expanded, setExpanded] = useState(false)
  const { company, startYear, endYear, position, skills, experienceItems } =
    employment

  return (
    <Accordion
      data-testid='employment-item'
      css={S.accordion}
      content={
        <List variant='unordered' data-testid='employment-content'>
          {experienceItems.map(item => (
            <List.Item key={item}>{item}</List.Item>
          ))}
        </List>
      }
      onChange={(_, open) => setExpanded(open)}
      expanded={expanded}
      borders='none'
    >
      <Accordion.Summary css={S.summaryContainer}>
        <div css={S.employmentContainer}>
          <Typography
            size='medium'
            weight='semibold'
            data-testid='talent-employment-position'
            color='dark-grey'
          >
            {position}
          </Typography>
          <Typography
            size='medium'
            color='dark-grey'
            data-testid='talent-employment-company'
          >
            {company} • {startYear} &ndash; {endYear || 'PRESENT'}
          </Typography>
        </div>
        <SkillsList
          skills={skills.nodes.map(({ name }) => name)}
          talentSkills={talentSkills}
        />
      </Accordion.Summary>
    </Accordion>
  )
}

export default EmploymentItem
