import { useMemo } from 'react'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { titleize } from '@staff-portal/string'
import { FiltersConfig } from '@staff-portal/filters'

import { SkillNamesQueryParams } from './use-handle-skill-names-list-filters'
import { generateFilterConfig } from '../utils'
import { VerticalWithSkillCategoriesFragment } from '../../../data/get-verticals-with-categories'

const useFiltersConfig = (
  verticalsWithCategories: VerticalWithSkillCategoriesFragment[],
  loadingVerticals: boolean,
  filterValues: SkillNamesQueryParams
) => {
  const verticalsAndCategoriesOptions = useMemo(
    () =>
      (verticalsWithCategories || [])
        .map(({ talentType, skillCategories }) => ({
          id: talentType,
          label: titleize(talentType, { splitter: '_' }),
          children: skillCategories.nodes
            .map(({ id, title }) => ({
              id: decodeEntityId(id).id,
              label: title
            }))
            .sort((firstItem, secondItem) =>
              firstItem.label.localeCompare(secondItem.label)
            )
        }))
        .sort((firstItem, secondItem) =>
          firstItem.label.localeCompare(secondItem.label)
        ),
    [verticalsWithCategories]
  )

  const showOnlyDirectChildFilter =
    filterValues.ancestor_skill_name_id !== undefined

  return useMemo<FiltersConfig>(
    () =>
      generateFilterConfig(
        loadingVerticals,
        verticalsAndCategoriesOptions,
        showOnlyDirectChildFilter
      ),
    [showOnlyDirectChildFilter, verticalsAndCategoriesOptions, loadingVerticals]
  )
}

export default useFiltersConfig
