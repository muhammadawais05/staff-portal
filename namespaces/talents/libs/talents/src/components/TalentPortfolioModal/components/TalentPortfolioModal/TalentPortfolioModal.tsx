import React from 'react'
import { Button, CloseMinor16 } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import { PageLoader } from '@staff-portal/ui'

import PortfolioProjects from '../PortfolioProjects'
import * as S from './styles'
import { useGetTalentPortfolioItems } from './data/get-talent-portfolio-items/get-talent-portfolio-items.staff.gql'

export type Props = {
  talentName: string
  talentId: string
  startProjectId?: string
  hideModal: () => void
}

const TalentPortfolioModal = ({
  talentName,
  talentId,
  startProjectId,
  hideModal
}: Props) => {
  const { showError } = useNotifications()

  const { data: portfolioItems, loading } = useGetTalentPortfolioItems({
    talentId,
    onError: () => showError('Failed to load talent portfolio items.')
  })

  const showLoader = !portfolioItems && loading

  return (
    <Modal open size='full-screen' onClose={hideModal}>
      <Modal.Title css={S.modalTitle} data-testid='portfolio-modal-header'>
        {`${talentName}'s Portfolio`}
      </Modal.Title>
      <Modal.Content>
        <PortfolioProjects
          projects={portfolioItems || []}
          startProjectId={startProjectId}
        />
      </Modal.Content>
      <Button.Circular variant='flat' css={S.closeButton} onClick={hideModal}>
        <CloseMinor16 />
      </Button.Circular>
      {showLoader && <PageLoader />}
    </Modal>
  )
}

export default TalentPortfolioModal
