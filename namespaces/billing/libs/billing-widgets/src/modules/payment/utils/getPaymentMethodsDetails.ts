import { camelCase } from 'lodash-es'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { CamelCase } from '@staff-portal/billing/src/@types/types'
import i18n from '@staff-portal/billing/src/utils/i18n'

type AccountDetailsLabels =
  | 'bank_address'
  | 'comment'
  | 'iban'
  | 'name_on_account'
  | 'payoneer_id'
  | 'personal_address'
  | 'routing_number'
  | 'username'

interface AccountDetailsType {
  label: AccountDetailsLabels | string
  value: string
}

const getPaymentMethodsDetails = (
  accountInfoList: AccountDetailsType[] | null | undefined
) =>
  (accountInfoList || []).map(({ label, value }: AccountDetailsType) => {
    const transformedLabel = camelCase(label) as CamelCase<AccountDetailsLabels>

    return {
      label: i18n.t(`payment:accountDetails.${transformedLabel}` as const),
      value: value || EMPTY_DATA
    }
  })

export default getPaymentMethodsDetails
