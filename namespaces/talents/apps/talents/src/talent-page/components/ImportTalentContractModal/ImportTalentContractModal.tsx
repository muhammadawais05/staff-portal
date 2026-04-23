import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React, { useEffect } from 'react'
import { ContractBillingType, ContractKind } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { FormCancelButton } from '@staff-portal/forms'
import { NodeType } from '@staff-portal/graphql'

import { useImportTalentContract } from './data/import-talent-contract.staff.gql'

export type Props = {
  hideModal: () => void
  talentId: string
}

type FormValues = {
  kind: ContractKind
  guid: string
  billingType: ContractBillingType
}

const kindOptions = [
  {
    value: ContractKind.TAX_FORM,
    text: 'Tax form'
  },
  {
    value: ContractKind.TALENT_AGREEMENT,
    text: 'Talent agreement'
  }
]

export const billingTypeOptions = [
  {
    value: ContractBillingType.INDIVIDUAL,
    text: 'Individual'
  },
  {
    value: ContractBillingType.ENTITY,
    text: 'Billing through business'
  }
]

export const ImportTalentContractModal = ({ hideModal, talentId }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [importContract, { loading, error }] = useImportTalentContract({
    onError: () =>
      showError('The contract could not be imported. Please try again later.')
  })
  const handleSubmit = async ({ kind, guid, billingType }: FormValues) => {
    const { data } = await importContract({
      variables: {
        input: {
          kind,
          guid,
          talentId,
          billingType
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.importTalentContract,
      successNotificationMessage: 'Contract has been imported.',
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })
        hideModal()
      },
      capitalizeErrors: true
    })
  }

  useEffect(() => {
    if (error) {
      showError(error.message)
    }
  }, [error, showError])

  return (
    <Modal
      open
      size='small'
      onClose={hideModal}
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'importTalentContract'
      }}
    >
      <ModalForm title='Import Contract' onSubmit={handleSubmit}>
        <Modal.Content>
          <Form.Select
            label='Kind'
            placeholder='Please select a kind'
            name='kind'
            required
            width='full'
            options={kindOptions}
            data-testid='talent-contract-kind'
          />

          <Form.Select
            label='Billing Type'
            placeholder='Please select a billing type'
            name='billingType'
            required
            width='full'
            options={billingTypeOptions}
            defaultValue={ContractBillingType.ENTITY}
            data-testid='talent-contract-billing-type'
          />

          <Form.Input
            name='guid'
            label='Guid'
            placeholder='Please enter a guid'
            required
            width='full'
            data-testid='talent-contract-guid'
          />
        </Modal.Content>
        <Modal.Actions>
          <FormCancelButton onClick={hideModal} />
          <Form.SubmitButton
            loading={loading}
            variant='positive'
            data-testid='import-contract-submit-button'
          >
            Import Contract
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}
