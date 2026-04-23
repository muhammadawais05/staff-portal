import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Container, Typography } from '@toptal/picasso'
import { ClientParentUpdateCascadingOptions } from '@staff-portal/graphql/staff'

import { getCascadeParentRadioHint } from '../../utils'

interface Props {
  name: string
  label: string
  disabled?: boolean
  hintOrError?: string
}

const UpdateCascadeParentRadioField = ({
  name,
  label,
  disabled = false,
  hintOrError = ''
}: Props) => {
  const hints = getCascadeParentRadioHint(name, hintOrError)

  return (
    <>
      <Container bottom='xsmall'>
        <Form.RadioGroup
          data-testid={`UpdateCascadeParentRadioField-${name}`}
          name={name}
          label={label}
          horizontal
        >
          <Form.Radio
            label='None'
            value={ClientParentUpdateCascadingOptions.NONE}
            disabled={disabled}
          />
          <Form.Radio
            label='All'
            value={ClientParentUpdateCascadingOptions.ALL}
            disabled={disabled}
          />
          <Form.Radio
            label='Only this company'
            value={ClientParentUpdateCascadingOptions.ONLY_THIS_COMPANY}
            disabled={disabled}
          />
        </Form.RadioGroup>
      </Container>
      {hints.map(hint => (
        <Container key={hint} top='xsmall'>
          <Typography size='xsmall'>{hint}</Typography>
        </Container>
      ))}
    </>
  )
}

export default UpdateCascadeParentRadioField
