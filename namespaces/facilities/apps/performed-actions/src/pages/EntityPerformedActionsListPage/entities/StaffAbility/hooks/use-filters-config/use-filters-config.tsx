import { useMemo } from 'react'
import { FilterConfigType, FiltersConfig } from '@staff-portal/filters'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

type Props = {
  staffAbilitiesNodes?: {
    id: string
    name?: string | null
  }[]
  searchableRolesNodes?: {
    fullName: string
    legacyUserId: string
  }[]
  loadingStaffAbilities?: boolean
  loadingSearchableRoles?: boolean
}

const useFiltersConfig = ({
  staffAbilitiesNodes = [],
  searchableRolesNodes = [],
  loadingStaffAbilities,
  loadingSearchableRoles
}: Props) => {
  const filtersConfig = useMemo<FiltersConfig>(() => {
    const filtersList: FiltersConfig = [
      [
        {
          type: FilterConfigType.SELECT,
          name: 'ability_id',
          label: 'Related permission',
          enableReset: true,
          placeholder: NOT_SELECTED_PLACEHOLDER,
          options: staffAbilitiesNodes
            .filter((item): item is { name: string; id: string } => !!item.name)
            .map(({ name, id }) => ({ label: name, value: id })),
          loading: loadingStaffAbilities
        },
        {
          type: FilterConfigType.SELECT,
          name: 'changed_by',
          label: 'Changed by',
          enableReset: true,
          placeholder: NOT_SELECTED_PLACEHOLDER,
          options: searchableRolesNodes.map(({ fullName, legacyUserId }) => ({
            label: fullName,
            value: legacyUserId
          })),
          loading: loadingSearchableRoles
        }
      ]
    ]

    return filtersList
  }, [
    loadingSearchableRoles,
    loadingStaffAbilities,
    staffAbilitiesNodes,
    searchableRolesNodes
  ])

  return filtersConfig
}

export default useFiltersConfig
