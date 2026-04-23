import React from 'react'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { Amount } from '@toptal/picasso'
import {
  EditableNumberInput,
  EditableField,
  getAdjustBigDecimalValue
} from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { getClientAnnualRevenueHook } from '../../../../utils'
import CompanyExternalSourceInfo, {
  CompanyExternalSourceType
} from '../../../../../components/CompanyExternalSourceInfo'
import {
  GetInDepthCompanyResearchClientFragment,
  SetPatchClientProfileDocument
} from '../../../../data'
import { AnnualRevenueViewer } from './components'

interface Props {
  disabled?: boolean
  company: GetInDepthCompanyResearchClientFragment
}

const InDepthCompanyResearchAnnualRevenue = ({
  disabled,
  company: { id, annualRevenue, clientopedia }
}: Props) => {
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetPatchClientProfileDocument,
    initialValues: { annualRevenue: annualRevenue || null },
    requiredValues: { clientId: id }
  })

  return (
    <>
      <EditableField<PatchClientProfileInput>
        onChange={handleChange}
        disabled={disabled}
        flex
        updateOnBlur
        name='annualRevenue'
        queryValue={getClientAnnualRevenueHook(id)}
        adjustValues={getAdjustBigDecimalValue('annualRevenue')}
        value={annualRevenue || undefined}
        viewer={<AnnualRevenueViewer value={annualRevenue} />}
        editor={props => <EditableNumberInput {...props} hideControls />}
      />

      <CompanyExternalSourceInfo
        value={clientopedia?.revenue}
        userValue={annualRevenue}
        formattedValue={
          // Address this once working on SPB-2225
          <Amount amount={clientopedia?.revenue ?? ''} weight='semibold' />
        }
        type={CompanyExternalSourceType.CLIENTOPEDIA}
      />
    </>
  )
}

export default InDepthCompanyResearchAnnualRevenue
