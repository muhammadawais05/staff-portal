import React, { useMemo } from 'react'
import { useFieldArray, useField } from '@toptal/picasso-forms'
import {
  JobSkillSet,
  useHandleChangeSkills,
  JobSkillsList,
  OtherSkillsAutocomplete,
  JobIndustriesField
} from '@staff-portal/jobs'
import { SkeletonLoader } from '@toptal/picasso'
import { GridItemField } from '@staff-portal/ui'
import {
  useGetVerticalCoreSkills,
  VerticalSkillFragment
} from '@staff-portal/skills'

import { useGetVertical } from './data/get-vertical.staff.gql'

const JobCreateSkillsAndIndustries = () => {
  const {
    input: { value: verticalId }
  } = useField<string>('verticalId', {
    subscription: { value: true }
  })

  const { data: selectedVertical, loading } = useGetVertical(verticalId)

  const {
    fields: { value: jobSkillSets, push, remove }
  } = useFieldArray<JobSkillSet>('skillSets', {
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

  const { coreSkills: verticalCoreSkills } = useGetVerticalCoreSkills({
    verticalId
  })

  const coreSkillsOptions = useMemo(
    () =>
      verticalCoreSkills
        ?.flatMap(
          (coreSkill: { skills: { nodes: VerticalSkillFragment[] } }) =>
            coreSkill.skills.nodes[0]
        )
        .sort((skillA: VerticalSkillFragment, skillB: VerticalSkillFragment) =>
          skillA.name.localeCompare(skillB.name)
        ),
    [verticalCoreSkills]
  )

  if (loading && !selectedVertical) {
    return (
      <>
        {Array.from(Array(6).keys()).map(item => (
          <GridItemField
            key={item}
            label={<SkeletonLoader.Header />}
            size='medium'
          >
            <SkeletonLoader.Typography rows={3} />
          </GridItemField>
        ))}
      </>
    )
  }

  return (
    <>
      <GridItemField>
        <OtherSkillsAutocomplete
          defaultSkillCategoryId={selectedVertical?.defaultSkillCategory.id}
          defaultSkillCategoryTitle={
            selectedVertical?.defaultSkillCategory.title
          }
          verticalId={verticalId}
          onChange={onSkillSelect}
          name='skillSets'
          label='Enter all of the skills and technologies required for this position.'
          hint='Please also be sure to specify the level of expertise needed for each skill.'
          placeholder='Add skills...'
          titleCase={false}
        />
      </GridItemField>

      <JobSkillsList
        skills={jobSkillSets}
        coreSkills={coreSkillsOptions}
        onMainSkillChange={handleMainSkillChange}
        onSkillRatingChange={handleSkillRatingChange}
        onDelete={deleteSkill}
        onSkillRequiredChange={handleSkillRequiredChange}
        selectedVertical={selectedVertical}
      />

      <JobIndustriesField />
    </>
  )
}

export default JobCreateSkillsAndIndustries
