import { Form, useField } from '@toptal/picasso-forms'
import { ReferralBonus16 } from '@toptal/picasso/Icon'
import React, { useMemo } from 'react'
import { PaymentHoldAutomaticExpiration } from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'

export const ExpirationTypeInputs = () => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = useMemo(() => new Date(), [])
  const {
    input: { value: expirationType }
  } = useField<PaymentHoldAutomaticExpiration>('expirationType')

  return (
    <>
      {expirationType === PaymentHoldAutomaticExpiration.BY_DATE && (
        <FormDatePickerWrapper
          name='expireOn'
          label='Date threshold'
          width='full'
          required
          minDate={minDate}
          data-testid='expiration-type-inputs-date-threshold'
        />
      )}

      {expirationType === PaymentHoldAutomaticExpiration.BY_AMOUNT && (
        <Form.NumberInput
          label='Amount threshold'
          name='expireAtThreshold'
          required
          rows={4}
          width='full'
          icon={<ReferralBonus16 />}
          data-testid='expiration-type-inputs-expire-at-threshold'
        />
      )}
    </>
  )
}
