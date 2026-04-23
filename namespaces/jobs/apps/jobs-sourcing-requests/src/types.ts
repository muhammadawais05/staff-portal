import {
  CreateSourcingRequestInput,
  UpdateSourcingRequestInput
} from '@staff-portal/graphql/staff'

export enum BooleanAsString {
  TRUE = 'TRUE',
  FALSE = 'FALSE'
}

/**
 * Inherits from `CreateSourcingRequestInput` and replaces all boolean fields
 * with `BooleanAsString` type so that we can easify format to and
 * parse from form data.
 */
export type CreateSourcingRequestFormInput = Omit<
  CreateSourcingRequestInput,
  | 'canIncreaseRate'
  | 'canShareCompanyName'
  | 'canShareRate'
  | 'citizenshipRequirements'
  | 'extraInformation'
  | 'furtherQualificationInterviews'
  | 'timeZonePreference'
> & {
  canIncreaseRate: BooleanAsString
  canShareCompanyName: BooleanAsString
  canShareRate: BooleanAsString
  citizenshipRequirements: BooleanAsString
  extraInformation: BooleanAsString
  furtherQualificationInterviews: BooleanAsString
  timeZonePreference: BooleanAsString
}

/**
 * Inherits from `UpdateSourcingRequestFormInput` and replaces all boolean fields
 * with `BooleanAsString` type so that we can easify format to and
 * parse from form data.
 */
export type UpdateSourcingRequestFormInput = Omit<
  UpdateSourcingRequestInput,
  | 'canIncreaseRate'
  | 'canShareCompanyName'
  | 'canShareRate'
  | 'citizenshipRequirements'
  | 'extraInformation'
  | 'furtherQualificationInterviews'
> & {
  canIncreaseRate?: BooleanAsString
  canShareCompanyName?: BooleanAsString
  canShareRate?: BooleanAsString
  citizenshipRequirements?: BooleanAsString
  extraInformation?: BooleanAsString
  furtherQualificationInterviews?: BooleanAsString
}
