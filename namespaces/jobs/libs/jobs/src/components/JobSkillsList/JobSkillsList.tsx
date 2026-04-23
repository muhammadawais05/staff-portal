import React, { ComponentProps, useMemo } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { AsteriskSolid16 } from '@toptal/picasso/Icon'
import { GridItemField } from '@staff-portal/ui'

import { JobEditVerticalFragment } from '../../data'
import SkillList from '../SkillList'
import SkillListItem from '../SkillListItem'

interface Props extends ComponentProps<typeof SkillList> {
  selectedVertical?: JobEditVerticalFragment | null
  gridItemFieldSize?: ComponentProps<typeof GridItemField>['size']
}
const JobSkillsList = ({
  skills,
  coreSkills,
  onMainSkillChange,
  onSkillRatingChange,
  onDelete,
  onSkillRequiredChange,
  selectedVertical,
  gridItemFieldSize
}: Props) => {
  const isCheckboxVisible = (skillName: string) =>
    !!coreSkills?.some(({ name }) => name === skillName)

  const skillCategories = useMemo(() => {
    return (
      selectedVertical &&
      [...selectedVertical.skillCategories.nodes]
        .filter(vertical => vertical.title !== 'Industry Expertise')
        .sort(
          (verticalA, verticalB) =>
            (verticalA.position || 0) - (verticalB.position || 0)
        )
    )
  }, [selectedVertical])

  const shouldRenderSkillItem = ({
    destroy,
    skillCategoryTitle,
    categoryTitle
  }: {
    destroy?: boolean
    skillCategoryTitle: string
    categoryTitle: string
  }) => !destroy && skillCategoryTitle === categoryTitle

  return (
    <>
      {!!skillCategories?.length &&
        skillCategories.map(category => (
          <GridItemField
            label={category.title}
            key={category.id}
            size={gridItemFieldSize}
          >
            {skills.map(
              skillSet =>
                shouldRenderSkillItem({
                  destroy: skillSet.destroy,
                  skillCategoryTitle: skillSet.skill.category.title,
                  categoryTitle: category.title
                }) && (
                  <SkillListItem
                    key={skillSet.skill.name}
                    skillSet={skillSet}
                    showCheckbox={isCheckboxVisible(skillSet.skill.name)}
                    onMainSkillChange={onMainSkillChange}
                    onSkillRatingChange={onSkillRatingChange}
                    onDelete={onDelete}
                    onSkillRequiredChange={onSkillRequiredChange}
                    shouldRenderRatingCount={false}
                  />
                )
            )}
            <Container top='xsmall'>
              <Typography
                size='small'
                color='dark-grey'
                data-testid='job-skills-list-category'
              >
                {category.description ||
                  `Skills that don't fit into other categories`}
              </Typography>
            </Container>
          </GridItemField>
        ))}

      <GridItemField size={gridItemFieldSize}>
        <Typography size='small'>
          To mark skills as required click on an asterisk (<AsteriskSolid16 />)
          icon.
        </Typography>
      </GridItemField>
    </>
  )
}

export default JobSkillsList
