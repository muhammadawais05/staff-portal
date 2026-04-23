import { Button, Container, Dropdown } from '@toptal/picasso'
import { Overview16, ReferralBonus16 } from '@toptal/picasso/Icon'
import React, { FC, SyntheticEvent, memo } from 'react'
import OperationFetcherForActions from '@staff-portal/billing/src/components/OperationFetcherForActions'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { isCallableEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import { PaymentGroupAction } from '@staff-portal/billing-widgets/src/modules/paymentGroup/utils'

import { PaymentGroupItemFragment } from '../../data'
import { paymentGroupListItemActions } from '../../utils'

const displayName = 'PaymentGroupRowAction'

interface Props {
  group: PaymentGroupItemFragment
  handleOnClick: (event: SyntheticEvent<HTMLElement, Event>) => void
}

const PaymentGroupRowAction: FC<Props> = memo<Props>(
  ({ group: { id, number, operations = {} }, handleOnClick }) => {
    const { payPaymentGroup } = operations
    const isPayEnabled = isCallableEnabled(payPaymentGroup?.callable)

    return (
      <Container flex>
        <Dropdown
          content={
            <WidgetErrorBoundary>
              <OperationFetcherForActions
                actionItems={paymentGroupListItemActions}
                handleOnClick={handleOnClick}
                id={id}
              />
            </WidgetErrorBoundary>
          }
        >
          <Button.Circular
            data-testid='more-actions-button'
            icon={<Overview16 />}
            variant='flat'
          />
        </Dropdown>
        <OperationWrapper operation={payPaymentGroup}>
          <Button.Circular
            data-node-id={number}
            data-testid='pay-payment-group'
            data-value={PaymentGroupAction.PAY}
            icon={<ReferralBonus16 color={isPayEnabled ? 'green' : 'black'} />}
            onClick={handleOnClick}
            variant='flat'
          />
        </OperationWrapper>
      </Container>
    )
  }
)

PaymentGroupRowAction.displayName = displayName

export default PaymentGroupRowAction
