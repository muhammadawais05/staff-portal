import React from 'react'
import { Tag, Container } from '@toptal/picasso'
import { AsteriskSolid16, ArrowSubdirectory16 } from '@toptal/picasso/Icon'
import { Link } from '@staff-portal/navigation'
import { SkillRating } from '@staff-portal/graphql/staff'
import {
  getTalentsSearchPathBySkill,
  getJobsSearchPathBySkill
} from '@staff-portal/routes'
import { WrapWithTooltip } from '@staff-portal/ui'

import { JobSkillSetFragment } from '../../data'
import * as S from './styles'
import { useGetJobSkillTagPermissions } from './data/get-job-skill-tag-permissions'

export interface Props {
  skillSet: JobSkillSetFragment
  enableTooltip?: boolean
  showRequiredIcon?: boolean
}

const JobSkillTag = ({
  skillSet,
  enableTooltip = true,
  showRequiredIcon = true
}: Props) => {
  const { id, main, skill, rating, niceToHave } = skillSet
  const { permits } = useGetJobSkillTagPermissions()

  const required = !niceToHave
  const searchTalentUrl = getTalentsSearchPathBySkill(skill.name, rating)
  const searchJobUrl = getJobsSearchPathBySkill(skill.name)
  const tooltip = required ? 'Required Skill' : 'Optional Skill'

  const css = [
    S.skillTag,
    rating === SkillRating.COMPETENT && S.competentSkill,
    rating === SkillRating.STRONG && S.strongSkill,
    rating === SkillRating.EXPERT && S.expertSkill
  ]

  return (
    <Link
      href={permits?.canViewTalent ? searchTalentUrl : searchJobUrl}
      noUnderline
      css={S.inlineTagLink}
      key={id}
      data-testid={id}
    >
      <WrapWithTooltip
        enableTooltip={enableTooltip}
        interactive
        content={tooltip}
        data-testid='job-skill-tag:tooltip'
      >
        <Tag
          css={css}
          titleCase={false}
          icon={
            required && showRequiredIcon ? (
              <AsteriskSolid16
                css={S.yellowAsterisk}
                data-testid='job-skill-tag:required-icon'
              />
            ) : undefined
          }
          data-testid='job-skill-tag'
        >
          <Container flex alignItems='center' gap='xsmall'>
            {main && (
              <ArrowSubdirectory16 data-testid='job-skill-tag:main-icon' />
            )}
            <Container css={S.skillName}>{skill.name}</Container>
          </Container>
        </Tag>
      </WrapWithTooltip>
    </Link>
  )
}

export default JobSkillTag
