import { Form, useField } from '@toptal/picasso-forms'
import { Props as FormTagSelectorProps } from '@toptal/picasso-forms/TagSelector/TagSelector'
import { Item } from '@toptal/picasso/TagSelector'
import React, { useCallback } from 'react'
import { DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT } from '@staff-portal/config'
import { AutocompleteEdge } from '@staff-portal/graphql/staff'
import { AutocompleteHighlightOption, useTagSelector } from '@staff-portal/ui'

type TagSelectorProps = Pick<
  FormTagSelectorProps,
  | 'name'
  | 'width'
  | 'required'
  | 'loading'
  | 'options'
  | 'placeholder'
  | 'disabled'
> & { label?: string }

export interface Props extends TagSelectorProps {
  onSearch: (
    term: string,
    excludedIds?: string[],
    excludedNames?: string[]
  ) => void
}

const getTagId = (tagEdge: Item) => (tagEdge as AutocompleteEdge).key

const getTagName = (tagEdge: Item | null) =>
  (tagEdge as AutocompleteEdge)?.label as string

const FormTagSelector = ({
  name,
  label,
  loading,
  required,
  placeholder,
  options,
  width,
  onSearch,
  disabled
}: Props) => {
  const {
    input: { value: selectedTags }
  } = useField<AutocompleteEdge[] | undefined>(name)

  const getTags = useCallback(
    (inputValue: string) =>
      onSearch(
        inputValue,
        selectedTags?.map(({ node }) => node?.id ?? '').filter(Boolean),
        selectedTags?.map(tag => tag.label ?? '')?.filter(Boolean)
      ),
    [onSearch, selectedTags]
  )

  const tagSelectorProps = useTagSelector({
    options,
    loading,
    getOptions: getTags
  })

  return (
    <Form.TagSelector
      {...tagSelectorProps}
      required={required}
      label={label}
      name={name}
      placeholder={placeholder}
      width={width}
      getDisplayValue={getTagName}
      getKey={getTagId}
      renderOption={item => {
        const {
          labelHighlight,
          label: autocompleteEdgeLabel,
          nodeTypes
        } = item as AutocompleteEdge

        return (
          <AutocompleteHighlightOption
            label={autocompleteEdgeLabel}
            labelHighlight={labelHighlight}
            nodeTypes={nodeTypes}
          />
        )
      }}
      noOptionsText={DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT}
      disabled={disabled}
    />
  )
}

export default FormTagSelector
