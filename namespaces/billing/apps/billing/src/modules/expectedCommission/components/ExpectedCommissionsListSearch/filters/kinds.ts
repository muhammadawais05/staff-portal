import { FilterConfigType } from '@staff-portal/filters'
import { ExpectedCommissionKind } from '@staff-portal/graphql/staff'
import { FilterConfig } from '@staff-portal/billing/src/_lib/filters/filters-types'
import i18n from '@staff-portal/billing/src/utils/i18n'

const i18Root = 'expectedCommissionList:filters.fields.checkboxes.kind'

export const kindsFilterConfig: FilterConfig = {
  label: i18n.t('expectedCommissionList:filters.fields.common.kinds'),
  name: 'kinds',
  options: [
    {
      label: i18n.t(`${i18Root}.referredCommission`),
      value: ExpectedCommissionKind.REFERRED_COMMISSION
    },
    {
      label: i18n.t(`${i18Root}.sourcingCommission`),
      value: ExpectedCommissionKind.SOURCING_COMMISSION
    },
    {
      label: i18n.t(`${i18Root}.roleStepCommission`),
      value: ExpectedCommissionKind.ROLE_STEP_COMMISSION
    },
    {
      label: i18n.t(`${i18Root}.companyClaimingCommission`),
      value: ExpectedCommissionKind.COMPANY_CLAIMING_COMMISSION
    },
    {
      label: i18n.t(`${i18Root}.jobClaimingCommission`),
      value: ExpectedCommissionKind.JOB_CLAIMING_COMMISSION
    },
    {
      label: i18n.t(`${i18Root}.salesAnalysisCommission`),
      value: ExpectedCommissionKind.SALES_ANALYSIS_COMMISSION
    },
    {
      label: i18n.t(`${i18Root}.salesOwnerCommission`),
      value: ExpectedCommissionKind.SALES_OWNER_COMMISSION
    },
    {
      label: i18n.t(`${i18Root}.projectSalesCommission`),
      value: ExpectedCommissionKind.PROJECT_SALES_COMMISSION
    },
    {
      label: i18n.t(`${i18Root}.enterpriseCompanyClaimingCommission`),
      value: ExpectedCommissionKind.ENTERPRISE_COMPANY_CLAIMING_COMMISSION
    },
    {
      label: i18n.t(`${i18Root}.enterpriseClientPartnerCommission`),
      value: ExpectedCommissionKind.ENTERPRISE_CLIENT_PARTNER_COMMISSION
    },
    {
      label: i18n.t(`${i18Root}.topSkillBonusReferredCommission`),
      value: ExpectedCommissionKind.TOP_SKILL_BONUS_REFERRED_COMMISSION
    },
    {
      label: i18n.t(`${i18Root}.topSkillBonusTalentSourcingCommission`),
      value: ExpectedCommissionKind.TOP_SKILL_BONUS_TALENT_SOURCING_COMMISSION
    }
  ],
  type: FilterConfigType.CHECKBOX
}
