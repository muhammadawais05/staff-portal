import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { isOperationEnabled } from '@staff-portal/operations'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import {
  CompanyFinancialInformationFragment,
  SetPatchCompanyFinancialInformationDocument
} from '../../data'
import { isValueChanged } from '../../utils'
import CompanyFinancialInformationStage from '../CompanyFinancialInformationStage'
import CompanyFinancialInformationAcquiredBy from '../CompanyFinancialInformationAcquiredBy'
import CompanyFinancialInformationTotalFunding from '../CompanyFinancialInformationTotalFunding'
import CompanyFinancialInformationAcquiredCompanies from '../CompanyFinancialInformationAcquiredCompanies'

type Company = CompanyFinancialInformationFragment

interface Props {
  companyDetails: Company
}

const CompanyFinancialInformationDetailItems = ({ companyDetails }: Props) => {
  const {
    id: clientId,
    stage,
    totalFunding,
    operations,
    acquiredBy,
    acquiredCompanies
  } = companyDetails

  const operationDisabled = !isOperationEnabled(operations.patchClientProfile)

  const onChange = useEditableFieldChangeHandler({
    mutationDocument: SetPatchCompanyFinancialInformationDocument,
    requiredValues: { clientId },
    initialValues: {
      stage: stage ?? '',
      totalFunding,
      acquiredBy,
      acquiredCompanies
    },
    isValueChanged
  })

  return (
    <DetailedList labelColumnWidth={9}>
      <DetailedList.Row>
        <DetailedList.Item label='Stage'>
          <CompanyFinancialInformationStage
            company={companyDetails}
            disabled={operationDisabled}
            onChange={onChange}
          />
        </DetailedList.Item>
        <DetailedList.Item label='Acquired by'>
          <CompanyFinancialInformationAcquiredBy
            disabled={operationDisabled}
            company={companyDetails}
            onChange={onChange}
          />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Total funding'>
          <CompanyFinancialInformationTotalFunding
            disabled={operationDisabled}
            company={companyDetails}
            onChange={onChange}
          />
        </DetailedList.Item>
        <DetailedList.Item label='Acquired companies'>
          <CompanyFinancialInformationAcquiredCompanies
            disabled={operationDisabled}
            company={companyDetails}
            onChange={onChange}
          />
        </DetailedList.Item>
      </DetailedList.Row>
    </DetailedList>
  )
}

export default CompanyFinancialInformationDetailItems
