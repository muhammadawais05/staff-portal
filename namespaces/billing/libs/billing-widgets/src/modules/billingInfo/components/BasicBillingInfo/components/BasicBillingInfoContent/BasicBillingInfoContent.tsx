import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Amount, Button, Container, Section } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { decodeRawIdAndType } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
/**
 * TODO: remove the comment, once the component would be extracted to the correct folder
 * https://toptal-core.atlassian.net/browse/SP-2308
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { PaymentMethodsField } from '@staff-portal/talents-profile'

import { GetClientBasicBillingInfoQuery } from '../../../../data/getClientBasicBillingInfo.graphql.types'
import AccountBalance from '../../../../components/AccountBalance'

const displayName = 'BasicBillingInfoContent'

interface Props {
  client: NonNullable<GetClientBasicBillingInfoQuery['node']>
  viewer: NonNullable<GetClientBasicBillingInfoQuery['viewer']>
}

export const BasicBillingInfoContent = memo(
  ({
    client,
    viewer: {
      permits: { canViewPaymentOptions }
    }
  }: Props) => {
    const { t: translate } = useTranslation('billingBasicInfo')
    const nodeId = decodeRawIdAndType(client.id).id
    const { handleOnOpenModalWithUrlSearch, handleOnOpenModal } = useModals()
    const handleOnCreateModalClick = useCallback(
      () =>
        handleOnOpenModalWithUrlSearch(ModalKey.clientRefundCreditBalance, {
          nodeId,
          nodeType: 'client'
        }),
      [handleOnOpenModalWithUrlSearch, nodeId]
    )
    const handleOnUnappliedCashEntriesClick = useCallback(
      () =>
        handleOnOpenModal(ModalKey.unappliedCashEntries, {
          nodeId,
          nodeType: 'client'
        }),
      [handleOnOpenModal, nodeId]
    )

    const {
      availablePrepaymentBalanceNullable,
      unappliedCashBalance,
      paymentOptions,
      unallocatedMemorandums: {
        totalAmount: accountBalance,
        webResource: { url: accountBalanceUrl }
      }
    } = client

    return (
      <Section
        title={translate('title')}
        variant='withHeaderBar'
        actions={
          <OperationWrapper
            operation={client.operations.refundClientCreditBalance}
          >
            <Button
              onClick={handleOnCreateModalClick}
              data-testid={`${displayName}-clientRefundCreditBalance-button`}
              variant='secondary'
              size='small'
            >
              {translate('actions.refund')}
            </Button>
          </OperationWrapper>
        }
      >
        <DetailedList labelColumnWidth={12}>
          <DetailedList.Row>
            <DetailedList.Item label={translate('accountBalance')}>
              <AccountBalance
                accountBalance={accountBalance}
                accountBalanceUrl={accountBalanceUrl}
              />
            </DetailedList.Item>
            <DetailedList.Item label={translate('creditBalance')}>
              {availablePrepaymentBalanceNullable ? (
                <Amount amount={availablePrepaymentBalanceNullable} />
              ) : (
                EMPTY_DATA
              )}
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label={translate('paymentMethods')}>
              {paymentOptions?.nodes.length ? (
                <PaymentMethodsField paymentOptions={paymentOptions} />
              ) : undefined}
            </DetailedList.Item>
            {canViewPaymentOptions && (
              <DetailedList.Item label={translate('unappliedCashBalance')}>
                <Container
                  flex
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Amount weight='semibold' amount={unappliedCashBalance} />
                  <Button
                    variant='secondary'
                    size='small'
                    onClick={handleOnUnappliedCashEntriesClick}
                    data-testid='unapplied-cash-entries-button'
                  >
                    {translate('details')}
                  </Button>
                </Container>
              </DetailedList.Item>
            )}
          </DetailedList.Row>
        </DetailedList>
      </Section>
    )
  }
)

BasicBillingInfoContent.displayName = displayName

export default BasicBillingInfoContent
