import { defineModalWithQueryParams } from '@staff-portal/modals-service'

import { Props as ChangeEngagementStartDateModalProps } from './components/TalentInfractionCreateModal'

export const ADD_TALENT_INFRACTION_MODAL = defineModalWithQueryParams<
  Omit<ChangeEngagementStartDateModalProps, 'hideModal'>
>('add_talent_infraction')
