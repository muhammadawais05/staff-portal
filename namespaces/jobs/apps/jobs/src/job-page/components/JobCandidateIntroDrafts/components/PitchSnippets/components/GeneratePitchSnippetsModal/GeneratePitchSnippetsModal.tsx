import { Button } from '@toptal/picasso'
import React, { useRef } from 'react'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { useGetNodes } from '@staff-portal/data-layer-service'
import pluralize from 'pluralize'
import { useCopyRichTextToClipBoard } from '@staff-portal/clipboard'
import { PitchSnippetItem } from '@staff-portal/engagements-candidate-sending'

import { GetPitchSnippetEngagementsDocument } from './data/get-pitch-snippet-engagements/get-pitch-snippet-engagements.staff.gql.types'

export type Props = {
  engagementIds: string[]
  hideModal: () => void
}

const GeneratePitchSnippetsModal = ({ hideModal, engagementIds }: Props) => {
  const { copyRichTextToClipboard } = useCopyRichTextToClipBoard()
  const pitchSnippetsContentRef = useRef<HTMLDivElement>(null)
  const { data: engagements, loading } = useGetNodes(
    GetPitchSnippetEngagementsDocument
  )({
    engagementIds
  })

  const handleCopyToClipboard = async () => {
    if (!pitchSnippetsContentRef.current) {
      return
    }

    await copyRichTextToClipboard({
      target: pitchSnippetsContentRef.current,
      successMessage: 'Pitch snippet copied to clipboard.'
    })
  }

  const handleSubmit = async () => {
    await handleCopyToClipboard()
    hideModal()
  }

  if (!loading && !engagements?.length) {
    return null
  }

  return (
    <Modal
      open
      size='small'
      onClose={hideModal}
      data-testid='GeneratePitchSnippetsModal'
    >
      {loading ? (
        <ModalSuspender />
      ) : (
        <>
          <Modal.Title>
            Generate {pluralize('Pitch', engagements?.length)} Snippet
          </Modal.Title>
          <Modal.Content ref={pitchSnippetsContentRef}>
            {engagements?.map(
              engagement =>
                engagement && (
                  <PitchSnippetItem
                    key={engagement.id}
                    talent={engagement.talent}
                    hourlyRate={engagement.talentHourlyRate}
                    engagementUrl={engagement.resumeUrl}
                  />
                )
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button
              variant='secondary'
              onClick={hideModal}
              data-testid='GeneratePitchSnippetsModal-cancel-button'
            >
              Cancel
            </Button>
            <Button
              data-testid='GeneratePitchSnippetsModal-submit-button'
              variant='positive'
              onClick={handleSubmit}
            >
              Copy and Close
            </Button>
          </Modal.Actions>
        </>
      )}
    </Modal>
  )
}

export default GeneratePitchSnippetsModal
