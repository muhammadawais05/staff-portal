import React, { useCallback, useEffect } from 'react'
import { DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT } from '@staff-portal/config'
import { Form, useField } from '@toptal/picasso-forms'
import { Container, Button, Typography } from '@toptal/picasso'
import { Item } from '@toptal/picasso/TagSelector'
import {
  AutocompleteEdge,
  TalentAvailabilityRequestMetadata
} from '@staff-portal/graphql/staff'
import {
  WrapWithTooltip,
  AutocompleteHighlightOption,
  useTagSelector
} from '@staff-portal/ui'
import {
  useGetTalentsByNameAutocomplete,
  TalentVerticalAutocompleteFragment_Talent_,
  TalentEdgeAutocompleteFragment
} from '@staff-portal/jobs'

import { JOB_TYPE_MAPPING } from '../utils'
import { TalentAutocompleteItem, TalentItem } from '.'

export type FavoritesTalentsOption = {
  text: string
  value: string
  label: string
  node: {
    id: string
    availabilityRequestMetadata?: TalentAvailabilityRequestMetadata | null
  }
}

interface Props {
  favoriteTalentsOptions: FavoritesTalentsOption[] | undefined
  onInputChange: (inputValueLength: number) => void
  jobType: string
  jobId: string
}

const TalentsInput = ({
  favoriteTalentsOptions,
  onInputChange,
  jobType,
  jobId
}: Props) => {
  const field = useField('talentIds')

  const {
    loading: candidatesLoading,
    getTalentsByName,
    data
  } = useGetTalentsByNameAutocomplete({ jobId })

  const getTalents = useCallback(
    (inputValue: string) => getTalentsByName(inputValue),
    [getTalentsByName]
  )
  const tagSelectorProps = useTagSelector({
    options: data,
    loading: candidatesLoading,
    getOptions: getTalents
  })

  useEffect(() => {
    if (field.input.value && Array.isArray(field.input.value)) {
      onInputChange(field.input.value.length)
    }
  }, [field.input.value, onInputChange])

  const handleFillFromFavorites = () => {
    const value = field.input.value

    if (favoriteTalentsOptions?.length) {
      if (Array.isArray(value)) {
        const selectedIds = value.map(item => item.node.id)
        const favoritesTalentsList: FavoritesTalentsOption[] = []

        favoriteTalentsOptions.forEach(option => {
          if (!selectedIds.includes(option.node.id)) {
            favoritesTalentsList.push(option)
          }
        })

        return field.input.onChange([
          ...field.input.value,
          ...favoritesTalentsList
        ])
      }

      return field.input.onChange([...favoriteTalentsOptions])
    }
  }

  const hasFavoriteTalentsSaved = !!favoriteTalentsOptions?.length

  return (
    <Container bottom={1}>
      <Container bottom={1}>
        <Form.TagSelector
          {...tagSelectorProps}
          name='talentIds'
          label={JOB_TYPE_MAPPING[jobType]}
          width='full'
          placeholder="Add the person's name"
          required
          data-testid='TalentsInput-tag-selector'
          noOptionsText={DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT}
          renderLabel={({ item, displayValue, onDelete }) => (
            <TalentAutocompleteItem
              item={item as TalentItem}
              displayValue={displayValue}
              onDelete={onDelete}
            />
          )}
          getDisplayValue={(tagEdge: Item | null) => {
            return (tagEdge as AutocompleteEdge)?.label as string
          }}
          getKey={itemKey => (itemKey as TalentEdgeAutocompleteFragment).key}
          renderOption={item => {
            const { label, labelHighlight } =
              item as TalentEdgeAutocompleteFragment

            const node = item.node as TalentVerticalAutocompleteFragment_Talent_
            const verticalName = node?.vertical?.name
            const nodeTypes = verticalName ? [verticalName] : undefined

            return (
              <AutocompleteHighlightOption
                label={label}
                labelHighlight={labelHighlight}
                nodeTypes={nodeTypes}
              />
            )
          }}
        />
      </Container>

      <WrapWithTooltip
        enableTooltip={!hasFavoriteTalentsSaved}
        content={<Typography>There are no favorites for this job.</Typography>}
      >
        <Button
          variant='primary'
          disabled={!hasFavoriteTalentsSaved}
          onClick={handleFillFromFavorites}
          data-testid='TalentsInput-fill-from-favorites-button'
        >
          Fill from Favorites
        </Button>
      </WrapWithTooltip>
    </Container>
  )
}

export default TalentsInput
