import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import React from 'react'

import { ResumeTalentApplicationGenericModalProps } from './types'
import { useGetResumeTalentApplicationDetails } from './data'
import ResumeTalentApplicationGenericModalContent from './components/ResumeTalentApplicationGenericModalContent'

const ResumeTalentApplicationGenericModal = ({
  isResumeTalentApplicationModal,
  hideModal,
  onSubmit,
  talentId,
  isSubmitting
}: ResumeTalentApplicationGenericModalProps) => {
  const {
    applicationManualRestorationAvailable: manualRestorationAvailable,
    specializations,
    specializationApplications,
    eligibleForAutomaticRestore,
    loading: loadingApplicationDetails
  } = useGetResumeTalentApplicationDetails(talentId)

  return (
    <Modal
      withForm
      onClose={hideModal}
      open
      size='small'
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: isResumeTalentApplicationModal
          ? 'resumeTalentApplication'
          : 'restoreTalentActivation'
      }}
    >
      <ResumeTalentApplicationGenericModalContent
        talentId={talentId}
        manualRestorationAvailable={!!manualRestorationAvailable}
        specializations={specializations}
        specializationApplications={specializationApplications}
        eligibleForAutomaticRestore={!!eligibleForAutomaticRestore}
        loading={loadingApplicationDetails}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        hideModal={hideModal}
        isResumeTalentApplicationModal={isResumeTalentApplicationModal}
      />
    </Modal>
  )
}

export default ResumeTalentApplicationGenericModal
