import React, { useCallback, useMemo, useState } from 'react'
import { AnyObject } from '@toptal/picasso-forms'
import { Item } from '@toptal/picasso/TagSelector'
import deepEqual from 'deep-equal'
import { BATCH_KEY } from '@staff-portal/data-layer-service'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { InlineTagSelector, EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import {
  getAvailableItemsFilter,
  getClientBusinessModelsHook,
  getClientBusinessModelsListHook
} from '../../../../utils'

const CLIENT_BUSINESS_MODELS_BATCH_KEY = 'CLIENT_BUSINESS_MODELS_BATCH_KEY'

interface Props {
  clientId: string
  disabled?: boolean
  name: keyof PatchClientProfileInput
  value: Item[]
  onChange: (key: keyof PatchClientProfileInput, values: AnyObject) => void
}

const InDepthCompanyResearchBusinessModels = ({
  clientId,
  disabled = false,
  name,
  value: initialValue,
  onChange
}: Props) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [billingOptions, setBillingOptions] = useState<Item[]>(initialValue)
  const displayValues = billingOptions.map(({ text }) => text || '')
  const filterOptions = useMemo(
    () => getAvailableItemsFilter(displayValues, inputValue),
    [displayValues, inputValue]
  )

  const useClientBusinessModelsList = getClientBusinessModelsListHook({
    fetchPolicy: 'network-only',
    context: {
      [BATCH_KEY]: CLIENT_BUSINESS_MODELS_BATCH_KEY
    }
  })
  const useClientBusinessModels = getClientBusinessModelsHook(clientId, {
    context: {
      [BATCH_KEY]: CLIENT_BUSINESS_MODELS_BATCH_KEY
    }
  })

  const handleChange = useCallback(
    (key: keyof PatchClientProfileInput, values: AnyObject) => {
      const vals = values[key]
        .map(({ value: val }: { value: string }) => val)
        .filter(Boolean) as string[]

      if (!deepEqual(initialValue, values[key])) {
        const newValues = {
          ...values,
          [key]: vals
        }

        return onChange(key, newValues)
      }
    },
    [onChange, initialValue]
  )

  return (
    <EditableField<PatchClientProfileInput, Item[], Item[]>
      width='full'
      disabled={disabled}
      name={name}
      onChange={handleChange}
      value={billingOptions ?? undefined}
      queryValue={useClientBusinessModels}
      queryOptions={useClientBusinessModelsList}
      onReset={() => {
        setInputValue('')
        setBillingOptions(initialValue)
      }}
      editor={({ options, ...props }) => (
        <InlineTagSelector
          {...props}
          name={name}
          setSelectedValues={setBillingOptions}
          inputValue={inputValue}
          options={filterOptions(options)}
          onInputChange={setInputValue}
          width='full'
        />
      )}
      viewer={displayValues?.join(', ') || NO_VALUE}
    />
  )
}

export default InDepthCompanyResearchBusinessModels
