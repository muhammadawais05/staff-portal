import React, { useMemo } from 'react'
import { Button, Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { ImportStaInput } from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { ModalForm } from '@staff-portal/modals-service'
import { isMaxLength } from '@staff-portal/validators'
import {
  DEFAULT_ISO_DATE_FORMAT,
  getCurrentDateString
} from '@staff-portal/date-time-utils'
import { useUserTimeZone } from '@staff-portal/current-user'

import { useImportSTA } from '../../hooks'

interface Props {
  companyId: string
  hideModal: () => void
}

const ImportSTAForm = ({ companyId, hideModal }: Props) => {
  const timeZone = useUserTimeZone()
  const initialDate = useMemo(
    () => getCurrentDateString({ timeZone }),
    [timeZone]
  )

  const { contractEffectiveDateEnabled, loading, handleSubmit } =
    useImportSTA(hideModal)

  return (
    <ModalForm<ImportStaInput>
      initialValues={{ clientId: companyId }}
      title='Import STA'
      onSubmit={handleSubmit}
      data-testid='ImportSTAForm-form'
    >
      <Modal.Content>
        <Form.Input
          required
          width='full'
          name='guid'
          label='Contract GUID'
          validate={isMaxLength}
          data-testid='ImportSTAForm-GUID'
        />

        {contractEffectiveDateEnabled && (
          <FormDatePickerWrapper
            width='full'
            outputDateFormat={DEFAULT_ISO_DATE_FORMAT}
            initialValue={initialDate}
            name='contractEffectiveDate'
            label='Contract effective date'
            data-testid='ImportSTAForm-contractEffectiveDate'
          />
        )}
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton
          variant='positive'
          data-testid='ImportSTAForm-submit'
        >
          Import STA
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ImportSTAForm
