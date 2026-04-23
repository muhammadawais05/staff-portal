import { TalentObjectionSurveyReason } from '@staff-portal/graphql/staff'

export const REASON_OPTIONS = {
  [TalentObjectionSurveyReason.LONG_SCREENING_PROCESS]:
    'Long Screening Process',
  [TalentObjectionSurveyReason.BENEFITS]:
    'Benefits (401k, insurance, dental, guaranteed salary)',
  [TalentObjectionSurveyReason.LOOKING_FOR_FULL_TIME_JOB]:
    'Talent looking for Full Time Employment',
  [TalentObjectionSurveyReason.REQUIRES_PAYMENT_FOR_SCREENING]:
    'Screening process: Talent wishes to be paid for completing screening',
  [TalentObjectionSurveyReason.NO_TIME_FOR_SCREENING]:
    'Screening process: Talent does not have time to complete screening',
  [TalentObjectionSurveyReason.RECENTLY_CHANGED_JOB]:
    'Talent not available - just started a new role',
  [TalentObjectionSurveyReason.REQUIRES_VISA_SPONSORSHIP]:
    'Visa Sponsorship Required',
  [TalentObjectionSurveyReason.NOT_OPEN_TO_NEW_OPPORTUNITIES]:
    'Talent is not open to new opportunities',
  [TalentObjectionSurveyReason.NOT_INTERESTED_IN_FREELANCING]:
    'Talent is not interested in freelancing',
  [TalentObjectionSurveyReason.NOT_AGREE_WITH_SCREENING_EVALUATION]:
    'Screening process: Talent does not agree with the evaluation process',
  [TalentObjectionSurveyReason.BAD_COMPANY_REVIEWS]:
    'Talent objects joining Toptal due to company reviews',
  [TalentObjectionSurveyReason.OTHER]: 'Other'
}
