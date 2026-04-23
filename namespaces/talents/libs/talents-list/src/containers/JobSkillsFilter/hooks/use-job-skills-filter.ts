import { PaginationParams } from '@staff-portal/filters'
import {
  ApplicantSkillBadgedSearchInput,
  SkillBadgedSearchInput,
  TalentBadgesFilter
} from '@staff-portal/graphql/staff'
import { QueryParams } from '@staff-portal/query-params-state'
import { useCallback, useMemo } from 'react'

interface Params {
  filterValues: QueryParams
  handleFilterChange: (values: PaginationParams) => void
}

const useJobSkillsFilter = ({ filterValues, handleFilterChange }: Params) => {
  const { selectedSkills, selectedBadges } = useMemo(() => {
    const badges = (filterValues.badges ?? {}) as TalentBadgesFilter

    return {
      selectedBadges: badges,
      selectedSkills: badges.skills || []
    }
  }, [filterValues])

  const handleSkillSelect = useCallback(
    (skill: SkillBadgedSearchInput | ApplicantSkillBadgedSearchInput) =>
      handleFilterChange({
        ...filterValues,
        badges: {
          ...selectedBadges,
          skills: [...selectedSkills, skill]
        }
      }),
    [filterValues, handleFilterChange, selectedSkills, selectedBadges]
  )

  const handleSkillDeselect = useCallback(
    (skillName: string) =>
      handleFilterChange({
        ...filterValues,
        badges: {
          ...selectedBadges,
          skills: selectedSkills.filter(({ name }) => name !== skillName)
        }
      }),
    [filterValues, handleFilterChange, selectedSkills, selectedBadges]
  )

  return {
    selectedSkills,
    handleSkillSelect,
    handleSkillDeselect
  }
}

export default useJobSkillsFilter
