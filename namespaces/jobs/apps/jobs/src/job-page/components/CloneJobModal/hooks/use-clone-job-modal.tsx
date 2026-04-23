import { useModal } from '@staff-portal/modals-service'

import CloneJobModal from '../CloneJobModal'

type Props = {
  jobId: string
}

const useCloneJobModal = ({ jobId }: Props) => {
  const { showModal } = useModal(CloneJobModal, { jobId })

  return {
    showModal
  }
}

export default useCloneJobModal
