import { useCallback } from 'react'
import { useForm } from '@toptal/picasso-forms'
import { QueryAutocompleteNodeFragment } from '@staff-portal/billing/src/data'

export const useChangeRoleReferrerForm = () => {
  const form = useForm()

  const handleReferrerSelect = useCallback(
    (node?: QueryAutocompleteNodeFragment) => {
      // todo: remove this `change` triggers as soon as Form.Autocomplete
      // will support `id` instead of `search term` as value
      // see https://toptal-core.atlassian.net/browse/FX-1469
      form.change('referrerId', node?.id)
    },
    [form]
  )

  const handleSearchTermChange = useCallback(
    () => form.change('referrerId', undefined),
    [form]
  )

  return {
    handleReferrerSelect,
    handleSearchTermChange
  }
}
