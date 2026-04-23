import React, { FC, useMemo } from 'react'
import { Form, Container, Button } from '@toptal/picasso'
import { Form as PicassoForm, useField } from '@toptal/picasso-forms'

import { useSendEmailContext } from '../../context/send-email-context'
import RoleEmailPreview from '../RoleEmailPreview'
import { Props as EmailPreviewProps } from '../EmailPreview'
import { processEmailBody } from '../../utils'

export interface Props {
  emailPreview?: FC<EmailPreviewProps>
}

const EmailBodyField = ({ emailPreview }: Props) => {
  const { isBodyPreview, setIsBodyPreview } = useSendEmailContext()
  const {
    input: { value: recipientRoleId }
  } = useField('to')

  const {
    input: { value: body }
  } = useField('body')

  const previewContent = useMemo(() => {
    const { emailBody } = processEmailBody(body)

    if (emailPreview) {
      const EmailPreviewComponent = emailPreview

      return <EmailPreviewComponent roleId={recipientRoleId} body={emailBody} />
    }

    return <RoleEmailPreview roleId={recipientRoleId} body={emailBody} />
  }, [body, emailPreview, recipientRoleId])

  return (
    <>
      <Container
        flex
        alignItems='flex-end'
        justifyContent='space-between'
        top='xsmall'
        bottom='xsmall'
      >
        <Form.Label htmlFor='body' inline requiredDecoration='asterisk'>
          Body
        </Form.Label>

        <Button.Group>
          <Button
            variant='secondary'
            size='small'
            active={!isBodyPreview}
            onClick={() => setIsBodyPreview(false)}
          >
            Edit
          </Button>

          <Button
            variant='secondary'
            size='small'
            active={isBodyPreview}
            onClick={() => setIsBodyPreview(true)}
          >
            Preview
          </Button>
        </Button.Group>
      </Container>

      {isBodyPreview ? (
        previewContent
      ) : (
        <PicassoForm.Input
          top='xsmall'
          name='body'
          id='body'
          width='full'
          multiline
          rows={15}
          rowsMax={40}
          required
          data-testid='EmailBodyField-input'
        />
      )}
    </>
  )
}

export default EmailBodyField
