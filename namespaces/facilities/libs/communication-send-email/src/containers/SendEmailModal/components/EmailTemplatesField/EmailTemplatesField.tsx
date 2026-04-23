import React from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import { useSendEmailContext } from '../../context/send-email-context'

export interface Props {
  readOnly?: boolean
  autoFocus?: boolean
}

const EmailTemplatesField = ({ readOnly, autoFocus }: Props) => {
  const {
    emailContext: { emailTemplates },
    setIsBodyPreview
  } = useSendEmailContext()

  const form = useForm()

  if (!emailTemplates?.edges.length) {
    return null
  }

  const handleTemplateChange = (templateId: string) => {
    const selectedEmailTemplate = emailTemplates.edges.find(
      emailTemplate => emailTemplate.node.id === templateId
    )

    if (!selectedEmailTemplate?.rendered) {
      throw new Error('Unable to find selected email template.')
    }

    const { subject, body: templateBody } = selectedEmailTemplate.rendered

    form.change('title', subject)
    form.change('body', templateBody)
    setIsBodyPreview(false)
  }

  const emailTemplatesOptions = emailTemplates.edges.map(({ node }) => ({
    text: node.name,
    value: node.id
  }))

  const hint = readOnly
    ? undefined
    : 'Warning! Current email subject and email body fields values will be lost if you change template'

  return (
    <Form.Select
      name='template'
      placeholder={NOT_SELECTED_PLACEHOLDER}
      width='full'
      label='Email template'
      autoFocus={autoFocus}
      readOnly={readOnly}
      disabled={readOnly}
      options={emailTemplatesOptions}
      limit={999}
      hint={hint}
      onChange={({ target: { value } }) =>
        handleTemplateChange(value as string)
      }
      data-testid='EmailTemplatesField'
    />
  )
}

export default EmailTemplatesField
