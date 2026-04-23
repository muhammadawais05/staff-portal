import React from 'react'
import { Button } from '@toptal/picasso'
import { Modal, ModalComponentBaseProps } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import { Form } from '@toptal/picasso-forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { NodeType } from '@staff-portal/graphql'

import { LinkJobOpportunityDocument } from './data/link-job-opportunity.staff.gql.types'
import { useGetLinkJobOpportunities } from './data/get-link-job-opportunities.staff.gql'

interface Props extends ModalComponentBaseProps {
  jobId: string
}

interface LinkJobOpportunityFormValues {
  opportunity: string
}

const LinkJobOpportunityModal = ({ jobId, hideModal }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const { opportunities } = useGetLinkJobOpportunities(jobId)

  const [linkJobOpportunity, { loading }] = useMutation(
    LinkJobOpportunityDocument,
    {
      onError: () =>
        showError('An error occured, the opportunity was not linked.')
    }
  )

  const handleSubmit = async ({
    opportunity
  }: LinkJobOpportunityFormValues) => {
    const { data } = await linkJobOpportunity({
      variables: {
        input: {
          jobId,
          opportunityId: opportunity
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.linkJobOpportunity,
      successNotificationMessage: 'The opportunity was successfully linked.',
      onSuccessAction: () => {
        hideModal()
        emitMessage(JOB_UPDATED, { jobId })
      }
    })
  }

  return (
    <Modal
      open
      onClose={hideModal}
      size='small'
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName: 'linkJobOpportunity'
      }}
      data-testid='link-job-opportunity-modal'
    >
      <Modal.Title>Link Opportunity</Modal.Title>

      <Form onSubmit={handleSubmit}>
        <Modal.Content>
          <Form.Select
            width='full'
            name='opportunity'
            required
            label='Opportunity'
            options={opportunities}
            data-testid='LinkJobOpportunityModal-opportunity-select'
          />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton
            variant='positive'
            data-testid='LinkJobOpportunityModal-submit-button'
          >
            Save Changes
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default LinkJobOpportunityModal
