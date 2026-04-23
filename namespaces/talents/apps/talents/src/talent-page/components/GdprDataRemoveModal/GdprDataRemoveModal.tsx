import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { PromptModal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import { useProcessGdprRemovalTalent } from './data/remove-gdpr-data.staff.gql'

interface Props {
  talentId: string
  hideModal: () => void
}

const GdprDataRemoveModal = ({ talentId, hideModal }: Props) => {
  const { showSuccess, showError } = useNotifications()
  const emitMessage = useMessageEmitter()

  const [processGdprRemovalTalent, { loading }] = useProcessGdprRemovalTalent({
    talentId,
    onCompleted: data => {
      if (data.processGdprRemovalTalent?.success) {
        emitMessage(TALENT_UPDATED, { talentId })

        showSuccess('The GDPR removal process was successfully completed')

        return hideModal()
      }

      showError('Unable to remove GDPR data.')
    }
  })

  const promptModalContent = (
    <Container>
      <Container top='small' bottom='small'>
        <Typography size='medium'>
          Do you want to remove talent's data from the platform?
        </Typography>
      </Container>
      <Container top='small' bottom='small'>
        <Typography size='medium'>
          Talent with multiple roles must each be processed separately.
        </Typography>
      </Container>
      <Typography size='medium' weight='semibold'>
        Attention! This action cannot be undone.
      </Typography>
    </Container>
  )

  return (
    <PromptModal
      variant='negative'
      open
      title='GDPR data removal'
      submitText='Remove data'
      message={promptModalContent}
      onSubmit={() => processGdprRemovalTalent()}
      loading={loading}
      onClose={hideModal}
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'processGdprRemovalTalent'
      }}
    />
  )
}

export default GdprDataRemoveModal
