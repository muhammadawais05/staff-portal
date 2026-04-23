import type { ModalRegistry } from '@staff-portal/modals-service'

import { ADD_TALENT_INFRACTION_MODAL } from '../modals'
import TalentInfractionCreateModal from '../components/TalentInfractionCreateModal'

export const useModals = (registry: ModalRegistry) => {
  registry.set(ADD_TALENT_INFRACTION_MODAL, {
    Component: TalentInfractionCreateModal,
    queryParams: {
      to: payload => {
        if (payload.forTalentId) {
          return { talent_id: payload.forTalentId }
        }

        return {} as Record<string, string>
      },
      from: (params, { showWarning }) => {
        if (typeof params.talent_id === 'undefined') {
          return {}
        }

        if (typeof params.talent_id !== 'string') {
          return showWarning()
        }

        return {
          forTalentId: params.talent_id
        }
      }
    }
  })
}
