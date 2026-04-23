import { Container, Modal, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { ResolveDisputeOfCommercialDocumentInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

const displayName = 'DisputeResolveModalForm'

type InputValues = Omit<
  ResolveDisputeOfCommercialDocumentInput,
  'commercialDocumentId'
>

interface Props {
  handleOnSubmit: (values: InputValues) => void
  initialValues: InputValues
  documentNumber: number
  type: CommercialDocumentType
}

const DisputeResolveModalForm: FC<Props> = memo<Props>(
  ({ handleOnSubmit, initialValues, documentNumber, type }) => {
    const { t: translate } = useTranslation('commercialDocument')

    return (
      <Form<InputValues>
        data-testid={displayName}
        onSubmit={handleOnSubmit}
        initialValues={initialValues}
      >
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate('modals.disputeResolveModal.title', {
            documentNumber,
            type
          })}
        </Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer />

          <Container bottom={2}>
            <Typography size='medium' data-testid={`${displayName}-intro`}>
              {translate('modals.disputeResolveModal.intro')}
            </Typography>
          </Container>

          <Form.Input
            multiline
            placeholder={translate(
              'modals.disputeResolveModal.fields.comment.placeholder'
            )}
            rowsMin={4}
            width='full'
            name='comment'
            data-testid='comment'
            label={translate('modals.disputeResolveModal.fields.comment.label')}
            required
          />

          {type === 'invoice' && (
            <Form.Checkbox
              name='resolveTalentPaymentDisputes'
              data-testid='resolveTalentPaymentDisputes'
              label={translate(
                'modals.disputeResolveModal.fields.resolveTalentPaymentDisputes.label'
              )}
            />
          )}
        </Modal.Content>
        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='positive'>
            {translate('modals.disputeResolveModal.actions.submit')}
          </Form.SubmitButton>
        </ModalFooter>
      </Form>
    )
  }
)

DisputeResolveModalForm.displayName = displayName

export default DisputeResolveModalForm
