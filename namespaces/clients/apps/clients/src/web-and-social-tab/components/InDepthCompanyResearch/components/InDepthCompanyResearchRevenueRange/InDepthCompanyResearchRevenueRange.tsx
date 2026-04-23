import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import {
  QueryResult,
  EditableField,
  ValuesToAdjust
} from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { useGetClientRevenueRanges } from '../../../../utils'
import CompanyExternalSourceInfo, {
  CompanyExternalSourceType
} from '../../../../../components/CompanyExternalSourceInfo'
import { GetInDepthCompanyResearchClientFragment } from '../../../../data'

interface Props {
  disabled?: boolean
  name: keyof PatchClientProfileInput
  company: GetInDepthCompanyResearchClientFragment
  adjustValues?: (
    values: ValuesToAdjust<
      PatchClientProfileInput,
      keyof PatchClientProfileInput
    >
  ) => Partial<PatchClientProfileInput>
  queryValue: () => QueryResult<string>
  onChange: (key: keyof PatchClientProfileInput, values: AnyObject) => void
}

const InDepthCompanyResearchRevenueRange = ({
  queryValue,
  disabled = false,
  name,
  company,
  ...rest
}: Props) => (
  <>
    <EditableField<PatchClientProfileInput, string, Option[]>
      {...rest}
      disabled={disabled}
      flex
      name={name}
      queryValue={queryValue}
      queryOptions={useGetClientRevenueRanges}
      value={company.revenueRange ?? undefined}
      viewer={company.revenueRange || NO_VALUE}
      editor={({ options = [], ...props }) => (
        <Form.Select
          {...props}
          enableReset
          options={options}
          size='small'
          width='full'
        />
      )}
    />
    <CompanyExternalSourceInfo
      value={company.buyingSignalsService?.revenueRange}
      userValue={company.revenueRange}
      type={CompanyExternalSourceType.BSS}
    />
    <CompanyExternalSourceInfo
      value={company.clientopedia?.revenueRange}
      userValue={company.revenueRange}
      type={CompanyExternalSourceType.CLIENTOPEDIA}
    />
  </>
)

export default InDepthCompanyResearchRevenueRange
