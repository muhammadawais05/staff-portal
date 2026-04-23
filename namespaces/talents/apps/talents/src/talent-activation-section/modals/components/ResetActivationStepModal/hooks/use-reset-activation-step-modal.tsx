import { useModal } from '@staff-portal/modals-service'

import ResetActivationStepModal, {
  Props as ModalProps
} from '../ResetActivationStepModal'

type Props = Omit<ModalProps, 'hideModal'>

export const useResetActivationStepModal = ({
  stepId,
  stepName,
  talentId
}: Props) => {
  const { showModal } = useModal(ResetActivationStepModal, {
    stepId,
    stepName,
    talentId
  })

  return {
    showModal
  }
}
