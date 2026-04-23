import React, { ReactElement } from 'react'
import { Container, Button, Typography } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'
import { Form, FormProps, AnyObject } from '@toptal/picasso-forms'
import i18n from 'i18next'

const displayName = 'InlineSectionForm'

interface InlineSectionFormProps<MutationInputType>
  extends FormProps<MutationInputType> {
  headerTitle: string
  editComponent: ReactElement
  saveButtonComponent?: ReactElement
  cancelButtonText?: string
  saveButtonText?: string
  onClose: () => void
}

const InlineSectionForm = <MutationInputType extends AnyObject>({
  headerTitle,
  editComponent,
  saveButtonComponent,
  saveButtonText = i18n.t('common:actions.update'),
  cancelButtonText = i18n.t('common:actions.cancel'),
  onClose,
  ...formProps
}: InlineSectionFormProps<MutationInputType>) => {
  return (
    <Container
      padded='medium'
      css={{ background: palette.grey.lighter }}
      rounded
      bottom={1.5}
      data-testid={displayName}
    >
      <Form<MutationInputType> {...formProps}>
        <Container bottom={1.5} flex justifyContent='space-between'>
          <Container flex>
            <Typography variant='heading' size='medium'>
              {headerTitle}
            </Typography>
          </Container>
          <Container>
            <Button
              data-testid='cancel'
              size='small'
              variant='secondary'
              onClick={onClose}
            >
              {cancelButtonText}
            </Button>
            {saveButtonComponent || (
              <Form.SubmitButton
                size='small'
                data-testid='submit'
                variant='positive'
              >
                {saveButtonText}
              </Form.SubmitButton>
            )}
          </Container>
        </Container>
        {editComponent}
      </Form>
    </Container>
  )
}

export default InlineSectionForm
