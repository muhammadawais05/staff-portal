import { PatchClientProfileInput } from '@staff-portal/graphql/staff'

type TotalFundingKey = keyof Pick<PatchClientProfileInput, 'totalFunding'>
type ResetTotalFundingKey = keyof Pick<
  PatchClientProfileInput,
  'resetTotalFunding'
>

type Output =
  | {
      [key in TotalFundingKey]: NonNullable<
        PatchClientProfileInput['totalFunding']
      >
    }
  | { [key in ResetTotalFundingKey]: true }

export const adjustTotalFunding = ({
  totalFunding
}: Pick<PatchClientProfileInput, 'totalFunding'>): Output => {
  return totalFunding ? { totalFunding } : { resetTotalFunding: true }
}
