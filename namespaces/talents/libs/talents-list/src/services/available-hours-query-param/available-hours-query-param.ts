import { TalentAvailableHours } from '@staff-portal/graphql/staff'
import { asQueryParam } from '@staff-portal/query-params-state'

const AVAILABLE_HOURS_QUERY_PARAMS: Record<TalentAvailableHours, string> = {
  ...TalentAvailableHours,
  [TalentAvailableHours.HOUR_ANY]: '',
  [TalentAvailableHours.HOUR_AVAILABLE]: 'available',
  [TalentAvailableHours.HOUR_UNAVAILABLE]: 'unavailable',
  [TalentAvailableHours.HOUR_1_TO_20]: '1_to_20',
  [TalentAvailableHours.HOUR_20_TO_40]: '20_to_40',
  [TalentAvailableHours.HOUR_20]: '20',
  [TalentAvailableHours.HOUR_40]: '40'
}

export const AvailableHoursQueryParam = asQueryParam({
  decode: (value: string) =>
    Object.keys(AVAILABLE_HOURS_QUERY_PARAMS).find(
      key => AVAILABLE_HOURS_QUERY_PARAMS[key as TalentAvailableHours] === value
    ) as TalentAvailableHours,
  encode: (value: TalentAvailableHours) => AVAILABLE_HOURS_QUERY_PARAMS[value]
})
