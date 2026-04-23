import React, { useMemo } from 'react'
import { Button, Container, Grid, Typography } from '@toptal/picasso'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import { useNavigate } from '@staff-portal/navigation'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { getEmailTemplatesPath } from '@staff-portal/routes'
import { GridItemField, LinkWrapper } from '@staff-portal/ui'

import { EmailTemplateUpdateFormValues } from '../../types'
import { useUpdateEmailTemplate } from './data/create-email-template'
import EmailTemplateFormContent from '../EmailTemplateFormContent'
import { transformEmailTemplateInput } from './utils'
import { GetEmailTemplateDataFragment } from '../../data/use-get-email-template'
import { getInitialValues } from '../../utils/get-initial-values'

const ERROR_MESSAGE = 'Failed to update email template.'
const SUCCESS_MESSAGE = 'The Email Template was successfully updated.'

interface Props {
  emailTemplate: GetEmailTemplateDataFragment
}

const EmailTemplateUpdateForm = ({ emailTemplate }: Props) => {
  const { showError } = useNotifications()
  const [createEmailTemplate] = useUpdateEmailTemplate({
    onError: () => showError(ERROR_MESSAGE)
  })
  const { handleMutationResult } = useHandleMutationResult()
  const navigate = useNavigate()
  const navigateBack = () => navigate(getEmailTemplatesPath())
  const handleSubmit = async (formValues: EmailTemplateUpdateFormValues) => {
    const payload = transformEmailTemplateInput(formValues)

    const result = await createEmailTemplate({
      variables: { input: payload }
    })

    return handleMutationResult({
      isFormSubmit: true,
      mutationResult: result?.data?.updateEmailTemplate,
      successNotificationMessage: SUCCESS_MESSAGE,
      onSuccessAction: () => {
        if (!result?.data?.updateEmailTemplate) {
          return
        }

        navigateBack()
      }
    })
  }

  const initialValues = useMemo(
    () => getInitialValues<EmailTemplateUpdateFormValues>(emailTemplate),
    [emailTemplate]
  )

  return (
    <Form<EmailTemplateUpdateFormValues>
      autoComplete='off'
      onSubmit={handleSubmit}
      mutators={{ ...arrayMutators }}
      initialValues={initialValues}
    >
      <EmailTemplateFormContent />

      <GridItemField label='Created By' size='medium'>
        <LinkWrapper
          wrapWhen={!!emailTemplate?.role?.webResource?.url}
          href={emailTemplate?.role?.webResource?.url as string}
        >
          <Typography color='inherit' size='medium'>
            {emailTemplate?.role?.fullName}
          </Typography>
        </LinkWrapper>
      </GridItemField>

      <Container top='small'>
        <Grid alignItems='baseline' spacing={16}>
          <Grid.Item small={4} />
          <Grid.Item small={8}>
            <Container flex>
              <Container right='xsmall'>
                <Button variant='secondary' onClick={navigateBack}>
                  Cancel
                </Button>
              </Container>

              <Form.SubmitButton variant='positive'>
                Update Email Template
              </Form.SubmitButton>
            </Container>
          </Grid.Item>
        </Grid>
      </Container>
    </Form>
  )
}

export default EmailTemplateUpdateForm
