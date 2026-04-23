import React, { useMemo } from 'react'
import { Button, Container, Grid } from '@toptal/picasso'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import { useNavigate } from '@staff-portal/navigation'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { getEmailTemplatesPath } from '@staff-portal/routes'

import { EmailTemplateCreateFormValues } from '../../types'
import { useCreateEmailTemplate } from './data/create-email-template'
import EmailTemplateFormContent from '../EmailTemplateFormContent'
import { transformEmailTemplateInput } from './utils'
import { GetEmailTemplateDataFragment } from '../../data/use-get-email-template/use-get-email-template.staff.gql.types'
import { getInitialValues } from '../../utils/get-initial-values'

const ERROR_MESSAGE = 'Failed creating email template.'
const SUCCESS_MESSAGE = 'The Email Template was successfully created.'

interface Props {
  emailTemplate?: GetEmailTemplateDataFragment | null
}

const EmailTemplateCreateForm = ({ emailTemplate }: Props) => {
  const { showError } = useNotifications()
  const isCopy = !!emailTemplate

  const [createEmailTemplate] = useCreateEmailTemplate({
    onError: () => showError(ERROR_MESSAGE)
  })

  const { handleMutationResult } = useHandleMutationResult()

  const navigate = useNavigate()

  const navigateBack = () => navigate(getEmailTemplatesPath())

  const handleSubmit = async (formValues: EmailTemplateCreateFormValues) => {
    const payload = transformEmailTemplateInput(formValues)

    const result = await createEmailTemplate({
      variables: { input: payload }
    })

    return handleMutationResult({
      isFormSubmit: true,
      mutationResult: result?.data?.createEmailTemplate,
      successNotificationMessage: SUCCESS_MESSAGE,
      onSuccessAction: () => {
        if (!result?.data?.createEmailTemplate) {
          return
        }

        navigateBack()
      }
    })
  }

  const initialValues = useMemo(
    () =>
      getInitialValues<EmailTemplateCreateFormValues>(emailTemplate, isCopy),
    [emailTemplate, isCopy]
  )

  return (
    <Form<EmailTemplateCreateFormValues>
      autoComplete='off'
      onSubmit={handleSubmit}
      mutators={{ ...arrayMutators }}
      initialValues={initialValues}
    >
      <EmailTemplateFormContent />

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

              <Form.SubmitButton variant='positive' iconPosition='right'>
                Create Email Template
              </Form.SubmitButton>
            </Container>
          </Grid.Item>
        </Grid>
      </Container>
    </Form>
  )
}

export default EmailTemplateCreateForm
