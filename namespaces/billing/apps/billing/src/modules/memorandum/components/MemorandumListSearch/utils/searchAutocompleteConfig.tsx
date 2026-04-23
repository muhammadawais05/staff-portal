import {
  AutocompleteSearchBarCategory,
  MultiAutocompleteSearchBarCategory
} from '@staff-portal/filters'
import { AutocompleteModels } from '@staff-portal/graphql/staff'
import { QueryAutocompleteEdgeFragment } from '@staff-portal/billing/src/data'
import { BadgesKeys } from '@staff-portal/billing/src/utils/types'
import i18n from '@staff-portal/billing/src/utils/i18n'
import { fromOption } from '@staff-portal/billing/src/utils/listSearch'

import {
  AutocompleteSearchCategory,
  mapAutocompleteSearchCategory,
  mapMultiAutocompleteSearchCategory
} from '../../../../commercialDocument/utils/filters'

export const searchBarCategories = (
  [
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
    ],
    [
      BadgesKeys.managers,
      AutocompleteModels.PAYEES,
      'payee',
      i18n.t(`common:filters.fields.autocomplete.${BadgesKeys.managers}`)
    ]
  ] as AutocompleteSearchCategory[]
).map(autocompleteCategory =>
  autocompleteCategory[0] === BadgesKeys.managers
    ? mapMultiAutocompleteSearchCategory([
        ...autocompleteCategory,
        (option: QueryAutocompleteEdgeFragment) => {
          if (option.entityType === 'talent') {
            const category = searchBarCategories.find(
              ({ name }) => name === BadgesKeys.talents
            ) as AutocompleteSearchBarCategory
            const value = category.fromOption(option)

            return { value, category }
          }

          const category = searchBarCategories.find(
            ({ name }) => name === BadgesKeys.managers
          ) as MultiAutocompleteSearchBarCategory

          return { value: fromOption(option), category }
        }
      ])
    : mapAutocompleteSearchCategory(autocompleteCategory)
)
