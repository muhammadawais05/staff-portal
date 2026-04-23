import {
  CreateCommonTalentInput,
  CreateTopscreenTalentInput
} from '@staff-portal/graphql/staff'
import { Item } from '@toptal/picasso/TagSelector'

export type TalentCreateInputType =
  | CreateCommonTalentInput
  | CreateTopscreenTalentInput

export interface TalentCreateFormValues
  extends Omit<
    TalentCreateInputType,
    'applicationAnswers' | 'applicantSkillIds'
  > {
  applicationAnswers: Record<string, string>
  applicantSkillIds: Item[]
}
