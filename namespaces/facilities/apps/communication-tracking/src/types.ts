import { GetSearchBarUserAutocompleteQuery } from './pages/EmailMessageList/data/get-search-bar-user-autocomplete'
import {
  EmailMessagesSearchBarClientFragment,
  EmailMessagesSearchBarRoleFragment
} from './pages/EmailMessageList/data/get-email-messages-search-bar-users'

export type AutocompleteUser =
  GetSearchBarUserAutocompleteQuery['autocomplete']['edges'][0]
export type PrefetchedUser =
  | EmailMessagesSearchBarClientFragment
  | EmailMessagesSearchBarRoleFragment
export type FiltersUser = PrefetchedUser | AutocompleteUser

export type EmailFilterType = {
  text: string
  value: string
}
