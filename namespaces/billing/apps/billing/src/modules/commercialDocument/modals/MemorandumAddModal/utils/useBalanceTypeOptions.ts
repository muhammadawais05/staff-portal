import { useTranslation } from 'react-i18next'
import { lowerCase } from 'lodash-es'
import { MemorandumBalance } from '@staff-portal/graphql/staff'

export const useBalanceTypeOptions = () => {
  const { t: translate } = useTranslation('memorandum')

  return [MemorandumBalance.DEBIT, MemorandumBalance.CREDIT].map(type => ({
    label: translate(
      `addModal.fields.balanceType.${
        lowerCase(type) as 'debit' | 'credit'
      }` as const
    ),
    value: type
  }))
}
