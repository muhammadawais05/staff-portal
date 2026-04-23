import React, { ComponentProps, FC, memo } from 'react'
import { Tooltip } from '@toptal/picasso'

import * as S from './styles'
import BillingAmountTooltipText from '../BillingAmountTooltipText'

const displayName = 'BillingAmountTooltip'

interface Props
  extends ComponentProps<typeof BillingAmountTooltipText>,
    Pick<ComponentProps<typeof Tooltip>, 'placement'> {
  testid?: string
}

export const BillingAmountTooltip: FC<Props> = memo(
  ({ children, placement, testid = displayName, ...TooltipTextProps }) => {
    return (
      <Tooltip
        css={S.tooltip}
        content={
          <BillingAmountTooltipText
            testid={`${testid}_tooltip`}
            {...TooltipTextProps}
          />
        }
        data-testid={testid}
        placement={placement}
      >
        {children}
      </Tooltip>
    )
  }
)

BillingAmountTooltip.displayName = displayName

BillingAmountTooltip.defaultProps = { placement: 'left' }

export default BillingAmountTooltip
