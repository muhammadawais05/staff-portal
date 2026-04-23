import { AnyObject } from '@toptal/picasso-forms'
import i18n from '@staff-portal/billing/src/utils/i18n'

// todo: remove this adjustment as soon as Form.Autocomplete will support `id` instead of `search term` as value
//   see https://toptal-core.atlassian.net/browse/FX-1469
const getAutocompleteValidation =
  (roleHasReferrer: boolean) => (values: AnyObject) =>
    !roleHasReferrer && !values.referrerId
      ? {
          referrerId__fake: i18n.t(
            'commission:modals.changeRoleReferrer.form.fields.referrerId.error'
          )
        }
      : {}

export default getAutocompleteValidation
