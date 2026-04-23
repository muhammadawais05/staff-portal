import React from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { Container, Typography, FormLabel } from '@toptal/picasso'
import { PaymentHoldAutomaticExpiration } from '@staff-portal/graphql/staff'

import { CreatePaymentHoldFormValuesProps } from '../../types'

export const ExpirationTypeRadioGroup = () => {
  const form = useForm<CreatePaymentHoldFormValuesProps>()

  const handleExpirationTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    form.change(
      'expirationType',
      e.currentTarget.value as PaymentHoldAutomaticExpiration
    )
  }

  return (
    <>
      <Container bottom='xsmall'>
        <FormLabel
          htmlFor='expirationType'
          requiredDecoration='asterisk'
          inline
        >
          <Typography size='medium' inline>
            Expiration type
          </Typography>
        </FormLabel>
      </Container>

      <Form.RadioGroup
        name='expirationType'
        required
        horizontal
        onChange={handleExpirationTypeChange}
      >
        <Form.Radio
          label='By Date'
          value={PaymentHoldAutomaticExpiration.BY_DATE}
          data-testid='expiration-type-by-date'
        />
        <Form.Radio
          label='By Amount'
          value={PaymentHoldAutomaticExpiration.BY_AMOUNT}
          data-testid='expiration-type-by-amount'
        />
      </Form.RadioGroup>
    </>
  )
}
