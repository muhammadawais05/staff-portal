import React, { useState } from 'react'
import { Typography, TypographyOverflow, Accordion } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'

import * as S from './styles'
import { CandidatePortfolioFragment } from '../../data/get-candidate-profile/get-candidate-profile.staff.gql.types'
import { SkillPair } from '../../../../types'
import SkillsList from '../../../../components/SkillsList'

interface Props {
  project: CandidatePortfolioFragment
  talentSkills?: SkillPair[]
}

const ProjectItem = ({ project, talentSkills }: Props) => {
  const [expanded, setExpanded] = useState(false)
  const { title, link, description, skills: projectSkills } = project
  const hasSkills = projectSkills.nodes.length > 0

  const skills = projectSkills?.nodes
    ? projectSkills.nodes.map(({ name }) => name)
    : []

  return (
    <Accordion
      css={S.accordion}
      content={
        <Typography size='medium' data-testid='project-full-description'>
          {description}
        </Typography>
      }
      onChange={(_, open) => setExpanded(open)}
      expanded={expanded}
      borders='none'
      data-testid='project-item'
    >
      <Accordion.Summary
        css={S.summaryContainer}
        data-testid='accordion-summary'
      >
        <div css={S.projectContainer}>
          <Typography
            size='medium'
            weight='semibold'
            data-testid='talent-project-title'
            color='dark-grey'
          >
            {title}
          </Typography>
          {link && (
            <Typography size='medium'>
              <Link data-testid='project-link' href={link}>
                {link}
              </Link>
            </Typography>
          )}
          {!expanded && (
            <TypographyOverflow
              size='medium'
              data-testid='project-trimmed-description'
            >
              {description}
            </TypographyOverflow>
          )}
        </div>
        {hasSkills && (
          <SkillsList skills={skills} talentSkills={talentSkills} />
        )}
      </Accordion.Summary>
    </Accordion>
  )
}

export default ProjectItem
