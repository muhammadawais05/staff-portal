import React from 'react'
import {
  MultiAutocompleteSearchBarCategory,
  createAutocompleteCategory,
  createMultiAutocompleteCategory,
  createInputCategory,
  SearchBarCategory
} from '@staff-portal/filters'
import { AutocompleteModels, Maybe } from '@staff-portal/graphql/staff'
import { AutocompleteHighlightOption } from '@staff-portal/ui'
import { NodeIdPrefix } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { QueryAutocompleteEdgeFragment } from '@staff-portal/billing/src/data'
import {
  AutocompleteOption,
  fromOption,
  getAutocompleteOptions,
  getBadgeLabel,
  getBadgeOptionsByQueryParams,
  toQueryParam
} from '@staff-portal/billing/src/utils/listSearch'

export const getKey = ({ id }: AutocompleteOption) => id
export const getOptionKey = (
  autocompleteEdge: QueryAutocompleteEdgeFragment | null | undefined
): string => autocompleteEdge?.node?.id ?? ''
export const renderOption = ({
  label,
  labelHighlight,
  nodeTypes
}: {
  label?: Maybe<string>
  labelHighlight?: Maybe<string>
  nodeTypes: string[]
}) => (
  <AutocompleteHighlightOption
    label={label}
    labelHighlight={labelHighlight}
    nodeTypes={nodeTypes}
  />
)

export type AutocompleteSearchCategory = [
  string,
  AutocompleteModels,
  keyof typeof NodeIdPrefix,
  string
]

export type MultiAutocompleteSearchCategory = [
  ...AutocompleteSearchCategory,
  MultiAutocompleteSearchBarCategory<
    AutocompleteOption,
    QueryAutocompleteEdgeFragment
  >['fromOption']
]

export const mapAutocompleteSearchCategory = ([
  name,
  model,
  type,
  label
]: AutocompleteSearchCategory) =>
  createAutocompleteCategory<AutocompleteOption, QueryAutocompleteEdgeFragment>(
    {
      fromOption,
      getBadgeLabel,
      getKey,
      getOptionKey,
      getOptions: getAutocompleteOptions(model),
      queryByParams: getBadgeOptionsByQueryParams(model, type),
      label,
      name,
      renderOption,
      toQueryParam
    }
  )

export const mapMultiAutocompleteSearchCategory = ([
  name,
  model,
  type,
  label,
  fromMultiOption
]: MultiAutocompleteSearchCategory) =>
  createMultiAutocompleteCategory<
    AutocompleteOption,
    QueryAutocompleteEdgeFragment,
    AutocompleteOption
  >({
    fromOption: fromMultiOption,
    getBadgeLabel,
    getKey,
    getOptionKey,
    getOptions: getAutocompleteOptions(model),
    queryByParams: getBadgeOptionsByQueryParams(model, type),
    label,
    name,
    renderOption,
    toQueryParam
  })

export const mapInputSearchCategory = ([name, label]: [
  string,
  string
]): SearchBarCategory =>
  createInputCategory({
    name,
    label
  })
