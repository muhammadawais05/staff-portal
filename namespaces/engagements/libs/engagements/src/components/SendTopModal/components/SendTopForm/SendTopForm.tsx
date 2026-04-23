import React from 'react'
import {
  Button,
  Container, // eslint-disable-next-line no-restricted-imports
  Link,
  Typography
} from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { Form } from '@toptal/picasso-forms'
import { Modal, useModal, ModalForm } from '@staff-portal/modals-service'
import { useMutation } from '@staff-portal/data-layer-service'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { isOperationEnabled } from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { normalizeCurrencyAmount } from '@staff-portal/utils'

import ImportContractAsTopModal from '../../../ImportContractAsTopModal'
import { ImportTopModal } from '../../../ImportTopModal'
import { SendTopFields } from '../SendTopFields'
import { SendTopDocument } from '../../data/send-top/send-top.staff.gql.types'
import { GetSendTopModalDataQuery } from '../../data/get-send-top-modal-data/get-send-top-modal-data.staff.gql.types'
import type { SendTopForm as SendTopFormType } from '../../types'
import { ENGAGEMENT_UPDATED } from '../../../../messages'
import { useNavigateToJobPage } from '../../../../services'

export type Props = {
  hideModal: () => void
  engagement: NonNullable<GetSendTopModalDataQuery['node']>
}

const SendTopForm = ({ hideModal, engagement }: Props) => {
  const {
    id: engagementId,
    job,
    nextTopEffectiveDate,
    nextTopNumber,
    talent,
    client,
    trialLength,
    trialEndDate,
    companyHourlyRate,
    companyPartTimeRate,
    companyFullTimeRate,
    operations: { importContractAsTop }
  } = engagement

  const { navigateToJobPage } = useNavigateToJobPage()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [sendTop, { loading }] = useMutation(SendTopDocument, {
    onError: () => showError('An error occured, the TOP was not sent.')
  })

  const { showModal: showImportTopModal } = useModal(ImportTopModal, {
    engagementId
  })

  const { showModal: showImportContractAsTopModal } = useModal(
    ImportContractAsTopModal,
    { engagementId }
  )

  const initialValues: SendTopFormType = {
    number: nextTopNumber?.toString() ?? '',
    descriptionOfService: job?.descriptionOfService ?? '',
    talentName: talent?.fullName || '',
    nextTopEffectiveDate,
    talentStartDate: nextTopEffectiveDate,
    trialLength,
    trialEndDate,
    sendToPerformer: 'false',
    companyHourlyRate: normalizeCurrencyAmount(companyHourlyRate),
    companyPartTimeRate: normalizeCurrencyAmount(companyPartTimeRate),
    companyFullTimeRate: normalizeCurrencyAmount(companyFullTimeRate),
    clientName: client?.legalName ?? client?.fullName
  }

  const handleSubmit = async ({
    number,
    descriptionOfService,
    sendToPerformer,
    talentName
  }: SendTopFormType) => {
    const { data: responseData } = await sendTop({
      variables: {
        input: {
          descriptionOfService,
          talentName,
          number: Number(number),
          sendToPerformer: sendToPerformer === 'true',
          engagementId
        }
      }
    })

    return handleMutationResult({
      mutationResult: responseData?.sendTop,
      successNotificationMessage: 'The TOP was successfully sent.',
      onSuccessAction: () => {
        hideModal()
        const result = navigateToJobPage(
          responseData?.sendTop?.engagement?.job?.id
        )

        if (!result) {
          emitMessage(ENGAGEMENT_UPDATED, { engagementId })
        }
      }
    })
  }

  return (
    <ModalForm<SendTopFormType>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      title='Send TOP'
    >
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            If you have already sent the contract manually, you can import it{' '}
            <Link
              onClick={showImportTopModal}
              data-testid='SendTopModal-import-top'
            >
              here.
            </Link>
          </Typography>

          {isOperationEnabled(importContractAsTop) && (
            <>
              <br />

              <Typography size='medium'>
                You can import an existing Sourced Talent Agreement (STA){' '}
                <Link
                  onClick={showImportContractAsTopModal}
                  data-testid='SendTopModal-import-contract-as-top'
                >
                  here.
                </Link>
              </Typography>
            </>
          )}
        </Container>

        <SendTopFields />
      </Modal.Content>

      <Modal.Actions>
        <Button
          variant='secondary'
          disabled={loading}
          onClick={hideModal}
          data-testid='SendTopModal-cancel-button'
        >
          Cancel
        </Button>

        <Form.SubmitButton
          data-testid='SendTopModal-submit-button'
          variant='positive'
        >
          Send TOP
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default SendTopForm
