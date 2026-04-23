import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form, FormSpy } from '@toptal/picasso-forms'
import { useNavigate, Link } from '@staff-portal/navigation'
import { RoutePath } from '@staff-portal/routes'
import { isOperationEnabled } from '@staff-portal/operations'
import { ErrorView, ErrorType } from '@staff-portal/error-handling'
import { PageLoader } from '@staff-portal/ui'

import useAddVerticalForm, { FormData } from './use-add-vertical-form'
import { useGetUserOperations } from './data/get-user-operations'

export const AddVerticalForm = () => {
  const navigate = useNavigate()

  const { handleSubmit } = useAddVerticalForm({
    onSuccess: () => {
      navigate(RoutePath.VerticalSettings)
    }
  })

  const { data: userOperations, loading } = useGetUserOperations()
  const createVerticalOperation = userOperations?.createVertical

  if (loading) {
    return <PageLoader />
  }

  if (
    !createVerticalOperation ||
    !isOperationEnabled(createVerticalOperation)
  ) {
    return <ErrorView errorType={ErrorType.FORBIDDEN} />
  }

  return (
    <Form<FormData> onSubmit={handleSubmit}>
      <Container bottom='small'>
        <Form.Input
          data-testid='AddVerticalForm-talentType'
          name='talentType'
          label='Vertical Name'
          placeholder='e.g., Developers, Product Managers'
          width='full'
          multiline
          required
          enableReset
        />
        <Form.Input
          data-testid='AddVerticalForm-publicPagesPath'
          name='publicPagesPath'
          label='Slug'
          placeholder='e.g., product-managers'
          width='full'
          multiline
          required
          enableReset
        />
        <Typography size='xsmall'>
          This path is seen in the URLs like this{` `}
          <Link href='https://toptal.com/product-managers'>
            toptal.com/product-managers
          </Link>
          . This URL cannot be modified after the vertical is launched.
        </Typography>
      </Container>
      <Container flex justifyContent='flex-end'>
        <FormSpy>
          {({ submitting }) => (
            <>
              <Button
                variant='secondary'
                disabled={submitting}
                href={RoutePath.VerticalSettings}
              >
                Cancel
              </Button>
              <Form.SubmitButton
                data-testid='AddVerticalForm-submit-button'
                variant='positive'
              >
                Create
              </Form.SubmitButton>
            </>
          )}
        </FormSpy>
      </Container>
    </Form>
  )
}

export default AddVerticalForm
