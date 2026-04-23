import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Props as FormSelectProps } from '@toptal/picasso-forms/Select/Select'
import { ClaimerFragment } from '@staff-portal/facilities'

import { formatClaimers, findClaimerById } from './utils'

export type ClaimerSelectOption = { text: string; value: string }

export type Props = Pick<
  FormSelectProps<string>,
  'name' | 'label' | 'width' | 'required' | 'value' | 'autoFocus'
> & {
  claimers: ClaimerFragment[]
  setSelectedClaimer: React.Dispatch<
    React.SetStateAction<ClaimerFragment | undefined>
  >
}

export const StepClaimerSelect = ({
  setSelectedClaimer,
  value,
  claimers,
  ...props
}: Props) => {
  const handleChange = (event: React.ChangeEvent<{ value: string }>) =>
    setSelectedClaimer(findClaimerById(claimers, event.target.value))

  return (
    <Form.Select
      {...props}
      options={formatClaimers(claimers)}
      data-testid='step-claimer-select'
      initialValue={value}
      onChange={handleChange}
    />
  )
}
