import {
  Amount,
  Container,
  Exclamation16,
  Help16,
  Tooltip,
  TypographyProps
} from '@toptal/picasso'
import React, { FC, memo, ReactNode } from 'react'
import { Maybe } from '@staff-portal/graphql/staff'

import * as S from './styles'

type IconPosition = 'left' | 'right'
type SubjectObjectWithPreferredBillingOption = {
  preferredBillingOption?: {
    discountable?: boolean
  }
}

interface Props extends Pick<TypographyProps, 'color' | 'size' | 'weight'> {
  document: {
    amount?: Maybe<string>
    subjectObject?: {} | SubjectObjectWithPreferredBillingOption
  }
  'data-testid'?: string
  iconPosition?: IconPosition
  tooltipText?: ReactNode
}

const displayName = 'CommercialDocumentAmountWithColorAndTooltip'

/*
 * ACH/Wire = discountable, normal text, question mark icon
 * CreditCard/PayPal = red text, exclamation mark icon
 **/
const CommercialDocumentAmountWithColorAndTooltip: FC<Props> = memo<Props>(
  ({
    document,
    iconPosition,
    tooltipText,
    weight,
    size,
    color,
    'data-testid': testId = displayName
  }) => {
    const { amount, subjectObject } = document
    const numberAmount = Number(amount || '0')
    const discountable = (
      subjectObject as undefined | SubjectObjectWithPreferredBillingOption
    )?.preferredBillingOption?.discountable
    const amountColor = !tooltipText || discountable ? color : 'red'

    const coloredAmount = (
      <Amount
        amount={numberAmount}
        data-testid={`${testId}-amount`}
        color={amountColor}
        weight={weight}
        size={size}
      />
    )

    if (!tooltipText) {
      return coloredAmount
    }

    return (
      <Tooltip content={tooltipText} placement='top' interactive>
        <Container css={S.minimumContainer} flex inline>
          {coloredAmount}
          {discountable ? (
            <Help16
              css={S.iconStyle(iconPosition)}
              data-testid={`${testId}-help-icon`}
            />
          ) : (
            <Exclamation16
              css={S.iconStyle(iconPosition)}
              color='black'
              data-testid={`${testId}-exclamation-icon`}
            />
          )}
        </Container>
      </Tooltip>
    )
  }
)

CommercialDocumentAmountWithColorAndTooltip.displayName = displayName

export default CommercialDocumentAmountWithColorAndTooltip
