import { NodeType } from '@staff-portal/graphql'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { lazy } from '@staff-portal/utils'
import React from 'react'

import { useGetRejectApplicationData } from './data'

const Content = lazy(
  () =>
    import(
      '../RejectSpecializationApplicationModalContent/RejectSpecializationApplicationModalContent'
    )
)

export type Props = {
  talentId: string
  specializationApplicationId: string
  hideModal: () => void
}

const RejectSpecializationApplicationModal = ({
  talentId,
  specializationApplicationId,
  hideModal
}: Props) => {
  const { data: rejectApplicationData, loading } =
    useGetRejectApplicationData(talentId)

  const { node } = rejectApplicationData || {}
  const {
    status: talentStatus,
    fullName: talentName,
    specializationApplications,
    cancelableMeetings: cancelableMeetingsNodes
  } = node || {}

  const specializationApplication = specializationApplications?.nodes[0]
  const cancelableMeetings = cancelableMeetingsNodes?.nodes
  const talentCanBeRejected = talentStatus !== 'active'
  const screeningNotesPending = Boolean(
    specializationApplication?.rejectNoteTasks?.totalCount
  )

  return (
    <Modal
      open
      onClose={hideModal}
      operationVariables={{
        nodeId: specializationApplicationId,
        nodeType: NodeType.SPECIALIZATION_APPLICATION,
        operationName: 'rejectSpecializationApplication'
      }}
      data-testid='reject-specialization-application-modal'
    >
      {loading ? (
        <ModalSuspender />
      ) : (
        <Content
          talentId={talentId}
          talentName={talentName}
          talentCanBeRejected={talentCanBeRejected}
          specializationApplicationId={specializationApplicationId}
          specializationTitle={specializationApplication?.specialization?.title}
          screeningNotesPending={screeningNotesPending}
          cancelableMeetings={cancelableMeetings}
          hideModal={hideModal}
        />
      )}
    </Modal>
  )
}

export default RejectSpecializationApplicationModal
