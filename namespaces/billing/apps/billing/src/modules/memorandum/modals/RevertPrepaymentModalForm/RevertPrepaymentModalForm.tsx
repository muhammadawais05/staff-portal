import { Amount, Container, Modal, Typography } from '@toptal/picasso'
import { Trans, useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { Form } from '@toptal/picasso-forms'
import { RevertPrepaymentsInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

const displayName = 'RevertPrepaymentModalForm'

interface Props {
  handleOnSubmit: (values: RevertPrepaymentsInput) => void
  amount: string
  documentNumber: number
  memoNumber: number
  initialValues: RevertPrepaymentsInput
}

const RevertPrepaymentModalForm = ({
  amount,
  documentNumber,
  memoNumber,
  handleOnSubmit,
  initialValues
}: Props) => {
  const { t: translate } = useTranslation('memorandum')

  return (
    <Form<RevertPrepaymentsInput>
      data-testid={displayName}
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
    >
      <Modal.Title data-testid={`${displayName}-title`}>
        {translate('revertPrepaymentModal.title', { documentNumber })}
      </Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Container bottom={1}>
          <Typography size='medium' data-testid={`${displayName}-description`}>
            <Trans
              values={{ memoNumber }}
              components={[<Amount key='amount' amount={amount} />]}
              i18nKey='revertPrepaymentModal.description'
              t={translate}
            />
          </Typography>
        </Container>

        <Form.Input
          autoFocus
          data-testid='comment'
          label={translate('revertPrepaymentModal.fields.comment.label')}
          multiline
          name='comment'
          required
          rowsMin={4}
          width='full'
        />
      </Modal.Content>

      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {translate('revertPrepaymentModal.submit')}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

RevertPrepaymentModalForm.displayName = displayName

export default memo(RevertPrepaymentModalForm)
