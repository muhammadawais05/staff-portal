import React, { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { AutocompleteItem } from '@toptal/picasso'
import { AutocompleteModels } from '@staff-portal/graphql/staff'
import {
  QueryAutocompleteEdgeFragment,
  QueryAutocompleteNodeFragment
} from '@staff-portal/billing/src/data'
import FormInputAutocomplete from '@staff-portal/billing/src/components/FormInputAutocomplete'
import FormInputAutocompleteRoleOption from '@staff-portal/billing/src/components/FormInputAutocompleteRoleOption'

const displayName = 'ModalFormReceiver'

interface Props
  extends Omit<
    ComponentProps<typeof FormInputAutocomplete>,
    'name' | 'model' | 'onChange' | 'onSelect'
  > {
  handleReceiverSelect: (node?: QueryAutocompleteNodeFragment) => void
}

const renderOption = (autocompleteItem: AutocompleteItem) => (
  <FormInputAutocompleteRoleOption
    autocompleteItem={autocompleteItem as QueryAutocompleteEdgeFragment}
  />
)

const ModalFormReceiver = ({ handleReceiverSelect, ...rest }: Props) => {
  const { t: translate } = useTranslation('memorandum')

  const handleSearchTermChange = () => handleReceiverSelect(undefined)

  return (
    <FormInputAutocomplete
      data-testid={displayName}
      {...rest}
      label={translate('addModal.fields.receiver.label')}
      placeholder={translate('addModal.fields.receiver.placeholder')}
      noOptionsText={translate('addModal.fields.receiver.noOptionsText')}
      hint={translate('addModal.fields.receiver.info')}
      model={AutocompleteModels.MEMORANDUM_RECEIVERS}
      /* todo: change to `name='receiverId'` as soon as Form.Autocomplete will support `id` instead of `search term` as value */
      /* see https://toptal-core.atlassian.net/browse/FX-1469 */
      name='receiverId__fake'
      onChange={handleSearchTermChange}
      onSelect={handleReceiverSelect}
      renderOption={renderOption}
      width='full'
    />
  )
}

ModalFormReceiver.displayName = displayName

export default ModalFormReceiver
