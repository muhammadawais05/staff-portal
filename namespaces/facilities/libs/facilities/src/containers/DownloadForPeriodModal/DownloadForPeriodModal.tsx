import React from 'react'
import { Button } from '@toptal/picasso'
import { Form, FormProps } from '@toptal/picasso-forms'
import { GetLazyOperationVariables } from '@staff-portal/operations'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { Scalars } from '@staff-portal/graphql/staff'

export type FormData = {
  startDate: Scalars['Date']
  endDate: Scalars['Date']
}

type Props = Pick<FormProps<FormData>, 'onSubmit'> & {
  hideModal: () => void
  title: string
  loading: boolean
  downloadButtonText: string
  initialStartDate?: Scalars['Date']
  initialEndDate?: Scalars['Date']
  operationVariables?: GetLazyOperationVariables
}

const DownloadForPeriodModal = ({
  hideModal,
  title,
  initialStartDate,
  initialEndDate,
  downloadButtonText,
  operationVariables,
  loading,
  onSubmit
}: Props) => (
  <Modal
    open
    onClose={hideModal}
    operationVariables={operationVariables}
    size='small'
  >
    <ModalForm<FormData>
      title={title}
      onSubmit={onSubmit}
      initialValues={{
        startDate: initialStartDate,
        endDate: initialEndDate
      }}
    >
      <Modal.Content>
        <FormDatePickerWrapper
          required
          autoFocus
          label='Start date'
          width='full'
          name='startDate'
        />
        <FormDatePickerWrapper
          required
          label='End date'
          width='full'
          name='endDate'
        />
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton variant='positive' disabled={loading}>
          {downloadButtonText}
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  </Modal>
)

export default DownloadForPeriodModal
