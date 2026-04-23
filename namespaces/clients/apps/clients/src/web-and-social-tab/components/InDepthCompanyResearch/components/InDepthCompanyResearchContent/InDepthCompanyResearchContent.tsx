import React from 'react'
import { Section } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'
import { Item } from '@toptal/picasso/TagSelector'
import { isOperationEnabled } from '@staff-portal/operations'
import { stringListToOptions } from '@staff-portal/string'

import {
  getClientCurrentEmployeeCountHook,
  getClientIndustryHook,
  getClientSecondaryIndustryHook,
  useInDepthCompanyResearchMutation,
  getClientFoundingYearHook,
  getClientRevenueRangeHook
} from '../../../../utils'
import { translate } from '../../../../utils/constants'
import { GetInDepthCompanyResearchClientFragment } from '../../../../data'
import {
  InDepthCompanyResearchBusinessModels,
  InDepthCompanyResearchIndustry,
  InDepthCompanyResearchRevenueRange,
  InDepthCompanyResearchAnnualRevenue,
  InDepthCompanyResearchSecondaryIndustry,
  InDepthCompanyResearchCareerPages,
  InDepthCompanyResearchFoundingYear,
  InDepthCompanyResearchTotalEmployees
} from '../'

interface Props {
  companyDetails: GetInDepthCompanyResearchClientFragment
}

const InDepthCompanyResearchContent = ({ companyDetails: company }: Props) => {
  const {
    id: clientId,
    careerPages,
    secondaryIndustry,
    businessModels,
    operations: {
      patchClientProfile: patchClientProfileOperation = undefined
    } = {}
  } = company

  const operationDisabled = !isOperationEnabled(patchClientProfileOperation)
  const { handleChange } = useInDepthCompanyResearchMutation(company)
  const useClientFoundingYear = getClientFoundingYearHook(clientId)
  const useClientIndustry = getClientIndustryHook(clientId)
  const useClientSecondaryIndustry = getClientSecondaryIndustryHook(clientId)
  const useClientRevenueRange = getClientRevenueRangeHook(clientId)
  const useClientCurrentEmployeeCount =
    getClientCurrentEmployeeCountHook(clientId)

  return (
    <Section title={translate.title} variant='withHeaderBar'>
      <DetailedList labelColumnWidth={9}>
        <DetailedList.Row>
          <DetailedList.Item label={translate.fields.yearFounded}>
            <InDepthCompanyResearchFoundingYear
              queryValue={useClientFoundingYear}
              company={company}
              disabled={operationDisabled}
            />
          </DetailedList.Item>
          <DetailedList.Item label={translate.fields.careerPages}>
            <InDepthCompanyResearchCareerPages
              clientId={clientId}
              disabled={operationDisabled}
              value={careerPages?.nodes ?? []}
              name='careerPages'
            />
          </DetailedList.Item>
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label={translate.fields.industry}>
            <InDepthCompanyResearchIndustry
              disabled={operationDisabled}
              name='industry'
              onChange={handleChange}
              company={company}
              queryValue={useClientIndustry}
            />
          </DetailedList.Item>
          <DetailedList.Item label={translate.fields.totalEmployees}>
            <InDepthCompanyResearchTotalEmployees
              disabled={operationDisabled}
              company={company}
              onChange={handleChange}
              queryValue={useClientCurrentEmployeeCount}
            />
          </DetailedList.Item>
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label={translate.fields.revenue}>
            <InDepthCompanyResearchRevenueRange
              disabled={operationDisabled}
              name='revenueRange'
              onChange={handleChange}
              company={company}
              queryValue={useClientRevenueRange}
            />
          </DetailedList.Item>
          <DetailedList.Item label={translate.fields.secondaryIndustry}>
            <InDepthCompanyResearchSecondaryIndustry
              disabled={operationDisabled}
              name='secondaryIndustry'
              onChange={handleChange}
              value={secondaryIndustry ?? undefined}
              queryValue={useClientSecondaryIndustry}
            />
          </DetailedList.Item>
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label={translate.fields.annualRevenue}>
            <InDepthCompanyResearchAnnualRevenue
              disabled={operationDisabled}
              company={company}
            />
          </DetailedList.Item>
          <DetailedList.Item label={translate.fields.businessModels}>
            <InDepthCompanyResearchBusinessModels
              clientId={clientId}
              disabled={operationDisabled}
              name='businessModels'
              onChange={handleChange}
              value={stringListToOptions(businessModels) as Item[]}
            />
          </DetailedList.Item>
        </DetailedList.Row>
      </DetailedList>
    </Section>
  )
}

export default InDepthCompanyResearchContent
