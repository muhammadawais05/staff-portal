import { AutocompleteModels } from '@staff-portal/graphql/staff'
import { BadgesKeys } from '@staff-portal/billing/src/utils/types'
import i18n from '@staff-portal/billing/src/utils/i18n'

import { mapAutocompleteSearchCategory } from '../../../../commercialDocument/utils/filters'

export const searchBarCategories = [
  mapAutocompleteSearchCategory([
    BadgesKeys.payees,
    AutocompleteModels.PAYEES,
    'payee',
    i18n.t(`common:filters.fields.autocomplete.${BadgesKeys.payees}`)
  ])
]
