import { useModal } from '@staff-portal/modals-service'
import {
  TalentFragment,
  useRequestAvailabilityModal
} from '@staff-portal/talents'

import { useSetHealthStatusModal } from '../../SetHealthStatusModal/hooks'
import { PauseApplicationModal } from '../../PauseApplicationModal'
import { ApplyToDifferentVerticalModal } from '../../ApplyToDifferentVerticalModal/components'
import ConvertOnboardingVerticalModal from '../../ConvertOnboardingVerticalModal'
import ConvertToAnotherVerticalModal from '../../ConvertToAnotherVerticalModal'
import { ConvertToSourcingFlowModal } from '../../ConvertToSourcingFlowModal/components'
import GdprDataRemoveModal from '../../GdprDataRemoveModal'

export const useTalentDropdownModals = (talent: TalentFragment) => {
  const { id } = talent

  const { showModal: showConvertToAnotherVerticalModal } = useModal(
    ConvertToAnotherVerticalModal,
    {
      talentId: talent.id,
      fullName: talent.fullName,
      type: talent.type,
      verticals: talent.otherVerticals?.nodes || [],
      screeningRoleSteps: talent.screeningRoleSteps
    }
  )

  const { showModal: showConvertOnboardingVerticalModal } = useModal(
    ConvertOnboardingVerticalModal,
    {
      talentId: talent.id,
      fullName: talent.fullName,
      type: talent.type,
      verticals: talent.otherVerticals?.nodes || []
    }
  )

  const { showModal: showGdprRemovalModal } = useModal(GdprDataRemoveModal, {
    talentId: id
  })

  const { showModal: showSetHealthStatusModal } =
    useSetHealthStatusModal(talent)

  const { showModal: showRequestAvailabilityModal } =
    useRequestAvailabilityModal(id)

  const { showModal: showPauseApplicationModal } = useModal(
    PauseApplicationModal,
    { talentId: id }
  )

  const { showModal: showApplyToDifferentVerticalModal } = useModal(
    ApplyToDifferentVerticalModal,
    {
      type: talent.type,
      talentId: talent.id,
      fullName: talent.fullName,
      verticals: talent.otherVerticals?.nodes || []
    }
  )

  const { showModal: showConvertToSourcingFlowModal } = useModal(
    ConvertToSourcingFlowModal,
    {
      talentId: talent.id
    }
  )

  return {
    showConvertToAnotherVerticalModal,
    showConvertOnboardingVerticalModal,
    showGdprRemovalModal,
    showSetHealthStatusModal,
    showRequestAvailabilityModal,
    showPauseApplicationModal,
    showApplyToDifferentVerticalModal,
    showConvertToSourcingFlowModal
  }
}
