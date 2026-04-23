import React, { FC, memo, useCallback, useState } from 'react'
import { Button, Container, TypographyOverflow } from '@toptal/picasso'
import { Pencil16 } from '@toptal/picasso/Icon'
import { useTranslation } from 'react-i18next'
import { AssignPurchaseOrderInput, Maybe } from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import ComponentTogglerWithForm from '@staff-portal/billing/src/components/ComponentTogglerWithForm'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import { PurchaseOrderFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/purchaseOrderFragment.graphql.types'

import PurchaseOrderAssignmentEditor from '../PurchaseOrderAssignmentEditor'
import { getSelectFormatPurchaseOrdersForEditor } from '../../../../../job/utils'
import { useUpdateInvoicePurchaseOrderMutation } from '../../data/UpdateInvoicePurchaseOrder.graphql.types'

const displayName = 'PurchaseOrderAssignment'
const responseKey = 'assignPurchaseOrder'

interface Props {
  amountWithCorrections?: number
  currentPurchaseOrderId?: string
  isDisabled: boolean
  label?: string
  invoiceId: string
  nextPurchaseOrderId?: string
  purchaseOrders?: PurchaseOrderFragment[]
  selectedPurchaseOrder?: Maybe<PurchaseOrderFragment>
}

const PurchaseOrderAssignment: FC<Props> = memo(
  ({
    amountWithCorrections,
    currentPurchaseOrderId,
    invoiceId,
    isDisabled = true,
    label = '',
    nextPurchaseOrderId,
    purchaseOrders = [],
    selectedPurchaseOrder
  }) => {
    const { t: translate } = useTranslation('invoice')
    const { handleOnRootLevelError, handleOnError, handleOnSuccess } =
      useFormSubmission()
    const [toggled, setToggled] = useState(false)
    const [invoiceAssignPurchaseOrderGatewayMutation] =
      useUpdateInvoicePurchaseOrderMutation({
        onError: handleOnError,
        onRootLevelError: handleOnRootLevelError
      })

    const toggleEditor = useCallback(
      () => setToggled(prevToggled => !prevToggled),
      [setToggled]
    )

    const selectedPurchaseOrderNumber = selectedPurchaseOrder?.poNumber
    const selectedPurchaseOrderId = selectedPurchaseOrder?.id || ''

    const purchaseOrderLabel = (
      <TypographyOverflow weight='semibold' size='medium'>
        <LinkWrapper href={selectedPurchaseOrder?.webResource?.url}>
          {label || selectedPurchaseOrderNumber || EMPTY_DATA}
        </LinkWrapper>
      </TypographyOverflow>
    )

    const handleSuccess = useCallback(
      ({ purchaseOrderId }: AssignPurchaseOrderInput) => {
        const isAssignmentOperation =
          !!purchaseOrderId &&
          purchaseOrderId !==
            translate('invoiceDetails.purchaseOrdersEditor.notSelected')

        const successMessage = translate(
          `assignPurchaseOrder.notification.success.${
            isAssignmentOperation ? 'assign' : 'unAssign'
          }` as const,
          {
            invoiceNumber: decodeId({ id: invoiceId, type: 'invoice' }),
            purchaseOrder: isAssignmentOperation
              ? purchaseOrders.find(order => order.id === purchaseOrderId)
                  ?.poNumber
              : null
          }
        )

        setToggled(false)

        handleOnSuccess({
          apolloEvent: ApolloContextEvents.invoiceAssignPurchaseOrder,
          isModal: false,
          successMessage
        })()
      },
      [handleOnSuccess, invoiceId, purchaseOrders, translate]
    )

    if (isDisabled) {
      return purchaseOrderLabel
    }

    return (
      <ComponentTogglerWithForm
        alignItems='center'
        flex
        initialFormValues={{
          invoiceId,
          purchaseOrderId: selectedPurchaseOrderId || null
        }}
        isToggled={toggled}
        onToggle={toggleEditor}
        handleOnSubmit={handleSubmit({
          handleError: handleOnSubmissionError(responseKey),
          handleSuccess,
          responseKey,
          submit: invoiceAssignPurchaseOrderGatewayMutation,
          variables: {
            invoiceId
          }
        })}
        ComponentA={() => purchaseOrderLabel}
        ComponentB={({ submitting }) => (
          <PurchaseOrderAssignmentEditor
            purchaseOrders={getSelectFormatPurchaseOrdersForEditor({
              amountWithCorrections,
              purchaseOrders,
              currentPurchaseOrderId,
              nextPurchaseOrderId,
              selectedPurchaseOrderId
            })}
            submitting={submitting}
          />
        )}
        ToggleButton={({ onClick, submitting }) => (
          <Container left={0.5}>
            <Button.Circular
              data-testid='purchaseOrderEditorToggle'
              disabled={submitting}
              icon={<Pencil16 />}
              onClick={onClick}
              variant='flat'
            />
          </Container>
        )}
      />
    )
  }
)

PurchaseOrderAssignment.displayName = displayName

export default PurchaseOrderAssignment
