import {
  CreateSourcingRequestInput,
  UpdateSourcingRequestInput
} from '@staff-portal/graphql/staff'

import {
  BooleanAsString,
  CreateSourcingRequestFormInput,
  UpdateSourcingRequestFormInput
} from '../../../types'

const toBoolean = (value?: BooleanAsString) =>
  value == undefined ? undefined : value === BooleanAsString.TRUE

const parseBooleanAsStringFields = (fields: {
  canIncreaseRate?: BooleanAsString
  canShareCompanyName?: BooleanAsString
  canShareRate?: BooleanAsString
  citizenshipRequirements?: BooleanAsString
  extraInformation?: BooleanAsString
  furtherQualificationInterviews?: BooleanAsString
  noTalentHourlyRateLimit?: BooleanAsString
  timeZonePreference?: BooleanAsString
  useJobDesiredStartDate?: BooleanAsString
  useJobTimezoneAndHoursOverlap?: BooleanAsString
}) => {
  const result: { [key: string]: boolean | undefined } = {}

  for (const [key, value] of Object.entries(fields)) {
    result[key] = toBoolean(value)
  }

  return result
}

/**
 * Parse all `BooleanAsString` fields in the given inputs to the real boolean values.
 */
export const prepareCreateSourcingRequestInput = ({
  canIncreaseRate,
  canShareCompanyName,
  canShareRate,
  citizenshipRequirements,
  extraInformation,
  furtherQualificationInterviews,
  timeZonePreference,
  ...restFormData
}: Partial<CreateSourcingRequestFormInput>): CreateSourcingRequestInput => {
  return {
    ...restFormData,
    ...parseBooleanAsStringFields({
      canIncreaseRate,
      canShareCompanyName,
      canShareRate,
      citizenshipRequirements,
      extraInformation,
      furtherQualificationInterviews,
      timeZonePreference
    })
  } as CreateSourcingRequestInput
}

/**
 * Parse all `BooleanAsString` fields in the given inputs to the real boolean values.
 */
export const prepareUpdateSourcingRequestInput = ({
  canIncreaseRate,
  canShareCompanyName,
  canShareRate,
  citizenshipRequirements,
  extraInformation,
  furtherQualificationInterviews,
  ...restFormData
}: Partial<UpdateSourcingRequestFormInput>): UpdateSourcingRequestInput => {
  return {
    ...restFormData,
    ...parseBooleanAsStringFields({
      canIncreaseRate,
      canShareCompanyName,
      canShareRate,
      citizenshipRequirements,
      extraInformation,
      furtherQualificationInterviews
    })
  } as UpdateSourcingRequestInput
}
