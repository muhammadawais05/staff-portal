import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { QueryResult, EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { useGetClientIndustries } from '../../../../utils'
import CompanyExternalSourceInfo, {
  CompanyExternalSourceType
} from '../../../../../components/CompanyExternalSourceInfo'
import { GetInDepthCompanyResearchClientFragment } from '../../../../data'

interface Props {
  disabled?: boolean
  name: keyof PatchClientProfileInput
  company: GetInDepthCompanyResearchClientFragment
  adjustValues?: (values: AnyObject) => AnyObject
  queryValue: () => QueryResult<string>
  onChange: (key: keyof PatchClientProfileInput, values: AnyObject) => void
}

const InDepthCompanyResearchIndustry = ({
  queryValue,
  disabled = false,
  name,
  company: { industry, clientopedia, buyingSignalsService },
  ...rest
}: Props) => (
  <>
    <EditableField<PatchClientProfileInput, string, Option[]>
      {...rest}
      disabled={disabled}
      flex
      name={name}
      queryValue={queryValue}
      queryOptions={useGetClientIndustries}
      value={industry ?? undefined}
      viewer={industry || NO_VALUE}
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
      value={buyingSignalsService?.industry}
      userValue={industry}
      type={CompanyExternalSourceType.BSS}
    />
    <CompanyExternalSourceInfo
      value={clientopedia?.industries?.[0]}
      userValue={industry}
      type={CompanyExternalSourceType.CLIENTOPEDIA}
    />
  </>
)

export default InDepthCompanyResearchIndustry
