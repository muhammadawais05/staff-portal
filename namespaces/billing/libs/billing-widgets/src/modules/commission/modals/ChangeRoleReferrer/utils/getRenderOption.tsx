import React from 'react'
import { AutocompleteItem } from '@toptal/picasso'
import FormInputAutocompleteRoleOption from '@staff-portal/billing/src/components/FormInputAutocompleteRoleOption'
import { QueryAutocompleteEdgeFragment } from '@staff-portal/billing/src/data'

const getRenderOption = (autocompleteItem: AutocompleteItem) => (
  <FormInputAutocompleteRoleOption
    autocompleteItem={autocompleteItem as QueryAutocompleteEdgeFragment}
  />
)

export default getRenderOption
