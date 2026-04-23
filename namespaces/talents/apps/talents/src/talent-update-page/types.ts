import { UpdateTalentProfileInput } from '@staff-portal/graphql/staff'
import { Item } from '@toptal/picasso/TagSelector'

export interface TalentUpdateFormValues
  extends Omit<
    UpdateTalentProfileInput,
    'talentId' | 'clientMutationId' | 'languageIds' | 'hourlyRateDiscussed'
  > {
  languageIds: Item[]
  hourlyRateDiscussed?: 'YES' | 'NO'
}
