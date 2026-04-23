import { Check16, Container, Exclamation16, Typography } from '@toptal/picasso'
import React, { useMemo } from 'react'
import { SkillRating } from '@staff-portal/graphql/staff'

import { SkillFragment } from '../../data'
import { JobSkillSet } from '../../types'
import SkillListItem from '../SkillListItem'
import * as S from './styles'
import { splitUnknownAndConfirmedSkills } from '../../utils/split-unknown-and-confirmed-skills'

interface Props {
  skills: JobSkillSet[]
  coreSkills?: SkillFragment[]
  onMainSkillChange: (skillName: string) => void
  onSkillRatingChange: (skillName: string, value: SkillRating) => void
  onDelete: (skillName: string) => void
  onSkillRequiredChange: (skillName: string) => void
}

const SkillList = ({
  skills,
  coreSkills,
  onMainSkillChange,
  onSkillRatingChange,
  onDelete,
  onSkillRequiredChange
}: Props) => {
  const [confirmedSkills, unknownSkills] = useMemo(
    () => splitUnknownAndConfirmedSkills(skills),
    [skills]
  )

  const displaySkillList = (skillList?: JobSkillSet[]) => (
    <div css={S.skillsListWrapper}>
      {skillList?.map(skillSet => (
        <SkillListItem
          key={skillSet.skill.name}
          skillSet={skillSet}
          showCheckbox={isCheckboxVisible(skillSet.skill.name)}
          onMainSkillChange={onMainSkillChange}
          onSkillRatingChange={onSkillRatingChange}
          onDelete={onDelete}
          onSkillRequiredChange={onSkillRequiredChange}
        />
      ))}
    </div>
  )

  const isCheckboxVisible = (skillName: string) =>
    coreSkills?.some(({ name }) => name === skillName) ?? false

  const filteredConfirmedSkills = confirmedSkills?.filter(
    ({ destroy }) => !destroy
  )
  const filteredUnknownSkills = unknownSkills?.filter(({ destroy }) => !destroy)

  return (
    <>
      {filteredConfirmedSkills.length > 0 && (
        <Container bottom='small'>
          <Container bottom='small'>
            <Typography size='medium' weight='semibold'>
              <Check16 color='green' />
              <Container as='span' left='xsmall'>
                Confirmed Skills
              </Container>
            </Typography>
          </Container>

          {displaySkillList(filteredConfirmedSkills)}
        </Container>
      )}

      {filteredUnknownSkills.length > 0 && (
        <Container>
          <Container bottom='small'>
            <Typography size='medium' weight='semibold'>
              <Exclamation16 color='red' />
              <Container as='span' left='xsmall'>
                Unknown Skills
              </Container>
            </Typography>
          </Container>

          {displaySkillList(filteredUnknownSkills)}
        </Container>
      )}
    </>
  )
}

export default SkillList
