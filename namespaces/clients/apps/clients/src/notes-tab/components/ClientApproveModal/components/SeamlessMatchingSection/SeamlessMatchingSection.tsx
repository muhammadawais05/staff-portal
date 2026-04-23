import { Form, useFormState } from '@toptal/picasso-forms'
import React, { useMemo } from 'react'
import { isMaxLength } from '@staff-portal/validators'

import { ClientApproveForm } from '../../types'

type Props = {
  reasons: string[]
}

const SeamlessMatchingSection = ({ reasons }: Props) => {
  const {
    values: {
      toptalProjects,
      seamlessMatchingSkippedReason,
      seamlessMatchingAccepted
    }
  } = useFormState<ClientApproveForm>()

  const options = useMemo(
    () => reasons.map(item => ({ value: item, text: item })),
    [reasons]
  )

  if (toptalProjects !== 'false') {
    return null
  }

  return (
    <>
      <Form.RadioGroup
        data-testid='seamlessMatchingAccepted'
        name='seamlessMatchingAccepted'
        label='Was seamless matching accepted by the client?'
        horizontal
        required
      >
        <Form.Radio label='Yes' value='true' />
        <Form.Radio label='No' value='false' />
      </Form.RadioGroup>

      {options.length && seamlessMatchingAccepted === 'false' && (
        <Form.Select
          name='seamlessMatchingSkippedReason'
          label='Reason'
          width='full'
          options={options}
          required
        />
      )}

      {seamlessMatchingAccepted === 'false' && (
        <Form.Input
          name='seamlessMatchingSkippedComment'
          label='Comment'
          width='full'
          required={seamlessMatchingSkippedReason === 'Other'}
          validate={isMaxLength}
        />
      )}
    </>
  )
}

export default SeamlessMatchingSection
