import { Form } from '@toptal/picasso-forms'
import { Amount, Container, Modal, Typography } from '@toptal/picasso'
import { Trans, useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import {
  RevertCommercialDocumentMemorandumInput,
  RevertRoleMemorandumInput
} from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

type InputValues =
  | RevertCommercialDocumentMemorandumInput
  | RevertRoleMemorandumInput

const displayName = 'RevertMemorandumForm'

interface Props {
  handleOnSubmit: (values: InputValues) => void
  initialValues: InputValues
  number: number
  amount: string
  receiverName?: string
}

const RevertMemorandumForm: FC<Props> = memo<Props>(
  ({
    receiverName = 'receiver',
    handleOnSubmit,
    initialValues,
    amount,
    number
  }) => {
    const { t: translate } = useTranslation('memorandum')

    return (
      <Form<InputValues>
        data-testid={displayName}
        onSubmit={handleOnSubmit}
        initialValues={initialValues}
      >
        <Modal.Title>{translate(`revertModal.title`)}</Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer fieldErrorKeys={['amount']} />
          <Container bottom={1}>
            <Typography
              size='medium'
              data-testid={`${displayName}-description`}
            >
              <Trans
                values={{ number }}
                components={[<Amount key='amount' amount={amount} />]}
                i18nKey='revertModal.description'
                t={translate}
              />
            </Typography>
          </Container>

          <Form.Input
            autoFocus
            data-testid='comment'
            label={translate(`revertModal.fields.comment.label`)}
            multiline
            name='comment'
            required
            rowsMin={4}
            width='full'
          />

          <Form.Checkbox
            name='notifyReceiver'
            data-testid='notifyReceiver'
            label={translate(`revertModal.fields.notifyReceiver.label`, {
              receiverName
            })}
            titleCase={false}
          />
        </Modal.Content>

        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='negative'>
            {translate(`revertModal.submit`)}
          </Form.SubmitButton>
        </ModalFooter>
      </Form>
    )
  }
)

RevertMemorandumForm.displayName = displayName

export default RevertMemorandumForm
