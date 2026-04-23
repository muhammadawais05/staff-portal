import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select'
import { Container } from '@toptal/picasso'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { CompanyFinancialInformationFragment } from '../../data'
import CompanyExternalSourceInfo, {
  getCompanyExternalSourceStage,
  getCompanyExternalSourceStageTooltip,
  CompanyExternalSourceType
} from '../../../CompanyExternalSourceInfo'
import { useGetClientStages } from '../../utils'
import { adjustStage } from '../../utils/adjust-values'
import { getCompanyFinancialInformationValueHook } from '../../utils/get-company-financial-information-value-hook'

interface Props {
  disabled?: boolean
  onChange: (key: keyof PatchClientProfileInput, values: AnyObject) => void
  company: CompanyFinancialInformationFragment
}

const CompanyFinancialInformationStage = ({
  disabled,
  onChange,
  company
}: Props) => {
  const value = getCompanyExternalSourceStage(company) ?? undefined

  return (
    <>
      <EditableField<PatchClientProfileInput, string, Option[]>
        name='stage'
        disabled={disabled}
        value={value}
        viewer={value || NO_VALUE}
        updateOnBlur
        onChange={onChange}
        adjustValues={adjustStage}
        queryOptions={useGetClientStages}
        queryValue={getCompanyFinancialInformationValueHook(
          company.id,
          'stage'
        )}
        editor={({ options = [], ...props }) => (
          <Form.Select
            {...props}
            options={options}
            size='small'
            width='full'
            enableReset
          />
        )}
        icon={
          <Container top={0.2}>
            {getCompanyExternalSourceStageTooltip(company)}
          </Container>
        }
      />
      <CompanyExternalSourceInfo
        value={company.buyingSignalsService?.stage}
        userValue={getCompanyExternalSourceStage(company)}
        type={CompanyExternalSourceType.BSS}
      />
    </>
  )
}

export default CompanyFinancialInformationStage
