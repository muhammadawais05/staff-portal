import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Modal, ModalComponentBaseProps } from '@staff-portal/modals-service'
import { NO_VALUE } from '@staff-portal/config'
import { Maybe } from '@staff-portal/graphql/staff'
import { DetailedList } from '@staff-portal/ui'
import { PAYMENT_METHODS_TEXT } from '@staff-portal/talents'

import { TalentPaymentOptionsFragment } from '../PaymentMethodsField/data/get-talent-payment-options'

interface Props extends ModalComponentBaseProps {
  paymentOptions: TalentPaymentOptionsFragment['paymentOptions']
  hideModal: () => void
}

const mapValues = (accounts: Maybe<{ label: string; value: string }[]> = []) =>
  accounts?.map(({ label, value }) => ({
    label,
    value: value === '' ? NO_VALUE : value
  })) || []

const PaymentMethodsModal = ({ paymentOptions, hideModal }: Props) => (
  <Modal open onClose={hideModal}>
    <Modal.Title>Payment Methods</Modal.Title>
    <Modal.Content>
      {paymentOptions?.nodes.map(
        ({ paymentMethod, preferred, accountInfo }) => (
          <Container bottom='small' key={paymentMethod}>
            <Container flex alignItems='center' justifyContent='space-between'>
              <Typography variant='heading' weight='semibold' size='small'>
                {`${PAYMENT_METHODS_TEXT[paymentMethod]}${
                  preferred ? ' (preferred)' : ''
                }`}
              </Typography>
            </Container>
            {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
            <DetailedList
              labelColumnWidth={12}
              // defaultValue prop will not work since the API returns empty strings
              items={mapValues(accountInfo)}
            />
          </Container>
        )
      )}
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={hideModal} variant='secondary'>
        Cancel
      </Button>
    </Modal.Actions>
  </Modal>
)

export default PaymentMethodsModal
