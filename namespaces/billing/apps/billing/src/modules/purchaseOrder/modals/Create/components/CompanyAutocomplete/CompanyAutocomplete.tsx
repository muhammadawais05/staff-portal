import React, { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { AutocompleteItem } from '@toptal/picasso'
import { useForm } from '@toptal/picasso-forms'
import { AutocompleteModels } from '@staff-portal/graphql/staff'
import {
  QueryAutocompleteEdgeFragment,
  QueryAutocompleteNodeFragment
} from '@staff-portal/billing/src/data'
import FormInputAutocomplete from '@staff-portal/billing/src/components/FormInputAutocomplete'
import FormInputAutocompleteRoleOption from '@staff-portal/billing/src/components/FormInputAutocompleteRoleOption'

const displayName = 'CompanyAutocomplete'

type Props = Omit<
  ComponentProps<typeof FormInputAutocomplete>,
  'name' | 'model' | 'onChange' | 'onSelect'
>

const renderOption = (autocompleteItem: AutocompleteItem) => (
  <FormInputAutocompleteRoleOption
    autocompleteItem={autocompleteItem as QueryAutocompleteEdgeFragment}
  />
)

const CompanyAutocomplete = (props: Props) => {
  const form = useForm()
  const { t: translate } = useTranslation('purchaseOrder')

  const handleClientSelect = (node?: QueryAutocompleteNodeFragment) => {
    // @todo: remove this `change` triggers as soon as Form.Autocomplete
    // will support `id` instead of `search term` as value
    // see https://toptal-core.atlassian.net/browse/FX-1469
    form.change('clientId', node?.id)
  }

  // When autocomplete search text input is being changed, we need
  // to clear clientId field to keep clientId <=> clientId__fake in sync
  // the actual "clientId" value is only being assigned when selected from the dropdown (handler above)
  const handleSearchTermChange = () => form.change('clientId', undefined)

  return (
    <FormInputAutocomplete
      data-testid={displayName}
      {...props}
      label={translate('createModal.fields.client.label')}
      model={AutocompleteModels.ACTIVE_OR_WITH_INVOICES_CLIENTS}
      name='clientId__fake'
      onChange={handleSearchTermChange}
      onSelect={handleClientSelect}
      renderOption={renderOption}
      width='full'
    />
  )
}

CompanyAutocomplete.displayName = displayName

export default CompanyAutocomplete
