import React, { useRef, useMemo, useEffect } from 'react'
import {
  MainSkillSelect,
  JobSkillSet,
  useHandleChangeSkills,
  JobSkillsList,
  OtherSkillsAutocomplete,
  SkillFragment
} from '@staff-portal/jobs'
import { useFieldArray, useField } from '@toptal/picasso-forms'
import { SkillRating } from '@staff-portal/graphql/staff'
import { GridItemField } from '@staff-portal/ui'
import {
  useGetVerticalCoreSkills,
  VerticalSkillFragment
} from '@staff-portal/skills'

import { useGetVerticals, useGetVerticalSkillsAutocomplete } from './data'

export interface Props {
  defaultSkillCategoryId: string
  defaultSkillCategoryTitle: string
  initialCoreSkills?: SkillFragment[]
}

// eslint-disable-next-line max-lines-per-function, complexity,  max-statements
const JobSkillsFields = ({
  defaultSkillCategoryId,
  defaultSkillCategoryTitle,
  initialCoreSkills
}: Props) => {
  const { verticals } = useGetVerticals()

  const {
    input: { value: verticalIdValue }
  } = useField<string>('verticalId', {
    subscription: { value: true }
  })

  const {
    fields: { value: jobSkillSets, push, remove }
  } = useFieldArray<JobSkillSet>('skillSets', {
    subscription: { value: true }
  })

  const {
    input: { onChange: setSkills }
  } = useField<JobSkillSet[]>('skillSets', {
    subscription: { value: true }
  })

  const {
    onSkillSelect,
    handleMainSkillChange,
    handleSkillRatingChange,
    deleteSkill,
    handleSkillRequiredChange
  } = useHandleChangeSkills({
    fieldValues: jobSkillSets,
    fieldName: 'skillSets',
    push,
    remove
  })

  const selectedVertical =
    verticals?.find(vertical => vertical.id === verticalIdValue) ??
    verticals?.[0]

  const verticalId = selectedVertical?.id as string

  const verticalIdRef = useRef(verticalId)

  const skillNames = useMemo(
    () => jobSkillSets.map(({ skill }) => skill.name),
    [jobSkillSets]
  )
  const { coreSkills: verticalCoreSkills } = useGetVerticalCoreSkills({
    verticalId,
    skip: !verticalId
  })
  const { data: verticalSkillsData, loading: isVerticalSkillLoading } =
    useGetVerticalSkillsAutocomplete({
      verticalId,
      exactNames: skillNames,
      // We want to load *all* skill categories for the currently selected
      // vertical.
      limit: skillNames.length,
      skip: !verticalId
    })

  const coreSkillsOptions = useMemo(() => {
    return verticalCoreSkills
      ?.flatMap(
        (coreSkill: { skills: { nodes: VerticalSkillFragment[] } }) =>
          coreSkill.skills.nodes[0]
      )
      .sort((skillA: VerticalSkillFragment, skillB: VerticalSkillFragment) =>
        skillA.name.localeCompare(skillB.name)
      )
  }, [verticalCoreSkills])

  useEffect(() => {
    if (
      !isVerticalSkillLoading &&
      verticalSkillsData &&
      verticalIdRef.current !== verticalId
    ) {
      const updatedSkills = jobSkillSets.map(skillSet => {
        const verticalSkill = verticalSkillsData?.find(
          // When changing verticals, skills are matched by name
          skill => skill.node?.name === skillSet.skill.name
        )

        const newCategory = verticalSkill?.node
          ? verticalSkill.node.category
          : selectedVertical?.defaultSkillCategory

        // Update category but keep all other field data to keep local changes
        return {
          ...skillSet,
          skill: {
            ...skillSet.skill,
            category: newCategory
          }
        }
      })

      setSkills(updatedSkills)
      verticalIdRef.current = verticalId
    }
  }, [
    isVerticalSkillLoading,
    jobSkillSets,
    selectedVertical?.defaultSkillCategory,
    setSkills,
    verticalId,
    verticalSkillsData
  ])

  return (
    <>
      <GridItemField>
        <MainSkillSelect
          name='mainSkillId'
          skills={coreSkillsOptions || initialCoreSkills}
          loading={isVerticalSkillLoading}
          onChange={skill => onSkillSelect(skill, true)}
          label='Enter the Main Skill or Technology Required for This Position.'
          hint='Please also be sure to specify the level of expertise needed for the skill.'
          defaultSkillRating={SkillRating.EXPERT}
        />
      </GridItemField>

      <GridItemField>
        <OtherSkillsAutocomplete
          verticalId={verticalId}
          defaultSkillCategoryId={defaultSkillCategoryId}
          defaultSkillCategoryTitle={defaultSkillCategoryTitle}
          onChange={onSkillSelect}
          label='Enter Other Skills and Technologies Required for This Position.'
          name='skillSets'
          hint='Please also be sure to specify the level of expertise needed for each skill.'
          placeholder='Type skills...'
        />
      </GridItemField>

      <JobSkillsList
        skills={jobSkillSets}
        coreSkills={coreSkillsOptions || initialCoreSkills}
        onMainSkillChange={handleMainSkillChange}
        onSkillRatingChange={handleSkillRatingChange}
        onDelete={deleteSkill}
        onSkillRequiredChange={handleSkillRequiredChange}
        selectedVertical={selectedVertical}
      />
    </>
  )
}

export default JobSkillsFields
