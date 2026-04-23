import { Button, Container, Dropdown } from '@toptal/picasso'
import { Overview16, ReferralBonus16 } from '@toptal/picasso/Icon'
import React, { FC, SyntheticEvent, memo } from 'react'
import OperationFetcherForActions from '@staff-portal/billing/src/components/OperationFetcherForActions'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { isCallableEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import { PaymentListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentListItemFragment.graphql.types'
import { paymentListItemActions } from '@staff-portal/billing-widgets/src/modules/payment/utils'

const displayName = 'PaymentRowAction'

interface Props {
  payment: PaymentListItemFragment
  handleOnClick: (event: SyntheticEvent<HTMLElement, Event>) => void
}

const PaymentRowAction: FC<Props> = memo<Props>(
  ({ payment: { documentNumber, id, operations = {} }, handleOnClick }) => {
    const { payPayment } = operations
    const isPayEnabled = isCallableEnabled(payPayment?.callable)

    return (
      <Container flex>
        <Dropdown
          content={
            <WidgetErrorBoundary>
              <OperationFetcherForActions
                actionItems={paymentListItemActions}
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
        <OperationWrapper operation={payPayment}>
          <Button.Circular
            data-document-number={documentNumber}
            data-testid='add-payment'
            data-value='pay'
            icon={<ReferralBonus16 color={isPayEnabled ? 'green' : 'black'} />}
            onClick={handleOnClick}
            variant='flat'
          />
        </OperationWrapper>
      </Container>
    )
  }
)

PaymentRowAction.displayName = displayName

export default PaymentRowAction
