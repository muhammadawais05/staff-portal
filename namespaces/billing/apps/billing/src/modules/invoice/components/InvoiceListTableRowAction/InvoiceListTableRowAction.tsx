import { Button, Container, Dropdown } from '@toptal/picasso'
import { Overview16, ReferralBonus16 } from '@toptal/picasso/Icon'
import React, { FC, SyntheticEvent, memo } from 'react'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { isCallableEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'
import OperationFetcherForActions from '@staff-portal/billing/src/components/OperationFetcherForActions'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import { InvoiceListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/invoiceListItemFragment.graphql.types'

import { invoiceListItemActions } from '../../utils'

const displayName = 'InvoiceListTableRowAction'

interface Props {
  invoice: InvoiceListItemFragment
  handleOnClick: (event: SyntheticEvent<HTMLElement, Event>) => void
}

const InvoiceListTableRowAction: FC<Props> = memo<Props>(
  ({ invoice: { documentNumber, operations = {}, id }, handleOnClick }) => {
    const { createTransferInvoice } = operations
    const isPayEnabled = isCallableEnabled(createTransferInvoice?.callable)

    return (
      <Container flex>
        <Dropdown
          content={
            <WidgetErrorBoundary>
              <OperationFetcherForActions
                id={id}
                handleOnClick={handleOnClick}
                actionItems={invoiceListItemActions}
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
        <OperationWrapper operation={createTransferInvoice}>
          <Button.Circular
            data-testid={`${displayName}-pay`}
            data-document-number={documentNumber}
            data-value={ModalKey.invoicePay}
            icon={<ReferralBonus16 color={isPayEnabled ? 'green' : 'black'} />}
            onClick={handleOnClick}
            variant='flat'
          />
        </OperationWrapper>
      </Container>
    )
  }
)

InvoiceListTableRowAction.displayName = displayName

export default InvoiceListTableRowAction
