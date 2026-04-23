import { useModal } from '@staff-portal/modals-service'
import { JobStatus } from '@staff-portal/graphql/staff'
import {
  DeleteJobModal,
  PostponeJobModal,
  RestorePostponedModal,
  RestoreSendingAwayModal,
  SendJobAwayModal
} from '@staff-portal/jobs'
import { Maybe } from '@toptal/picasso/utils'

interface Props {
  jobId: string
  status: Maybe<JobStatus> | undefined
}

const useGetJobActions = ({ jobId, status }: Props) => {
  const { showModal: showDeleteJobModal } = useModal(DeleteJobModal, {
    jobId,
    status
  })

  const { showModal: showPostponeJobModal } = useModal(PostponeJobModal, {
    jobId,
    jobStatus: status
  })

  const { showModal: showRestorePostponeModal } = useModal(
    RestorePostponedModal,
    { jobId }
  )

  const { showModal: showRestoreSendingAwayModal } = useModal(
    RestoreSendingAwayModal,
    { jobId }
  )

  const { showModal: showSendJobAwayModal } = useModal(SendJobAwayModal, {
    jobId
  })

  return {
    showDeleteJobModal,
    showPostponeJobModal,
    showRestorePostponeModal,
    showRestoreSendingAwayModal,
    showSendJobAwayModal
  }
}

export default useGetJobActions
