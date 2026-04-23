import { useModal } from '@staff-portal/modals-service'

import UnclaimActivationStepModal, {
  Props as ModalProps
} from '../UnclaimActivationStepModal'

type Props = Omit<ModalProps, 'hideModal'>

export const useUnclaimActivationStepModal = ({
  stepId,
  stepName,
  talentId
}: Props) => {
  const { showModal } = useModal(UnclaimActivationStepModal, {
    stepId,
    stepName,
    talentId
  })

  return {
    showModal
  }
}
