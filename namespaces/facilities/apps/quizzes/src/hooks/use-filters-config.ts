import { useMemo } from 'react'
import { FiltersConfig, FilterConfigType } from '@staff-portal/filters'

import { useGetVerticals } from '../data/get-verticals'
import { TYPE_OF_QUIZZES_OPTIONS } from '../utils/get-filter-options'

const useFiltersConfig = () => {
  const { data: verticals } = useGetVerticals()

  const verticalOptions = useMemo(
    () =>
      verticals.map(({ talentType, name }) => ({
        label: name,
        value: talentType
      })) || [],
    [verticals]
  )

  const filtersConfig = useMemo<FiltersConfig>(() => {
    const filtersList: FiltersConfig = [
      {
        type: FilterConfigType.CHECKBOX,
        name: 'talent_type',
        label: 'Vertical',
        options: verticalOptions
      },
      {
        type: FilterConfigType.RADIO,
        name: 'kind',
        label: 'Type Of Quiz',
        options: TYPE_OF_QUIZZES_OPTIONS
      }
    ]

    return filtersList
  }, [verticalOptions])

  return { filtersConfig }
}

export default useFiltersConfig
