import { useMemo } from 'react'
import { useGetFlags } from '@staff-portal/facilities'
import {
  FilterConfigType,
  TypeSelectorFilterConfig
} from '@staff-portal/filters'
import { RoleType } from '@staff-portal/graphql/staff'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

export const useFlagsFilter = (): TypeSelectorFilterConfig => {
  const { flags, loading } = useGetFlags({
    roleType: RoleType.CLIENT
  })

  const options = useMemo(() => {
    if (!flags) {
      return []
    }

    return flags.map(({ id, title }: { id: string; title: string }) => ({
      id,
      label: title ?? ''
    }))
  }, [flags])

  return {
    type: FilterConfigType.TYPE_SELECTOR,
    name: 'flag_ids',
    label: 'Flags',
    placeholder: NOT_SELECTED_PLACEHOLDER,
    loading,
    options
  }
}
