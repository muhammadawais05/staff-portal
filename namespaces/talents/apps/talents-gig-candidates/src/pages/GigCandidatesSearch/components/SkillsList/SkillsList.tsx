import React from 'react'
import pluralize from 'pluralize'
import { Container, Typography, Tooltip } from '@toptal/picasso'

import * as S from './styles'
import { SkillPair } from '../../types'
import { useGigsContext } from '../../contexts/gig-candidates-context'
import SkillTags, { WhiteTag } from '../SkillTags/SkillTags'

interface Props {
  skills: string[]
  talentSkills?: SkillPair[]
}

const SkillsList = ({ skills, talentSkills }: Props) => {
  const { selectedSkills } = useGigsContext()

  const skillsUsedInSearch = selectedSkills
    .filter(skill => skills.includes(skill.name))
    .map(({ name }) => ({
      name,
      rating: talentSkills?.find(talentSkill => talentSkill.name === name)
        ?.rating
    }))
  const skillsNotUsedInSearch =
    skills.filter(
      skill => !selectedSkills.map(({ name }) => name).includes(skill)
    ) || []
  const skillsThatTalentDoesntHave = skillsNotUsedInSearch
    .filter(skill => !talentSkills?.map(({ name }) => name).includes(skill))
    .map(skill => ({
      name: skill
    }))
  const skillsThatTalentHas =
    talentSkills?.filter(skill =>
      skillsNotUsedInSearch?.includes(skill.name)
    ) || []

  const displayTooltip = skillsNotUsedInSearch.length > 0

  return (
    <Container css={S.container} data-testid='skills-list'>
      <SkillTags skills={skillsUsedInSearch} />
      {displayTooltip && (
        <Tooltip
          placement='bottom'
          content={
            <>
              <Container>
                <Typography weight='semibold' size='small' color='black'>
                  Other Skills
                </Typography>
              </Container>
              {skillsThatTalentHas.length > 0 && (
                <Container>
                  <Container bottom='xsmall'>
                    <Typography size='xsmall'>In the talent profile</Typography>
                  </Container>
                  <SkillTags skills={skillsThatTalentHas} />
                </Container>
              )}
              {skillsThatTalentDoesntHave.length > 0 && (
                <Container top='xsmall'>
                  <Container bottom='xsmall'>
                    <Typography size='xsmall'>
                      Skills that are not in the talent profile
                    </Typography>
                  </Container>
                  <SkillTags
                    skills={skillsThatTalentDoesntHave}
                    disableNoRating
                  />
                </Container>
              )}
            </>
          }
        >
          <Container>
            <WhiteTag
              name={`+${skillsNotUsedInSearch.length} ${pluralize(
                'skill',
                skillsNotUsedInSearch.length
              )}`}
              data-testid='extra-skills'
            />
          </Container>
        </Tooltip>
      )}
    </Container>
  )
}

export default SkillsList
