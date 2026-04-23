import React, { ChangeEvent, useState } from 'react'
import { Section, Container } from '@toptal/picasso'
import { Form, useField } from '@toptal/picasso-forms'
import { DecimalNumberInput } from '@staff-portal/forms'
import { MAX_INT_LENGTH } from '@staff-portal/config'

import { BooleanAsString } from '../../types'

const BudgetDetails = () => {
  const {
    input: { value: noTalentHourlyRateLimit }
  } = useField<boolean>('noTalentHourlyRateLimit', {
    defaultValue: false
  })

  const [noTalentHourlyRateLimitChecked, setNoTalentHourlyRateLimitChecked] =
    useState(noTalentHourlyRateLimit)

  const handleNoTalentHourlyRateLimitChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setNoTalentHourlyRateLimitChecked(e.target.checked)
  }

  return (
    <Container top='medium'>
      <Section title='Budget Details' variant='withHeaderBar'>
        <DecimalNumberInput
          name='maximumTalentHourlyRate'
          label='Maximum Talent Hourly Rate'
          maxLength={MAX_INT_LENGTH}
          icon={<>$</>}
          width='full'
          required={!noTalentHourlyRateLimitChecked}
          disabled={noTalentHourlyRateLimitChecked}
        />

        <Form.Checkbox
          name='noTalentHourlyRateLimit'
          label='No Rate Limit'
          onChange={handleNoTalentHourlyRateLimitChange}
        />

        <Form.RadioGroup
          name='canShareRate'
          label='Can this rate be shared with the talent?'
          data-testid='can-share-rate-radio-group'
          horizontal
          required
        >
          <Form.Radio label='Yes' value={BooleanAsString.TRUE} />
          <Form.Radio label='No' value={BooleanAsString.FALSE} />
        </Form.RadioGroup>
        <Form.Input
          placeholder='Add comment'
          aria-label='canShareRateComment'
          name='canShareRateComment'
          width='full'
        />

        <Form.RadioGroup
          name='canIncreaseRate'
          label='Can this rate be increased for the right talent?'
          data-testid='can-increase-rate-radio-group'
          horizontal
          required
        >
          <Form.Radio label='Yes' value={BooleanAsString.TRUE} />
          <Form.Radio label='No' value={BooleanAsString.FALSE} />
        </Form.RadioGroup>
        <Form.Input
          placeholder='Add comment'
          aria-label='canIncreaseRateComment'
          name='canIncreaseRateComment'
          width='full'
        />
      </Section>
    </Container>
  )
}

export default BudgetDetails
