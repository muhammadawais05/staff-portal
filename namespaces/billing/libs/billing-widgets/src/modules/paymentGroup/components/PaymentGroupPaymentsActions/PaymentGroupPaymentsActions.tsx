import React, { SyntheticEvent } from 'react'
import { Button, Container } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { Link } from '@topkit/react-router'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { isCallableEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'

import { PaymentListItemFragment } from '../../../__fragments__/paymentListItemFragment.graphql.types'
import { PaymentGroupAction } from '../../utils/paymentGroupActionHandler'

interface Props {
  paymentGroupId: string
  paymentRemoved?: boolean
  payment: PaymentListItemFragment
  handleOnActionClick: (event: SyntheticEvent<HTMLElement, Event>) => void
}

const displayName = 'PaymentGroupPaymentsActions'

const PaymentGroupPaymentsActions = ({
  paymentGroupId,
  paymentRemoved,
  payment: { id: paymentId, webResource, operations, subjectObject },
  handleOnActionClick: handleOnClick
}: Props) => {
  const { t: translate } = useTranslation('paymentList')

  // Possibility to extend
  const warningType =
    // @ts-expect-error only one SubjectObject has operations :(
    isCallableEnabled(subjectObject?.operations?.createPaymentHold?.callable) &&
    'withheld'

  return (
    <Container inline flex>
      <Button
        as={Link}
        href={webResource?.url || undefined}
        size='small'
        data-testid={`${displayName}-details`}
      >
        {translate('table.actions.details')}
      </Button>
      {paymentRemoved ? (
        <OperationWrapper
          operation={{
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }}
        >
          <Button
            data-group-id={paymentGroupId}
            data-node-id={paymentId}
            data-testid={`${displayName}-revert-payment`}
            data-value={PaymentGroupAction.REVERT_PAYMENT}
            onClick={handleOnClick}
            size='small'
          >
            {translate('table.actions.revert')}
          </Button>
        </OperationWrapper>
      ) : (
        <OperationWrapper operation={operations.removePaymentFromPaymentGroup}>
          <Button
            data-group-id={paymentGroupId}
            data-node-id={paymentId}
            data-testid={`${displayName}-remove-payment`}
            data-value={PaymentGroupAction.REMOVE_PAYMENT}
            data-warning-type={warningType}
            onClick={handleOnClick}
            size='small'
          >
            {translate('table.actions.remove')}
          </Button>
        </OperationWrapper>
      )}
    </Container>
  )
}

export default PaymentGroupPaymentsActions
