import React from 'react'
import { NO_VALUE } from '@staff-portal/config'
import { isNotNullish } from '@staff-portal/utils'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import {
  QueryResult,
  EditableNumberInput,
  EditableField
} from '@staff-portal/editable'
import { AnyObject } from '@toptal/picasso-forms'
import { positiveNumberOrEmpty } from '@staff-portal/validators'

import CompanyExternalSourceInfo, {
  CompanyExternalSourceType
} from '../../../../../components/CompanyExternalSourceInfo'
import { GetInDepthCompanyResearchClientFragment } from '../../../../data'

interface Props {
  disabled?: boolean
  queryValue: () => QueryResult<number>
  company: GetInDepthCompanyResearchClientFragment
  onChange: (key: keyof PatchClientProfileInput, values: AnyObject) => void
}

const InDepthCompanyResearchTotalEmployees = ({
  disabled,
  queryValue,
  onChange,
  company: {
    internalEmployeeCount,
    clientopedia,
    buyingSignalsService,
    giorgioEmployeeRange
  }
}: Props) => {
  return (
    <>
      <EditableField<PatchClientProfileInput, number>
        disabled={disabled}
        name='currentEmployeeCount'
        onChange={onChange}
        queryValue={queryValue}
        value={internalEmployeeCount ?? undefined}
        updateOnBlur
        editor={props => (
          <EditableNumberInput
            {...props}
            hideControls
            validate={positiveNumberOrEmpty}
          />
        )}
        viewer={
          isNotNullish(internalEmployeeCount)
            ? `${internalEmployeeCount}`
            : NO_VALUE
        }
      />
      <CompanyExternalSourceInfo
        value={buyingSignalsService?.currentEmployeeCount}
        userValue={internalEmployeeCount}
        type={CompanyExternalSourceType.BSS}
      />
      <CompanyExternalSourceInfo
        value={clientopedia?.employeeCount}
        userValue={internalEmployeeCount}
        type={CompanyExternalSourceType.CLIENTOPEDIA}
      />
      <CompanyExternalSourceInfo
        value={giorgioEmployeeRange}
        userValue={internalEmployeeCount}
        type={CompanyExternalSourceType.GIORGIO}
      />
    </>
  )
}

export default InDepthCompanyResearchTotalEmployees
