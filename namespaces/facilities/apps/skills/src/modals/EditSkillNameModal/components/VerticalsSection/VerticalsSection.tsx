import React, { useState } from 'react'
import { Option } from '@toptal/picasso/Select'
import { Button, Container, Dropdown, Tabs, Section } from '@toptal/picasso'
import { Form, useFieldArray } from '@toptal/picasso-forms'
import { titleize } from '@staff-portal/string'

import { AddVerticalsMenu, SkillUsage, ParentSkillInput } from '../index'
import { SkillForm } from '../../types'
import { getAvailableVerticals } from '../../utils'
import { SkillsListFragment } from '../../data'
import { VerticalWithSkillCategoriesFragment } from '../../../../data/get-verticals-with-categories'

interface Props {
  skills: SkillsListFragment[]
  skillCategoriesOptionsByVertical: Record<string, Option[]>
  verticalsWithCategories: VerticalWithSkillCategoriesFragment[]
}

const VerticalsSection = ({
  skills,
  skillCategoriesOptionsByVertical,
  verticalsWithCategories
}: Props) => {
  const {
    fields: { value: skillsForm, push: addSkill }
  } = useFieldArray<SkillForm>('skills')

  const [currentTab, setCurrentTab] = useState(0)
  const currentSkill = skills[currentTab]
  const selectedVerticalId = skillsForm[currentTab].verticalId
  const selectedVerticalSkillForm = skillsForm[currentTab]
  const isIdentifierDisabled = !selectedVerticalSkillForm.isIdentifierUnmarkable
  const usedCategoryIds = skillsForm.map(({ categoryId }) => categoryId)
  const availableVerticals = getAvailableVerticals(
    usedCategoryIds,
    verticalsWithCategories
  )

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue)
  }

  const handleAddVertical = (verticalId: string, categoryId: string) => {
    addSkill({
      verticalId,
      categoryId,
      isIdentifierUnmarkable: true
    })
    setCurrentTab(usedCategoryIds.length)
  }

  const getVerticalCategoryId = (categoryId: string) => {
    return verticalsWithCategories.find(({ skillCategories }) => {
      return skillCategories.nodes.find(({ id }) => categoryId === id)
    })
  }

  return (
    <Section
      title='Verticals'
      actions={
        availableVerticals.length > 0 && (
          <Dropdown
            content={
              <AddVerticalsMenu
                availableVerticals={availableVerticals}
                onAddVertical={handleAddVertical}
              />
            }
          >
            <Button size='small' variant='secondary'>
              Add Vertical
            </Button>
          </Dropdown>
        )
      }
    >
      <Tabs value={currentTab} onChange={handleTabChange}>
        {skillsForm.map(skill => (
          <Tabs.Tab
            key={skill.categoryId}
            label={titleize(
              getVerticalCategoryId(skill.categoryId)?.talentType || ''
            )}
          />
        ))}
      </Tabs>
      <Container top='small'>
        <Form.Select
          enableReset
          name={`skills[${currentTab}].categoryId`}
          label='Skill Category'
          options={skillCategoriesOptionsByVertical[selectedVerticalId]}
          limit={200}
          placeholder='Choose Skill Category'
          width='full'
        />

        <Form.Checkbox
          name={`skills[${currentTab}].isIdentifier`}
          label='Is Skill Identifier'
          disabled={isIdentifierDisabled}
        />
        <SkillUsage skill={currentSkill} />

        <ParentSkillInput
          name={`skills[${currentTab}].parentSkillId`}
          skills={skills}
          currentSkillIndex={currentTab}
          currentVerticalId={selectedVerticalId}
        />
      </Container>
    </Section>
  )
}

export default VerticalsSection
