import React from 'react'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form as PicassoForm, DatePickerProps } from '@toptal/picasso'
import { Form, FormSpy } from '@toptal/picasso-forms'
import { Link, navigateExternallyTo } from '@staff-portal/navigation'
import { FormCancelButton, FormDatePickerWrapper } from '@staff-portal/forms'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { useCustomStatusMessagesContext } from '@staff-portal/page-wrapper'
import { NodeType } from '@staff-portal/graphql'
import { Scalars } from '@staff-portal/graphql/staff'
import { TypedMessage } from '@toptal/staff-portal-message-bus'

import {
  DownloadRolePaymentHistoryDocument,
  DownloadRolePaymentHistoryMutation
} from './data/download-role-payment-history.staff.gql.types'

export type Props = {
  hideModal: () => void
  nodeId: string
  nodeType: NodeType.STAFF | NodeType.TALENT
  successMessageEmitOptions?: {
    type: TypedMessage<unknown>
    payload: unknown
  }
}

type FormValues = {
  startDate: Scalars['Date']
  endDate: Scalars['Date']
}

const defaultDatepickerProps = {
  width: 'full' as DatePickerProps['width'],
  required: true
}

const getSuccessNotification = (url: string) => (
  <>
    Your download should begin momentarily. Please do not refresh the page. If
    for some reason the download doesn't initiate, please click{' '}
    <Link href={url}>this link</Link> to download the document manually.
  </>
)

const HIDE_SUCCESS_MESSAGE_DELAY = 14000
const PAYMENT_HISTORY_SUCCESS_MESSAGE_ID = 'payment_history_success_message'

const PaymentHistoryModal = ({
  hideModal,
  nodeId,
  nodeType,
  successMessageEmitOptions
}: Props) => {
  const { addStatusMessage, removeStatusMessage } =
    useCustomStatusMessagesContext()

  const { handleSubmit: handleSubmitMutation, loading } =
    useModalFormChangeHandler({
      mutationDocument: DownloadRolePaymentHistoryDocument,
      mutationResultOptions: {
        successMessageEmitOptions,
        onSuccessAction: (
          result: DownloadRolePaymentHistoryMutation['downloadRolePaymentHistory']
        ) => {
          const { downloadUrl } = result || {}

          addStatusMessage({
            id: PAYMENT_HISTORY_SUCCESS_MESSAGE_ID,
            content: getSuccessNotification(downloadUrl as string),
            variant: 'green',
            handleOnClose: () =>
              removeStatusMessage(PAYMENT_HISTORY_SUCCESS_MESSAGE_ID),
            autoHideDuration: HIDE_SUCCESS_MESSAGE_DELAY
          })
          navigateExternallyTo(downloadUrl as string)
          hideModal()
        }
      },
      errorNotificationMessage: 'Unable to download payment history.'
    })
  const handleSubmit = ({ startDate, endDate }: FormValues) =>
    handleSubmitMutation({
      roleId: nodeId,
      startDate,
      endDate
    })

  return (
    <Modal
      open
      size='small'
      onClose={hideModal}
      operationVariables={{
        nodeId: nodeId,
        nodeType,
        operationName: 'downloadRolePaymentHistory'
      }}
      defaultTitle='Payment History'
    >
      <ModalForm title='Payment History' onSubmit={handleSubmit}>
        <Modal.Content>
          <PicassoForm.Field>
            <PicassoForm.Label requiredDecoration='asterisk'>
              Start Date
            </PicassoForm.Label>
            <FormSpy>
              {({ values }) => (
                <FormDatePickerWrapper
                  {...defaultDatepickerProps}
                  maxDate={values?.endDate}
                  autoFocus
                  name='startDate'
                  data-testid='payment-history-start-date'
                />
              )}
            </FormSpy>
          </PicassoForm.Field>
          <PicassoForm.Field>
            <PicassoForm.Label requiredDecoration='asterisk'>
              End Date
            </PicassoForm.Label>
            <FormSpy>
              {({ values }) => (
                <FormDatePickerWrapper
                  {...defaultDatepickerProps}
                  minDate={values?.startDate}
                  name='endDate'
                  data-testid='payment-history-end-date'
                />
              )}
            </FormSpy>
          </PicassoForm.Field>
        </Modal.Content>
        <Modal.Actions>
          <FormCancelButton onClick={hideModal} />
          <Form.SubmitButton
            loading={loading}
            variant='positive'
            data-testid='payment-history-submit-button'
          >
            Download PDF
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default PaymentHistoryModal
