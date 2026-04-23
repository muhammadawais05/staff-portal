import React, { useState } from 'react'
import { Container, Tabs } from '@toptal/picasso'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import { Form } from '@toptal/picasso-forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import {
  PaymentHold,
  CreatePaymentHoldInput,
  PaymentHoldAutomaticExpiration
} from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'

import { useCreatePaymentHold } from './data'
import * as S from './styles'
import { buildPaymentHoldInput } from './utils'
import {
  CreateHoldPaymentsModalProps,
  CreatePaymentHoldFormValuesProps,
  TabType
} from './types'
import {
  ExpirationTypeRadioGroup,
  ExpirationTypeInputs,
  FormDescription,
  CreateHoldPaymentsActions,
  UpdateHoldPaymentNotification
} from './components'

const SUCCESS_MESSAGE = 'The Payments were successfully put on hold.'
const ERROR_MESSAGE = 'Unable to perform the action.'

const CreateHoldPaymentsModal = ({
  talentId,
  fullName,
  paymentsHoldDescription,
  hideModal
}: CreateHoldPaymentsModalProps) => {
  const emitMessage = useMessageEmitter()
  const { showSuccess, showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [currentTab, setCurrentTab] = useState<TabType>(TabType.AUTOMATIC)

  const [createPaymentHold, { loading }] = useCreatePaymentHold({
    onCompleted: data => {
      if (data.createPaymentHold?.success) {
        emitMessage(TALENT_UPDATED, { talentId })

        return showSuccess(SUCCESS_MESSAGE)
      }
    },
    onError: () => showError(ERROR_MESSAGE)
  })

  const handleChangeTab = (_: unknown, newValue: number) => {
    setCurrentTab(newValue)
  }

  const handleSubmit = async (input: Partial<CreatePaymentHoldInput>) => {
    const paymentHoldInput = buildPaymentHoldInput(talentId, currentTab, input)

    const { data } = await createPaymentHold({
      variables: { input: paymentHoldInput }
    })

    return handleMutationResult({
      mutationResult: data?.createPaymentHold,
      onSuccessAction: hideModal
    })
  }

  return (
    <Modal
      open
      onClose={hideModal}
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'createPaymentHold'
      }}
    >
      <ModalForm<CreatePaymentHoldFormValuesProps>
        title={`Hold ${fullName} payments`}
        initialValues={{
          holdType: PaymentHold.AUTOMATIC,
          expirationType: PaymentHoldAutomaticExpiration.BY_DATE
        }}
        onSubmit={handleSubmit}
      >
        <Modal.Content>
          <Container bottom='medium'>
            <Tabs value={currentTab} onChange={handleChangeTab}>
              <Tabs.Tab
                css={S.tabSize}
                label='Automatic'
                data-testid='create-hold-payments-modal-automatic-tab'
              />
              <Tabs.Tab
                css={S.tabSize}
                label='Manual'
                data-testid='create-hold-payments-modal-manual-tab'
              />
            </Tabs>

            <FormDescription currentTab={currentTab} />

            {paymentsHoldDescription && (
              <UpdateHoldPaymentNotification
                description={paymentsHoldDescription}
              />
            )}

            {currentTab === TabType.AUTOMATIC && (
              <>
                <Container bottom='small'>
                  <ExpirationTypeRadioGroup />
                </Container>

                <Container bottom='small'>
                  <ExpirationTypeInputs />
                </Container>
              </>
            )}

            <Container top='small'>
              <Form.Input
                name='comment'
                label='Comment'
                width='full'
                multiline
                rows={4}
                placeholder="Please specify a reason. you've put this role's payments on hold."
                required
                data-testid='create-hold-payments-modal-comment'
              />
            </Container>
          </Container>
        </Modal.Content>

        <CreateHoldPaymentsActions loading={loading} onClick={hideModal} />
      </ModalForm>
    </Modal>
  )
}

export default CreateHoldPaymentsModal
