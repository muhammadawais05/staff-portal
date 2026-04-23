import React from 'react'
import { isNotNullish } from '@staff-portal/utils'

import { GetInDepthCompanyResearchClientFragment } from '../../web-and-social-tab/data'
import { CompanyFinancialInformationFragment } from '../CompanyFinancialInformation/data'
import { CompanyExternalSourceTooltip } from './CompanyExternalSourceTooltip'
import { CompanyExternalSourceType } from './config'
import { CompanyOverviewFragment } from '../../basic-info-tab/components/AccountOverviewSection/data'

export const getCompanyExternalSourceCompanyHqPhone = (
  company: CompanyOverviewFragment
) => {
  return company.companyHqPhone ?? company?.clientopedia?.phone ?? ''
}

export const getCompanyExternalSourceTotalEmployee = (
  company: GetInDepthCompanyResearchClientFragment
) => {
  if (isNotNullish(company.internalEmployeeCount)) {
    return company.internalEmployeeCount
  }
  if (isNotNullish(company.buyingSignalsService?.currentEmployeeCount)) {
    return company.buyingSignalsService?.currentEmployeeCount
  }
  if (isNotNullish(company.clientopedia?.employeeCount)) {
    return company.clientopedia?.employeeCount
  }
}

export const getCompanyExternalSourceTotalEmployeeViewer = (
  company: GetInDepthCompanyResearchClientFragment
) => {
  const viewer = getCompanyExternalSourceTotalEmployee(company)

  return isNotNullish(viewer) ? viewer : company.giorgioEmployeeRange
}

export const getCompanyExternalSourceStage = (
  company: CompanyFinancialInformationFragment
) => {
  if (company.stage) {
    return company.stage
  }
  if (company.buyingSignalsService?.stage) {
    return company.buyingSignalsService?.stage
  }
}

export const getCompanyExternalSourceStageTooltip = (
  company: CompanyFinancialInformationFragment
) => {
  if (!company.stage) {
    return null
  }
  if (company.stage === company.buyingSignalsService?.stage) {
    return <CompanyExternalSourceTooltip type={CompanyExternalSourceType.BSS} />
  }
}

export const getCompanyExternalSourceAcquiredBy = (
  company: CompanyFinancialInformationFragment
) => {
  if (company.acquiredBy) {
    return company.acquiredBy?.join(', ')
  }
  if (company.buyingSignalsService?.acquiredBy) {
    return company.buyingSignalsService?.acquiredBy?.join(', ')
  }
}

export const getCompanyExternalSourceAcquiredByTooltip = (
  company: CompanyFinancialInformationFragment
) => {
  if (!company.acquiredBy) {
    return null
  }
  if (
    company.buyingSignalsService?.acquiredBy?.length &&
    company.acquiredBy?.join('') ===
      company.buyingSignalsService?.acquiredBy?.join('')
  ) {
    return <CompanyExternalSourceTooltip type={CompanyExternalSourceType.BSS} />
  }
}

export const getCompanyExternalSourceAcquiredCompanies = (
  company: CompanyFinancialInformationFragment
) => {
  if (company.acquiredCompanies) {
    return company.acquiredCompanies?.join(', ')
  }
  if (company.buyingSignalsService?.acquiredCompanies) {
    return company.buyingSignalsService?.acquiredCompanies?.join(', ')
  }
}

export const getCompanyExternalSourceAcquiredCompaniesTooltip = (
  company: CompanyFinancialInformationFragment
) => {
  if (!company.acquiredCompanies) {
    return null
  }
  if (
    company.buyingSignalsService?.acquiredCompanies?.length &&
    company.acquiredCompanies?.join('') ===
      company.buyingSignalsService?.acquiredCompanies?.join('')
  ) {
    return <CompanyExternalSourceTooltip type={CompanyExternalSourceType.BSS} />
  }
}
