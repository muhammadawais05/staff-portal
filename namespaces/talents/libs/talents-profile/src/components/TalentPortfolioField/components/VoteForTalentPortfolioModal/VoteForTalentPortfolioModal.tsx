import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { useSendEmailModal } from '@staff-portal/communication-send-email'
import { NodeType } from '@staff-portal/graphql'

import { useVoteForTalentPortfolioFile } from '../../data/vote-for-talent-portfolio-file'

type Props = {
  hideModal: () => void
  talentId: string
  talentName: string
  portfolioFileId: string
  specializationApplicationId?: string
}

enum Vote {
  YES = 'yes',
  NO = 'no'
}

export const VoteForTalentPortfolioModal = ({
  hideModal,
  talentName,
  portfolioFileId,
  talentId,
  specializationApplicationId
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()

  const { showModal: showSendEmailModal } = useSendEmailModal({
    nodeId: specializationApplicationId ?? ''
  })

  const onError = () => showError('Submit failed. Please try again later.')

  const { voteForPortfolioFile } = useVoteForTalentPortfolioFile({
    onError
  })

  const handleSubmit = async ({
    vote,
    comment
  }: {
    vote: Vote
    comment: string
  }) => {
    const input = {
      portfolioFileId,
      vote: vote === Vote.YES,
      comment
    }
    const { data } = await voteForPortfolioFile(input)

    return handleMutationResult({
      mutationResult: data?.voteForTalentPortfolioFile,
      successNotificationMessage: 'Thanks for your feedback.',
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })

        hideModal()

        if (
          specializationApplicationId &&
          data?.voteForTalentPortfolioFile?.nextActionPerformable
        ) {
          showSendEmailModal({
            preselectedEmailTemplateId:
              data.voteForTalentPortfolioFile.emailTemplate?.id,
            nodeId: specializationApplicationId
          })
        }
      }
    })
  }

  return (
    <Modal
      open
      operationVariables={{
        nodeId: portfolioFileId,
        nodeType: NodeType.PORTFOLIO_FILE,
        operationName: 'voteForTalentPortfolioFile'
      }}
      onClose={hideModal}
    >
      <Modal.Title>Vote on {talentName}'s portfolio</Modal.Title>
      <Form onSubmit={handleSubmit}>
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>
              Please be fair-minded while voting. You will not be able to change
              your vote. If the majority of votes received are negative, the
              profile will be rejected.
            </Typography>
          </Container>
          <Form.RadioGroup label='Vote' name='vote' horizontal required>
            <Form.Radio label='Yes' value={Vote.YES} />
            <Form.Radio label='No' value={Vote.NO} />
          </Form.RadioGroup>
          <Form.Input
            required
            width='full'
            label='Comment'
            name='comment'
            multiline
            placeholder='Please specify a reason.'
            rows={4}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive' data-testid='submit-vote'>
            Submit Vote
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default VoteForTalentPortfolioModal
