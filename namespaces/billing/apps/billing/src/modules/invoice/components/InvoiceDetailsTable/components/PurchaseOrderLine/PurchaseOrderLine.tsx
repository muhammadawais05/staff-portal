import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Container } from '@toptal/picasso'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { formatAmount } from '@toptal/picasso/utils'
import { Pencil16 } from '@toptal/picasso/Icon'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'

import { GetInvoiceDetailsTableQuery } from '../../data/getInvoiceDetailsTable.graphql.types'

interface Props {
  invoice: Exclude<GetInvoiceDetailsTableQuery['node'], null | undefined>
}
export const PurchaseOrderLine = ({ invoice }: Props) => {
  const { t: translate } = useTranslation('invoice')
  const { purchaseOrderLine, id } = invoice

  const { handleOnOpenModal } = useModals()

  const showModal = () =>
    handleOnOpenModal(ModalKey.invoiceAssignPurchaseOrder, {
      nodeId: id
    })

  const poUrl = purchaseOrderLine?.purchaseOrder?.webResource.url
  const poLineUrl = purchaseOrderLine?.webResource.url
  const poNumber = purchaseOrderLine?.purchaseOrder?.poNumber
  const poLineNumber = purchaseOrderLine?.poLineNumber

  return (
    <Container
      flex
      alignItems='center'
      data-testid='purchase-order-number-content'
    >
      {poLineUrl ? (
        <>
          <LinkWrapper href={poUrl} data-testid='purchase-order-link'>
            {poNumber}
          </LinkWrapper>
          <Container right='xsmall' left='xsmall'>
            -
          </Container>
          <LinkWrapper href={poLineUrl} data-testid='purchase-order-line-link'>
            {translate('invoiceDetails.purchaseOrdersEditor.poLineBudgetLeft', {
              text: poLineNumber,
              budgetLeft: formatAmount({
                amount: purchaseOrderLine?.budgetLeft ?? ''
              })
            })}
          </LinkWrapper>
        </>
      ) : (
        EMPTY_DATA
      )}

      <Container left='xsmall'>
        <OperationWrapper
          operation={invoice?.operations?.assignPurchaseOrderLine}
        >
          <Button.Circular
            icon={<Pencil16 color='dark-grey' />}
            onClick={showModal}
            variant='transparent'
            data-testid='purchase-order-edit-button'
          />
        </OperationWrapper>
      </Container>
    </Container>
  )
}

export default PurchaseOrderLine
