import { AutocompleteModels } from '@staff-portal/graphql/staff'
import { BadgesKeys } from '@staff-portal/billing/src/utils/types'
import i18n from '@staff-portal/billing/src/utils/i18n'

import {
  AutocompleteSearchCategory,
  mapAutocompleteSearchCategory
} from '../../../../../commercialDocument/utils/filters'

export const searchBarCategories = (
  [
    [
      BadgesKeys.payees,
      AutocompleteModels.PAYEES,
      'payee',
      i18n.t(`common:filters.fields.autocomplete.${BadgesKeys.payees}`)
    ],
    [
      BadgesKeys.jobs,
      AutocompleteModels.JOBS,
      'job',
      i18n.t(`common:filters.fields.autocomplete.${BadgesKeys.jobs}`)
    ],
    [
      BadgesKeys.companies,
      AutocompleteModels.ACTIVE_OR_WITH_INVOICES_CLIENTS,
      'company',
      i18n.t(`common:filters.fields.autocomplete.${BadgesKeys.companies}`)
    ],
    [
      BadgesKeys.talents,
      AutocompleteModels.TALENTS,
      'talent',
      i18n.t(`common:filters.fields.autocomplete.${BadgesKeys.talents}`)
    ]
  ] as AutocompleteSearchCategory[]
).map(mapAutocompleteSearchCategory)
