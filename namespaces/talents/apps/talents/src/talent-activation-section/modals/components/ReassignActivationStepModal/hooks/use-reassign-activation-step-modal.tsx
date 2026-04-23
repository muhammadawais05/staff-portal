import { useModal } from '@staff-portal/modals-service'

import ReassignActivationStepModal, {
  Props as ModalProps
} from '../ReassignActivationStepModal'

type Props = Omit<ModalProps, 'hideModal'>

export const useReassignActivationStepModal = ({
  activationId,
  stepId,
  stepName,
  staff,
  talentId
}: Props) => {
  const { showModal } = useModal(ReassignActivationStepModal, {
    activationId,
    stepId,
    stepName,
    staff,
    talentId
  })

  return {
    showModal
  }
}
