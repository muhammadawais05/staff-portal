import React, { useCallback, useMemo } from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { useTagSelector } from '@staff-portal/ui'
import { isNotNullish } from '@staff-portal/utils'
import { Item } from '@toptal/picasso/TagSelector'
import { useGetIndustriesAutocomplete } from '@staff-portal/facilities'

import { DraftJobFormFields } from '../../../../enums/DraftJobFormFields'
import Field from '../Field'

const getKey = (item: Item) => item.value ?? ''

const FIELD_NAME = DraftJobFormFields.Industries

const DraftJobFormIndustryField = () => {
  const { change } = useForm()
  const { showError } = useNotifications()

  const {
    getIndustries,
    data: industries,
    loading
  } = useGetIndustriesAutocomplete({
    onError: () =>
      showError('An error occurred. Failed to load industries list.')
  })

  const options = useMemo(
    () =>
      industries
        ?.map(({ label, node }): Item | null =>
          node && label
            ? {
                value: node.id,
                text: label
              }
            : null
        )
        .filter((item): item is Item => isNotNullish(item)),
    [industries]
  )

  const tagSelectorProps = useTagSelector({
    options,
    loading,
    getOptions: (term: string) => getIndustries({ term })
  })

  const handleChange = useCallback(
    (items: Item[]) => {
      change(FIELD_NAME, [...items])
    },
    [change]
  )

  return (
    <Field label='Relevant Industry Experience'>
      <Form.TagSelector
        {...tagSelectorProps}
        options={options}
        name={FIELD_NAME}
        placeholder='Select industries that Client needs Talent to have experience in, if any'
        noOptionsText='No results'
        width='full'
        allowNull
        getKey={getKey}
        onChange={handleChange}
      />
    </Field>
  )
}

export default DraftJobFormIndustryField
