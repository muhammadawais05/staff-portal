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
    BadgesKeys.companies,
    AutocompleteModels.ACTIVE_OR_WITH_INVOICES_CLIENTS,
    'company',
    i18n.t(`common:filters.fields.autocomplete.${BadgesKeys.companies}`)
  ]),
  mapInputSearchCategory([
    BadgesKeys.numbers,
    i18n.t(`common:filters.fields.autocomplete.${BadgesKeys.numbers}`)
  ])
]
