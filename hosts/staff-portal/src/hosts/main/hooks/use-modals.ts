import type { ModalRegistry } from '@staff-portal/modals-service'
import { useModals as useTalentInfractionModals } from '@staff-portal/talents-infractions'
import { useLegacyHashModals as useCompanyLegacyHashModals } from '@staff-portal/clients-app'

export const useModals = (registry: ModalRegistry) => {
  useTalentInfractionModals(registry)
  useCompanyLegacyHashModals(registry)
}
