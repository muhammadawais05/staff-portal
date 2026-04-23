import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { UpdateClientClaimerInput, Staff } from '@staff-portal/graphql/staff'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

import { getClaimerSelectOptions } from '../../utils'

interface Props {
  handleOnSubmit: (
    input: Pick<UpdateClientClaimerInput, 'claimerId' | 'comment'>
  ) => void
  title: string
  roles: Pick<Staff, 'id' | 'fullName' | 'type'>[]
}

const displayName = 'ClaimerUpdateModalForm'

const ClientClaimerUpdateModalForm = ({
  handleOnSubmit,
  title,
  roles
}: Props) => {
  const { t: translate } = useTranslation('commission')
  const { modalContainer } = useExternalIntegratorContext()

  return (
    <Form<UpdateClientClaimerInput>
      data-testid={`${displayName}-form`}
      onSubmit={handleOnSubmit}
    >
      <Modal.Title data-testid={`${displayName}-title`}>{title}</Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Form.Select
          data-testid={`${displayName}-claimerId`}
          label={translate(
            'modals.clientClaimerUpdate.form.fields.claimerId.label'
          )}
          enableReset
          name='claimerId'
          options={getClaimerSelectOptions(roles)}
          popperContainer={modalContainer}
          width='full'
          required
        />
        <Form.Input
          multiline
          rowsMin={4}
          width='full'
          name='comment'
          data-testid={`${displayName}-comment`}
          label={translate(
            'modals.clientClaimerUpdate.form.fields.comment.label'
          )}
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {translate('modals.clientClaimerUpdate.form.actions.submit')}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

ClientClaimerUpdateModalForm.displayName = displayName

export default ClientClaimerUpdateModalForm
