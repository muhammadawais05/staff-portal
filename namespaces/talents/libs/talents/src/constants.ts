import { ColorType } from '@toptal/picasso'
import {
  PaymentOptionPaymentMethod,
  SpecialistAssignmentStatuses,
  SpecializationApplicationRejectionReasonInput as RejectionReasonInput,
  SpecializationApplicationRejectionReasonValue as RejectionReason,
  TalentHealthStatusValue,
  VettedSkillResult
} from '@staff-portal/graphql/staff'

export const REJECTION_REASON_INPUT_MAPPING: Record<
  RejectionReasonInput,
  string
> = {
  [RejectionReason.CHEATER]: 'Cheater / fake identity',
  [RejectionReason.DUPLICATE]: 'Duplicate profiles',
  [RejectionReason.LACK_OF_EXPERIENCE]: 'Lack of experience',
  [RejectionReason.NO_SHOW]: 'No show',
  [RejectionReason.QUALITY_SOFT_SKILLS]: 'Quality (soft skills)',
  [RejectionReason.QUALITY_TECHNICAL_EXPERTISE]:
    'Quality (technical expertise)',
  [RejectionReason.SKILLS_NOT_A_FIT]: 'Skills not a fit',
  [RejectionReason.TALENT_CURRENTLY_BUSY]: 'Talent is busy at the moment',
  [RejectionReason.TALENT_DROPPING_OUT_OF_PROCESS]:
    'Talent wants to quit the process',
  [RejectionReason.UNRESPONSIVE]: 'Unresponsive',
  [RejectionReason.OTHER]: 'Other'
}

export const REJECTION_REASON_MAPPING: Record<RejectionReason, string> = {
  ...REJECTION_REASON_INPUT_MAPPING,
  [RejectionReason.OFAC]: 'OFAC Restricted',
  [RejectionReason.SYSTEM]: '',
  [RejectionReason.INACTIVITY]: '',
  [RejectionReason.SUPPLY_HEALTH_MODEL_BASIC_ENGLISH_PROFICIENCY]:
    'Rejected automatically due to basic English proficiency',
  [RejectionReason.SUPPLY_HEALTH_MODEL_LOW_PROFESSIONAL_EXPERIENCE]:
    'Rejected automatically due to low professional experience',
  [RejectionReason.SUPPLY_HEALTH_MODEL_SURPLUS_PROFILE]:
    'Rejected automatically as a surplus profile',
  [RejectionReason.SUPPLY_HEALTH_MODEL_UNFIT_DESIGNER_SKILLS]:
    'Rejected automatically due to unfit designer skills',
  [RejectionReason.SUPPLY_HEALTH_MODEL_UNFIT_SKILLS]:
    'Rejected automatically due to unfit skills',
  [RejectionReason.SUPPLY_HEALTH_MODEL_LEGACY]: ''
}

export const INACTIVE_SPECIALIST_ASSIGNMENT_STATUS: {
  text: string
  color: ColorType
} = { text: '-', color: 'grey' }

// There is the same mapper in `src/modules/talent-screening-specialists/constants.ts`
//
export const SPECIALIST_ASSIGNMENT_STATUS_MAPPING: Record<
  SpecialistAssignmentStatuses,
  { text: string; color: ColorType }
> = {
  [SpecialistAssignmentStatuses.ACTIVE]: {
    text: 'Active',
    color: 'green'
  },
  [SpecialistAssignmentStatuses.ARCHIVED]: {
    text: 'Archived',
    color: 'yellow'
  },
  [SpecialistAssignmentStatuses.NONE]: INACTIVE_SPECIALIST_ASSIGNMENT_STATUS
}

export const PAYMENT_METHODS_TEXT: Record<PaymentOptionPaymentMethod, string> =
  {
    [PaymentOptionPaymentMethod.ACH]: 'ACH',
    [PaymentOptionPaymentMethod.BANK_WIRE]: 'Bank Wire',
    [PaymentOptionPaymentMethod.BOA_ACH]: 'Boa ACH',
    [PaymentOptionPaymentMethod.BOA_WIRE]: 'Boa Wire',
    [PaymentOptionPaymentMethod.CASHPRO_ACH]: 'CashPro ACH',
    [PaymentOptionPaymentMethod.CASHPRO_WIRE]: 'CashPro Wire',
    [PaymentOptionPaymentMethod.CHECK]: 'Check',
    [PaymentOptionPaymentMethod.COLLECTION]: 'Collection',
    [PaymentOptionPaymentMethod.CREDIT_CARD]: 'Credit Card',
    [PaymentOptionPaymentMethod.FIRST_ACH]: 'First ACH',
    [PaymentOptionPaymentMethod.NAMELY]: 'Namely',
    [PaymentOptionPaymentMethod.ODESK]: 'oDesk',
    [PaymentOptionPaymentMethod.PAYONEER]: 'Payoneer',
    [PaymentOptionPaymentMethod.PAYPAL]: 'PayPal',
    [PaymentOptionPaymentMethod.PAYPAL_ACCOUNT]: 'PayPal Account',
    [PaymentOptionPaymentMethod.TOPTAL_CREDIT]: 'Toptal Credit',
    [PaymentOptionPaymentMethod.TOPTAL_PAYMENTS]: 'Toptal Payments',
    [PaymentOptionPaymentMethod.ULTIPRO]: 'UltiPro',
    [PaymentOptionPaymentMethod.WELLS_FARGO_ACH]: 'Wells Fargo ACH',
    [PaymentOptionPaymentMethod.WELLS_FARGO_CEO]: 'Wells Fargo CEO',
    [PaymentOptionPaymentMethod.WELLS_FARGO_WIRE]: 'Wells Fargo Wire',
    [PaymentOptionPaymentMethod.WESTERN_UNION]: 'Western Union',
    [PaymentOptionPaymentMethod.WIRE]: 'Wire',
    [PaymentOptionPaymentMethod.XOOM]: 'Xoom'
  }

export const HEALTH_STATUS_MAPPING: Record<
  TalentHealthStatusValue,
  { text: string; color: ColorType }
> = {
  [TalentHealthStatusValue.NONE]: {
    text: 'None',
    color: 'inherit'
  },
  [TalentHealthStatusValue.WATCH_LIST]: {
    text: 'Watch List',
    color: 'inherit'
  },
  [TalentHealthStatusValue.PROBATION]: {
    text: 'Probation',
    color: 'yellow'
  },
  [TalentHealthStatusValue.SUSPENSION]: {
    text: 'Suspension',
    color: 'red'
  },
  [TalentHealthStatusValue.TOP_PERFORMER]: {
    text: 'Top Performer',
    color: 'green'
  }
}

export const NOT_VETTED_RESULTS = [
  VettedSkillResult.DISQUALIFIED,
  VettedSkillResult.NOT_VETTABLE,
  VettedSkillResult.NO_SPECIALIZATION
]
