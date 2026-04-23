import { useTranslation } from 'react-i18next'
import { formatAmount } from '@toptal/picasso/utils'

interface CommercialDocumentCreditedInput {
  creditedAmount: string
}

export const useCommercialDocumentCreditedMessage = ({
  creditedAmount
}: CommercialDocumentCreditedInput): string | undefined => {
  const { t: translate } = useTranslation('commercialDocument')

  if (+creditedAmount > 0) {
    return translate('table.row.credited', {
      amount: formatAmount({ amount: creditedAmount })
    })
  }
}
