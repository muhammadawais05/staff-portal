import {
  CreateSalesDraftJobInput,
  JobBudgetDetails,
  UpdateSalesDraftJobInput
} from '@staff-portal/graphql/staff'
import { Item } from '@toptal/picasso/TagSelector'

import { DefaultDraftJobFormType, DraftJobFormType } from '../../../types'
import { adjustSkillsValue } from './adjust-skills-value'

type DraftJobFormMutationInput<
  TFormData extends
    | (DraftJobFormType & { draftJobId: string })
    | DefaultDraftJobFormType
> = TFormData extends DefaultDraftJobFormType
  ? CreateSalesDraftJobInput
  : UpdateSalesDraftJobInput

export const adjustFormData = <
  TFormData extends
    | (DraftJobFormType & { draftJobId: string })
    | DefaultDraftJobFormType
>({
  budgetDetails,
  hasPreferredHours,
  industries,
  maxHourlyRate,
  talentCount,
  timeZoneName,
  hoursOverlap,
  workingTimeFrom,
  workingTimeTo,
  skills,
  ...rest
}: TFormData): DraftJobFormMutationInput<TFormData> =>
  ({
    budgetDetails,
    hasPreferredHours: hasPreferredHours === 'true',
    industries: industries?.length
      ? industries.map(({ value }: Item) => ({ id: value }))
      : null,
    maxHourlyRate:
      budgetDetails === JobBudgetDetails.RATE_SPECIFIED && maxHourlyRate
        ? Math.floor(parseInt(maxHourlyRate)) ?? null
        : null,
    talentCount: talentCount ? parseInt(talentCount) : undefined,
    // empty values are removed from formData, seems to come from Picasso internal handling
    // so set these 2 values explicitly to null here
    // needed to be able to overwrite previous values with "No preference" selection
    timeZoneName: timeZoneName ?? null,
    hoursOverlap: hoursOverlap ?? null,
    workingTimeFrom: workingTimeFrom ?? undefined,
    workingTimeTo: workingTimeTo ?? undefined,
    skills: adjustSkillsValue(skills),
    ...rest
    // todo: remove unknown
  } as unknown as DraftJobFormMutationInput<TFormData>)
