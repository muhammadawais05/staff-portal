import React, { useRef } from 'react'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { Form } from '@toptal/picasso-forms'
import { Maybe } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { ImportTopFields } from '../ImportTopFields'
import { ImportTopDocument } from '../../data/import-top/import-top.staff.gql.types'
import type { ImportTopForm as ImportTopFormType } from '../../types'
import { ENGAGEMENT_UPDATED } from '../../../../messages'
import { useNavigateToJobPage } from '../../../../services'

export type Props = {
  engagementId: string
  nextTopNumber?: Maybe<number>
  hideModal: () => void
}

const ImportTopForm = ({ engagementId, nextTopNumber, hideModal }: Props) => {
  const { navigateToJobPage } = useNavigateToJobPage()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [importTop, { loading }] = useMutation(ImportTopDocument, {
    onError: () => showError('An error occured, the TOP was not imported.')
  })

  const initialValues = useRef<Partial<ImportTopFormType>>({
    number: nextTopNumber ? nextTopNumber.toString() : undefined
  })

  const handleSubmit = async ({
    number,
    ...restFormData
  }: ImportTopFormType) => {
    const { data: responseData } = await importTop({
      variables: {
        input: {
          ...restFormData,
          number: Number(number),
          engagementId
        }
      }
    })

    return handleMutationResult({
      mutationResult: responseData?.importTop,
      successNotificationMessage: 'The TOP was successfully imported.',
      onSuccessAction: () => {
        hideModal()

        const result = navigateToJobPage(
          responseData?.importTop?.engagement?.job?.id
        )

        if (!result) {
          emitMessage(ENGAGEMENT_UPDATED, { engagementId })
        }
      }
    })
  }

  return (
    <ModalForm<ImportTopFormType>
      initialValues={initialValues.current}
      onSubmit={handleSubmit}
      title='Import TOP'
    >
      <Modal.Content>
        <ImportTopFields />
      </Modal.Content>

      <Modal.Actions>
        <Button
          variant='secondary'
          disabled={loading}
          onClick={hideModal}
          data-testid='ImportTopModal-cancel-button'
        >
          Cancel
        </Button>

        <Form.SubmitButton
          data-testid='ImportTopModal-submit-button'
          variant='positive'
        >
          Import TOP
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ImportTopForm
