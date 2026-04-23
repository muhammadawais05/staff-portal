import { useCallback } from 'react'
import { useForm } from '@toptal/picasso-forms'
import { SkillRating } from '@staff-portal/graphql/staff'

import { JobSkillSet } from '../types'

export interface Props {
  fieldValues: JobSkillSet[]
  fieldName: string
  push: (value: JobSkillSet) => void
  remove: (index: number) => JobSkillSet
}

const useHandleChangeSkills = ({
  fieldValues,
  fieldName,
  push,
  remove
}: Props) => {
  const { change } = useForm()

  const getSkillIndex = useCallback(
    (skillSets: JobSkillSet[], skillName: string) =>
      skillSets.findIndex(({ skill: { name } }) => name === skillName),
    []
  )

  const clearMainFlags = useCallback(() => {
    const index = fieldValues.findIndex(({ main }) => main)

    if (index > -1) {
      change(`${fieldName}[${index}].main`, false)
    }
  }, [change, fieldValues, fieldName])

  const onSkillSelect = useCallback(
    (skillSet: JobSkillSet, isMainSkill = false) => {
      if (isMainSkill) {
        clearMainFlags()
      }

      const index = getSkillIndex(fieldValues, skillSet.skill.name)

      if (index > -1) {
        change(`${fieldName}[${index}].destroy`, false)
        change(`${fieldName}[${index}].main`, isMainSkill)

        // Bump main skill from Competent, but keep Expert untouched
        if (
          isMainSkill &&
          fieldValues[index].rating === SkillRating.COMPETENT
        ) {
          change(`${fieldName}[${index}].rating`, skillSet.rating)
        }

        return
      }

      push({ ...skillSet, id: undefined })
    },
    [change, clearMainFlags, push, fieldValues, fieldName, getSkillIndex]
  )
  const handleMainSkillChange = useCallback(
    (skillName: string) => {
      const index = getSkillIndex(fieldValues, skillName)

      if (index < 0) {
        return
      }

      const mainSkillSet = fieldValues.find(({ main }) => main)

      if (mainSkillSet?.skill.name === skillName) {
        change(`${fieldName}[${index}].main`, false)

        return
      }

      clearMainFlags()

      change(`${fieldName}[${index}]`, {
        ...fieldValues[index],
        main: true
      })
    },
    [change, clearMainFlags, fieldValues, getSkillIndex, fieldName]
  )
  const handleSkillRatingChange = useCallback(
    (skillName: string, rating: SkillRating) => {
      const index = getSkillIndex(fieldValues, skillName)

      if (index < 0) {
        return
      }

      change(`${fieldName}[${index}].rating`, rating)
    },
    [change, fieldValues, fieldName, getSkillIndex]
  )
  const deleteSkill = useCallback(
    (skillName: string) => {
      const skillIndex = getSkillIndex(fieldValues, skillName)

      if ('destroy' in fieldValues[skillIndex]) {
        change(`${fieldName}[${skillIndex}]`, {
          ...fieldValues[skillIndex],
          destroy: true,
          main: false
        })

        return
      }

      remove(skillIndex)
    },
    [change, remove, fieldValues, fieldName, getSkillIndex]
  )
  const handleSkillRequiredChange = useCallback(
    (skillName: string) => {
      const index = getSkillIndex(fieldValues, skillName)

      if (index < 0) {
        return
      }

      const currentNiceToHave = fieldValues[index].niceToHave

      change(
        `${fieldName}[${index}].niceToHave`,
        currentNiceToHave === undefined ? false : !currentNiceToHave
      )
    },
    [change, fieldValues, fieldName, getSkillIndex]
  )

  return {
    onSkillSelect,
    handleMainSkillChange,
    handleSkillRatingChange,
    deleteSkill,
    handleSkillRequiredChange
  }
}

export default useHandleChangeSkills
