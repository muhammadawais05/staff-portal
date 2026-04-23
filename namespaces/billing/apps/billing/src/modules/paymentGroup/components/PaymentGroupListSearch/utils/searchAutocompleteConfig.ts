import { SearchBarCategory } from '@staff-portal/filters'
import { AutocompleteModels } from '@staff-portal/graphql/staff'
import { BadgesKeys } from '@staff-portal/billing/src/utils/types'
import i18n from '@staff-portal/billing/src/utils/i18n'

import {
  mapAutocompleteSearchCategory,
  mapInputSearchCategory
} from '../../../../commercialDocument/utils/filters'

export const searchBarCategories: SearchBarCategory[] = [
  mapAutocompleteSearchCategory([
    BadgesKeys.payees,
    AutocompleteModels.PAYEES,
    'payee',
    i18n.t(`common:filters.fields.autocomplete.${BadgesKeys.payees}`)
  ]),
  mapInputSearchCategory([
    BadgesKeys.ids,
    i18n.t(`common:filters.fields.autocomplete.${BadgesKeys.ids}`)
  ])
]
