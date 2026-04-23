import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { ContractKind, ContractStatus, Link } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import {
  useDestroyContract,
  DestroyContractMutation
} from './data/destroy-contract'

const RecreateContractLabels = {
  [ContractKind.TALENT_AGREEMENT]: 'Automatically resend the agreement.',
  [ContractKind.TAX_FORM]: 'Automatically resend the same tax form.'
}

type Props = {
  contractId: string
  contractKind?: ContractKind | null
  contractStatus?: ContractStatus | null
  contractWebResource: Link
  hideModal: () => void
  onMutationSuccess?: (data: DestroyContractMutation) => void
}

const DeleteContractModal = ({
  contractId,
  contractKind,
  contractStatus,
  contractWebResource,
  hideModal,
  onMutationSuccess
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const onError = () => {
    showError('Unable to delete the contract.')
  }

  const [destroyContract, { loading }] = useDestroyContract({
    onCompleted: data => {
      if (data.destroyContract?.success) {
        onMutationSuccess?.(data)
        hideModal()
      }
    },
    onError
  })

  const showRecreateContractField =
    contractKind === ContractKind.TAX_FORM ||
    contractKind === ContractKind.TALENT_AGREEMENT

  const recreateContractLabel = showRecreateContractField
    ? RecreateContractLabels[contractKind]
    : ''

  const showSignedWarning =
    contractStatus === ContractStatus.SIGNED ||
    contractStatus === ContractStatus.RECIPIENT_SIGNED

  const initialValues = { recreateContract: showRecreateContractField }

  const handleSubmit = async ({
    comment,
    recreateContract
  }: {
    comment: string
    recreateContract: boolean
  }) => {
    const { data } = await destroyContract({
      variables: {
        input: {
          contractId,
          comment,
          recreateAgreement: recreateContract
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.destroyContract,
      successNotificationMessage: 'Contract has been deleted.'
    })
  }

  return (
    <Modal
      open
      onClose={hideModal}
      operationVariables={{
        nodeId: contractId,
        nodeType: NodeType.CONTRACT,
        operationName: 'destroyContract'
      }}
    >
      <ModalForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        title={`Remove Contract ${contractWebResource.text}`}
      >
        <Modal.Content>
          {showSignedWarning && (
            <Container bottom='small'>
              <Typography size='medium'>
                <strong>Warning:</strong> This is a signed contract.
              </Typography>
            </Container>
          )}
          <Container bottom='medium'>
            <Typography size='medium'>
              Are you sure that you want to delete this contract?
            </Typography>
          </Container>
          <Form.Input
            required
            width='full'
            label='Comment'
            name='comment'
            placeholder='Please specify a reason.'
            multiline
            rows={4}
          />
          {showRecreateContractField && (
            <Form.Checkbox
              name='recreateContract'
              label={recreateContractLabel}
            />
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={hideModal} variant='secondary' disabled={loading}>
            Cancel
          </Button>
          <Button type='submit' variant='negative' loading={loading}>
            Delete Contract
          </Button>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default DeleteContractModal
