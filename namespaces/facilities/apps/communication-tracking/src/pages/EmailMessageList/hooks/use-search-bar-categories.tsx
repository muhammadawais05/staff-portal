import React from 'react'
import { Item } from '@toptal/picasso/Autocomplete'
import { AutocompleteHighlightOption } from '@staff-portal/ui'
import {
  AutocompleteSearchBarCategory,
  SearchBarCategories,
  SearchBarOption,
  createAutocompleteCategory
} from '@staff-portal/filters'

import { BadgesKeys } from '../listWidgetConfig'
import { getAutocompleteEmails } from '../data/get-autocomplete-emails'
import { EmailFilterType, FiltersUser } from '../../../types'
import { getSearchBarUserAutocomplete } from '../data/get-search-bar-user-autocomplete'
import { useGetEmailMessagesSearchBarUsers } from '../data/get-email-messages-search-bar-users'
import { isPrefetchedUser } from '../../../utils'

const emailAutocompleteRenderOption = ({ text }: Item) => (
  <SearchBarOption title={text || ''} subtitle='Email' />
)

const renderUsersAutocompleteOption = (input: FiltersUser) => {
  if (isPrefetchedUser(input)) {
    throw new Error('Invalid data was provided when rendering option')
  }

  const { label, nodeTypes, labelHighlight } = input

  return (
    <AutocompleteHighlightOption
      label={label || ''}
      labelHighlight={labelHighlight}
      nodeTypes={nodeTypes}
    />
  )
}

const getUserLegacyId = (input: FiltersUser) =>
  String(
    isPrefetchedUser(input)
      ? input.userLegacyId
      : input.node?.userLegacyId ?? ''
  )

export const useSearchBarCategories = () => {
  const EMAIL_CATEGORIES_SHARED_CONFIG: Pick<
    AutocompleteSearchBarCategory<EmailFilterType, EmailFilterType>,
    | 'getOptions'
    | 'renderOption'
    | 'getOptionKey'
    | 'getBadgeLabel'
    | 'toQueryParam'
    | 'getKey'
    | 'fromOption'
    | 'fromInputValue'
  > = {
    getOptions: getAutocompleteEmails,
    getOptionKey: ({ text }) => text,
    getBadgeLabel: ({ text }) => text,
    renderOption: emailAutocompleteRenderOption,
    toQueryParam: ({ text }) => text,
    getKey: ({ text }) => text,
    fromOption: value => value,
    fromInputValue: value => ({ text: value, value })
  }

  const searchBarCategories: SearchBarCategories = [
    createAutocompleteCategory<FiltersUser, FiltersUser>({
      name: BadgesKeys.USER_IDS,
      label: 'names',
      getOptions: getSearchBarUserAutocomplete(),
      getOptionKey: getUserLegacyId,
      renderOption: renderUsersAutocompleteOption,
      getKey: getUserLegacyId,
      getBadgeLabel: input =>
        String(isPrefetchedUser(input) ? input.fullName : input.label || ''),
      getItemsByIdResult: useGetEmailMessagesSearchBarUsers(),
      toQueryParam: getUserLegacyId,
      fromOption: value => value
    }),
    createAutocompleteCategory<EmailFilterType, EmailFilterType>({
      ...EMAIL_CATEGORIES_SHARED_CONFIG,
      name: BadgesKeys.EMAILS,
      label: 'emails'
    }),
    createAutocompleteCategory<EmailFilterType, EmailFilterType>({
      ...EMAIL_CATEGORIES_SHARED_CONFIG,
      name: BadgesKeys.FROM,
      label: 'sender’s email'
    }),
    createAutocompleteCategory<EmailFilterType, EmailFilterType>({
      ...EMAIL_CATEGORIES_SHARED_CONFIG,
      name: BadgesKeys.TO,
      label: 'receiver’s email'
    }),
    {
      type: 'input',
      name: BadgesKeys.MESSAGE_ID,
      label: 'message IDs',
      getBadgeLabel: ({ text }) => text,
      toQueryParam: ({ text }) => text,
      getKey: ({ text }) => text,
      fromInputValue: value => ({ text: value })
    }
  ]

  return { searchBarCategories }
}
