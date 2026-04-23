import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Container } from '@toptal/picasso'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { CompanyFinancialInformationFragment } from '../../data'
import CompanyExternalSourceInfo, {
  getCompanyExternalSourceAcquiredBy,
  getCompanyExternalSourceAcquiredByTooltip,
  CompanyExternalSourceType
} from '../../../CompanyExternalSourceInfo'
import { adjustAcquiredBy } from '../../utils/adjust-values'
import { getCompanyFinancialInformationValueHook } from '../../utils/get-company-financial-information-value-hook'

interface Props {
  disabled?: boolean
  onChange: (
    key: keyof PatchClientProfileInput,
    values: Partial<PatchClientProfileInput>
  ) => void
  company: CompanyFinancialInformationFragment
}

const CompanyFinancialInformationAcquiredBy = ({
  disabled,
  onChange,
  company
}: Props) => {
  const value = getCompanyExternalSourceAcquiredBy(company) ?? undefined

  return (
    <>
      <EditableField<PatchClientProfileInput>
        name='acquiredBy'
        disabled={disabled}
        value={value}
        updateOnBlur
        onChange={onChange}
        adjustValues={adjustAcquiredBy}
        queryValue={getCompanyFinancialInformationValueHook(
          company.id,
          'acquiredBy'
        )}
        viewer={value || NO_VALUE}
        editor={props => (
          <Form.Input {...props} autoFocus size='small' width='full' />
        )}
        icon={
          <Container top={0.2}>
            {getCompanyExternalSourceAcquiredByTooltip(company)}
          </Container>
        }
      />
      <CompanyExternalSourceInfo
        type={CompanyExternalSourceType.BSS}
        userValue={value}
        value={company.buyingSignalsService?.acquiredBy?.join(', ')}
      />
    </>
  )
}

export default CompanyFinancialInformationAcquiredBy
