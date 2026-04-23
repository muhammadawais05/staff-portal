import React, { ComponentProps, useCallback, useMemo } from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { useTagSelector, GridItemField } from '@staff-portal/ui'
import { isNotNullish } from '@staff-portal/utils'
import { Item } from '@toptal/picasso/TagSelector'
import { useGetIndustriesAutocomplete } from '@staff-portal/facilities'

const getKey = (item: Item) => item.value ?? ''

const JobIndustriesField = ({
  gridItemFieldSize
}: {
  gridItemFieldSize?: ComponentProps<typeof GridItemField>['size']
}) => {
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
      change('industries', [...items])
    },
    [change]
  )

  return (
    <GridItemField
      label='Industries'
      labelFor='industries'
      size={gridItemFieldSize}
    >
      <Form.TagSelector
        {...tagSelectorProps}
        id='industries'
        name='industries'
        noOptionsText='No results'
        width='full'
        allowNull
        getKey={getKey}
        onChange={handleChange}
      />
    </GridItemField>
  )
}

export default JobIndustriesField
