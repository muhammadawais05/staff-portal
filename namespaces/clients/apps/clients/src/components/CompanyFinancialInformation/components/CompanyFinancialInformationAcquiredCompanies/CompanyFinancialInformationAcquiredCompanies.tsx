import React from 'react'
import { Container } from '@toptal/picasso'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { CompanyFinancialInformationFragment } from '../../data'
import CompanyExternalSourceInfo, {
  CompanyExternalSourceType,
  getCompanyExternalSourceAcquiredCompaniesTooltip,
  getCompanyExternalSourceAcquiredCompanies
} from '../../../CompanyExternalSourceInfo'
import { adjustAcquiredCompanies } from '../../utils/adjust-values'
import { getCompanyFinancialInformationValueHook } from '../../utils/get-company-financial-information-value-hook'

interface Props {
  disabled?: boolean
  onChange: (key: keyof PatchClientProfileInput, values: AnyObject) => void
  company: CompanyFinancialInformationFragment
}

const CompanyFinancialInformationTotalFunding = ({
  disabled,
  onChange,
  company
}: Props) => {
  const { id: clientId, buyingSignalsService } = company
  const value = getCompanyExternalSourceAcquiredCompanies(company)

  return (
    <>
      <EditableField<PatchClientProfileInput>
        name='acquiredCompanies'
        disabled={disabled}
        value={value}
        updateOnBlur
        onChange={onChange}
        adjustValues={adjustAcquiredCompanies}
        queryValue={getCompanyFinancialInformationValueHook(
          clientId,
          'acquiredCompanies'
        )}
        viewer={value || NO_VALUE}
        editor={props => (
          <Form.Input {...props} autoFocus size='small' width='full' />
        )}
        icon={
          <Container top={0.2}>
            {getCompanyExternalSourceAcquiredCompaniesTooltip(company)}
          </Container>
        }
      />
      <CompanyExternalSourceInfo
        type={CompanyExternalSourceType.BSS}
        userValue={value}
        value={buyingSignalsService?.acquiredCompanies?.join(', ')}
      />
    </>
  )
}

export default CompanyFinancialInformationTotalFunding
