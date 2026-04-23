import React from 'react'
import {
  Typography,
  Tooltip,
  QuestionMark16,
  Container,
  TypographyOverflow
} from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { NO_VALUE } from '@staff-portal/config'
import { useModal } from '@staff-portal/modals-service'
import { PAYMENT_METHODS_TEXT } from '@staff-portal/talents'

import { TalentPaymentOptionsFragment } from './data/get-talent-payment-options'
import PaymentMethodsModal from '../PaymentMethodsModal'

export interface Props {
  paymentOptions: TalentPaymentOptionsFragment['paymentOptions']
}

const getContent = (text = '', tooltipContent = '') => {
  return (
    <Tooltip content={tooltipContent}>
      <Container flex inline>
        <Typography as='span' color='inherit' weight='semibold' size='medium'>
          {text}
        </Typography>
        <Container
          as='span'
          left='xsmall'
          flex
          alignItems='center'
          data-testid='payment-methods-tooltip-icon'
        >
          <QuestionMark16 color='dark-grey' />
        </Container>
      </Container>
    </Tooltip>
  )
}

const PaymentMethodsField = ({ paymentOptions }: Props) => {
  const { showModal } = useModal(PaymentMethodsModal, {
    paymentOptions
  })

  if (!paymentOptions || !paymentOptions.nodes.length) {
    return <>{NO_VALUE}</>
  }

  const viewLink = paymentOptions.viewLink
  const manageLink = paymentOptions.manageLink
  const userHasBasicAbility = !viewLink?.url && !manageLink?.url

  const basicText = paymentOptions.nodes
    .map(({ paymentMethod }) => PAYMENT_METHODS_TEXT[paymentMethod])
    .join(', ')

  if (userHasBasicAbility) {
    return (
      <TypographyOverflow size='medium' weight='semibold'>
        {basicText}
      </TypographyOverflow>
    )
  }

  if (manageLink?.url && manageLink?.text) {
    return (
      <Link href={manageLink.url} data-testid='manage-payments'>
        {getContent(manageLink.text, 'Click to manage')}
      </Link>
    )
  }

  if (viewLink?.url && viewLink?.text) {
    return (
      <>
        <Link onClick={showModal} data-testid='view-payments'>
          {getContent(viewLink.text, 'Click to see details')}
        </Link>
      </>
    )
  }

  return <>{NO_VALUE}</>
}

export default PaymentMethodsField
