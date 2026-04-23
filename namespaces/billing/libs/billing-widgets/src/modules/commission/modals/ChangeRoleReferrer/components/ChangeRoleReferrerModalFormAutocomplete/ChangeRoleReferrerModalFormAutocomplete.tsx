import React, { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { AutocompleteModels } from '@staff-portal/graphql/staff'
import FormInputAutocomplete from '@staff-portal/billing/src/components/FormInputAutocomplete'

import { useChangeRoleReferrerForm, getRenderOption } from '../../utils'

const displayName = 'ChangeRoleReferrerModalFormAutocomplete'

type Props = Omit<
  ComponentProps<typeof FormInputAutocomplete>,
  'name' | 'model' | 'onChange' | 'onSelect'
>

const ChangeRoleReferrerModalFormAutocomplete = (props: Props) => {
  const { handleReferrerSelect, handleSearchTermChange } =
    useChangeRoleReferrerForm()
  const { t: translate } = useTranslation('commission')

  return (
    <FormInputAutocomplete
      data-testid={displayName}
      {...props}
      label={translate(
        'modals.changeRoleReferrer.form.fields.referrerId.label'
      )}
      model={AutocompleteModels.PAYEES}
      name='referrerId__fake'
      onChange={handleSearchTermChange}
      onSelect={handleReferrerSelect}
      renderOption={getRenderOption}
      width='full'
    />
  )
}

ChangeRoleReferrerModalFormAutocomplete.displayName = displayName

export default ChangeRoleReferrerModalFormAutocomplete
