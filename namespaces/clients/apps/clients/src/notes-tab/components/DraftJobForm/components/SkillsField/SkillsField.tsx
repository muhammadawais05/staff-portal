import { Maybe } from '@staff-portal/graphql/staff'
import { useGetVerticalSkillsAutocomplete } from '@staff-portal/skills'
import { stringListToOptions } from '@staff-portal/string'
import { useTagSelector } from '@staff-portal/ui'
import { isNotNullish } from '@staff-portal/utils'
import { Form, useField, useForm } from '@toptal/picasso-forms'
import TagSelector, { Item } from '@toptal/picasso/TagSelector'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { DraftJobFormFields } from '../../../../enums/DraftJobFormFields'
import { DraftJobFragment } from '../../../DraftJobSection/data/draft-job-fragment'
import { getListItemDifference } from '../../utils/get-list-item-difference/get-list-item-difference'
import Field from '../Field'

const FIELD_NAME = DraftJobFormFields.Skills

const getItem = (skill: string): Item => ({
  value: skill,
  text: skill
})

const getValue = (item: Item | null) => (item?.text ? item?.text : '')

type VerticalWithSkills = { verticalId: string; skills: string[] }

type Props = {
  verticals: DraftJobFragment['verticals']
}

const DraftJobFormSkillsField = ({ verticals }: Props) => {
  const [verticalsWithSkills, setVerticalsWithSkills] = useState<
    VerticalWithSkills[]
  >([])

  const form = useForm()
  const {
    input: { value: formSkills }
  } = useField<Item[]>(FIELD_NAME)
  const {
    input: { value: selectedVerticalId }
  } = useField<string | null>(DraftJobFormFields.VerticalId)

  const getVerticalById = useCallback(
    (id: string) =>
      verticalsWithSkills.find(({ verticalId }) => verticalId === id),
    [verticalsWithSkills]
  )

  useEffect(() => {
    // populate the verticals' skills state
    const verticalWithSkillsList = verticals.edges.map(
      ({ node: vertical, skillSets: { nodes: skills } }) =>
        ({
          verticalId: vertical.id,
          skills: skills.map(({ skillName }) => skillName) ?? []
        } ?? [])
    )

    setVerticalsWithSkills(verticalWithSkillsList)
  }, [verticals.edges])

  useEffect(() => {
    if (selectedVerticalId) {
      // when changing the vertical, populate the skills list with the vertical's skills
      const skills = stringListToOptions(
        getVerticalById(selectedVerticalId)?.skills
      ) as Item[]

      form.change(FIELD_NAME, skills)
    }
  }, [form, getVerticalById, selectedVerticalId])

  const {
    getVerticalSkills,
    data: skills,
    loading
  } = useGetVerticalSkillsAutocomplete({
    verticalId: selectedVerticalId
  })

  const options = useMemo(
    () =>
      skills
        ?.map(({ node }) => (node ? getItem(node.name) : null))
        .filter((item): item is Item => isNotNullish(item)),
    [skills]
  )

  const tagSelectorProps = useTagSelector({
    options,
    loading,
    getOptions: getVerticalSkills
  })

  const addSkillToAllVerticals = useCallback(
    (skillName: string) => {
      const verticalWithSkillsList = verticalsWithSkills.map(
        ({ verticalId, skills: verticalSkills }) => {
          const skillList = verticalSkills

          if (
            skillList.every(
              name => name.toLowerCase() !== skillName.toLowerCase()
            )
          ) {
            skillList.push(skillName)
          }

          return {
            verticalId,
            skills: skillList
          }
        }
      )

      setVerticalsWithSkills(verticalWithSkillsList)
    },
    [verticalsWithSkills]
  )

  const removeSkill = useCallback(
    (skillName: string) => {
      const verticalsWithSkillsList = verticalsWithSkills.map(
        ({ verticalId, skills: verticalSkills }) => ({
          verticalId,
          skills: verticalSkills.filter(
            skill => skill.toLowerCase() !== skillName.toLowerCase()
          )
        })
      )

      setVerticalsWithSkills(verticalsWithSkillsList)
    },
    [verticalsWithSkills]
  )

  // custom skill not taken from suggestions
  const handleOtherOptionSelect = (name: string) => {
    const values: Maybe<Item[]> = formSkills
    const isUnique = values?.every(
      value => value?.text?.toLowerCase() !== name.toLowerCase()
    )

    if (isUnique) {
      addSkillToAllVerticals(name)

      form.change(FIELD_NAME, [...formSkills, { text: name, value: name }])
    }
  }

  const handleChange = useCallback(
    (items: Item[]) => {
      const removedSkillName = getListItemDifference({
        originalList: formSkills,
        compareList: items
      })?.text

      const newSkillName = getListItemDifference({
        originalList: items,
        compareList: formSkills
      })?.text

      if (newSkillName) {
        addSkillToAllVerticals(newSkillName)
      }

      if (removedSkillName) {
        removeSkill(removedSkillName)
      }
    },
    [addSkillToAllVerticals, formSkills, removeSkill]
  )

  return (
    <Field label='Required Skills'>
      <Form.TagSelector
        {...tagSelectorProps}
        options={options}
        name={FIELD_NAME}
        placeholder='Enter a required skill'
        noOptionsText='No results'
        width='full'
        allowNull
        getDisplayValue={getValue}
        getKey={getValue}
        showOtherOption
        onOtherOptionSelect={handleOtherOptionSelect}
        onChange={handleChange}
        renderLabel={({ displayValue, disabled }) => (
          <TagSelector.Label
            disabled={disabled}
            onDelete={() => removeSkill(displayValue)}
            titleCase={false}
          >
            {displayValue}
          </TagSelector.Label>
        )}
        data-testid='draft-job-form-skills-field'
      />
    </Field>
  )
}

export default DraftJobFormSkillsField
