import React from 'react'
import { Form, useField, useForm } from '@toptal/picasso-forms'

import { useSendEmailContext } from '../../context/send-email-context'

type Props = {
  alwaysDisplay?: boolean
}

const ToField = ({ alwaysDisplay = false }: Props) => {
  const { emailContext } = useSendEmailContext()

  const form = useForm()
  const {
    input: { value: to }
  } = useField('to')

  if (!alwaysDisplay && emailContext.roleType !== 'Client') {
    return null
  }

  const representativesOptions =
    emailContext.optionsSendTo?.nodes.map(roleRecipient => ({
      text: `${roleRecipient.fullName} <${roleRecipient.email}>`,
      value: roleRecipient.id
    })) ?? []

  return (
    <Form.Select
      name='to'
      width='full'
      label='To'
      options={representativesOptions}
      onChange={({ target: { value } }) => {
        if (!value) {
          form.change('to', to)
        }
      }}
    />
  )
}

export default ToField
