import React, { memo, ComponentProps } from 'react'

import { getInvoiceAmountTooltipText } from '../../utils'
import CommercialDocumentAmountWithColorAndTooltip from '../../../commercialDocument/components/CommercialDocumentAmountWithColorAndTooltip'

type AmountWithColorAndTooltipProps = ComponentProps<
  typeof CommercialDocumentAmountWithColorAndTooltip
>
type AmountWithColorAndTooltipUsefulProps = Omit<
  AmountWithColorAndTooltipProps,
  'document'
>
type ArgsOfTooltipText = Parameters<typeof getInvoiceAmountTooltipText>[0]

interface Props extends AmountWithColorAndTooltipUsefulProps {
  invoice: AmountWithColorAndTooltipProps['document'] & ArgsOfTooltipText
  'data-testid'?: string
}

const displayName = 'InvoiceAmountWithColorAndTooltip'

const InvoiceAmountWithColorAndTooltip = ({
  invoice,
  'data-testid': testId = displayName,
  ...rest
}: Props) => {
  const tooltipText = getInvoiceAmountTooltipText(invoice)

  return (
    <CommercialDocumentAmountWithColorAndTooltip
      {...rest}
      data-testid={testId}
      tooltipText={tooltipText}
      document={invoice}
    />
  )
}

InvoiceAmountWithColorAndTooltip.displayName = displayName

export default memo(InvoiceAmountWithColorAndTooltip)
