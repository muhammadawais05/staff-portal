import { PaymentKind } from '@staff-portal/graphql/staff'
import { FilterConfig } from '@staff-portal/billing/src/_lib/filters/filters-types'
import i18n from '@staff-portal/billing/src/utils/i18n'

const kindsFilterConfig: FilterConfig = {
  label: i18n.t('paymentList:filters.fields.common.kinds'),
  name: 'kinds',
  // eslint-disable-next-line
  // @ts-ignore
  options: [
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.talentPayment'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.TALENT_PAYMENT
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.cashLeadReward'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.CASH_LEAD_REWARD
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.cashLeadPromotion'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.CASH_LEAD_PROMOTION
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.returnedCredit'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.RETURNED_CREDIT
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.referredCommission'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.REFERRED_COMMISSION
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.sourcingCommission'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.SOURCING_COMMISSION
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.roleStepCommission'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.ROLE_STEP_COMMISSION
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.companyClaimingCommission'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.COMPANY_CLAIMING_COMMISSION
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.jobClaimingCommission'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.JOB_CLAIMING_COMMISSION
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.salesAnalysisCommission'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.SALES_ANALYSIS_COMMISSION
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.salesOwnerCommission'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.SALES_OWNER_COMMISSION
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.projectSalesCommission'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.PROJECT_SALES_COMMISSION
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.enterpriseCompanyClaimingCommission'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.ENTERPRISE_COMPANY_CLAIMING_COMMISSION
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.enterpriseClientPartnerCommission'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.ENTERPRISE_CLIENT_PARTNER_COMMISSION
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.topSkillBonusReferredCommission'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.TOP_SKILL_BONUS_REFERRED_COMMISSION
    },
    {
      label: i18n.t(
        'paymentList:filters.fields.checkboxes.kind.topSkillBonusTalentSourcingCommission'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: PaymentKind.TOP_SKILL_BONUS_TALENT_SOURCING_COMMISSION
    }
  ],
  // @ts-expect-error ENUM FilterConfigType expected, value used instead
  type: 'CHECKBOX'
}

export default kindsFilterConfig
