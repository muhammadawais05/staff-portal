import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Typography, Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { UpdateClientBusinessTypeInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'

import { businessTypeSelectOptions } from '../../utils'

interface Props {
  handleOnSubmit: (input: UpdateClientBusinessTypeInput) => void
  initialValues: Pick<UpdateClientBusinessTypeInput, 'businessType'>
  title: string
}

const displayName = 'ClientBusinessTypeUpdateModalForm'

const ClientBusinessTypeUpdateModalForm = ({
  handleOnSubmit,
  initialValues,
  title
}: Props) => {
  const { t: translate } = useTranslation('commission')
  const { modalContainer } = useExternalIntegratorContext()

  return (
    <Form<UpdateClientBusinessTypeInput>
      data-testid={`${displayName}-form`}
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
    >
      <Modal.Title data-testid={`${displayName}-title`}>{title}</Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Container bottom='small'>
          <Typography size='medium' data-testid={`${displayName}-message`}>
            {translate('modals.clientBusinessTypeUpdate.message')}
          </Typography>
        </Container>
        <Form.Select
          data-testid={`${displayName}-businessType`}
          label={translate(
            'modals.clientBusinessTypeUpdate.form.fields.businessType.label'
          )}
          enableReset
          name='businessType'
          options={businessTypeSelectOptions}
          popperContainer={modalContainer}
          width='full'
          testIds={{
            resetButton: 'reset-adornment'
          }}
          required
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {translate('modals.clientBusinessTypeUpdate.form.actions.submit')}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

ClientBusinessTypeUpdateModalForm.displayName = displayName

export default ClientBusinessTypeUpdateModalForm
