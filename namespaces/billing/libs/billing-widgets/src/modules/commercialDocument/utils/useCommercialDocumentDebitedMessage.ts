import { useTranslation } from 'react-i18next'
import { formatAmount } from '@toptal/picasso/utils'

interface CommercialDocumentDebitedInput {
  debitedAmount: string
}

export const useCommercialDocumentDebitedMessage = ({
  debitedAmount
}: CommercialDocumentDebitedInput): string | undefined => {
  const { t: translate } = useTranslation('commercialDocument')

  if (+debitedAmount > 0) {
    return translate('table.row.debited', {
      amount: formatAmount({ amount: debitedAmount })
    })
  }
}
