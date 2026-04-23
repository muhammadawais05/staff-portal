import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { NO_VALUE } from '@staff-portal/config'
import { QueryResult, EditableField } from '@staff-portal/editable'
import { amountCleanNumberValue } from '@staff-portal/filters'
import { zeroOrGreaterOrEmpty } from '@staff-portal/validators'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import CompanyExternalSourceInfo, {
  CompanyExternalSourceType
} from '../../../../../components/CompanyExternalSourceInfo'
import {
  GetInDepthCompanyResearchClientFragment,
  SetPatchClientProfileDocument
} from '../../../../data'

interface Props {
  disabled?: boolean
  queryValue: () => QueryResult<string>
  company: GetInDepthCompanyResearchClientFragment
}

const InDepthCompanyResearchFoundingYear = ({
  disabled,
  queryValue,
  company: { id, foundingYear, clientopedia, buyingSignalsService }
}: Props) => {
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetPatchClientProfileDocument,
    initialValues: { foundingYear: foundingYear || null },
    requiredValues: { clientId: id }
  })

  return (
    <>
      <EditableField<PatchClientProfileInput>
        disabled={disabled}
        name='foundingYear'
        onChange={handleChange}
        queryValue={queryValue}
        value={foundingYear ?? undefined}
        updateOnBlur
        editor={props => (
          <Form.Input
            {...props}
            autoFocus
            parse={amountCleanNumberValue}
            validate={zeroOrGreaterOrEmpty}
            size='small'
            width='full'
          />
        )}
        viewer={foundingYear || NO_VALUE}
      />
      <CompanyExternalSourceInfo
        value={buyingSignalsService?.foundingYear}
        userValue={foundingYear}
        type={CompanyExternalSourceType.BSS}
      />
      <CompanyExternalSourceInfo
        value={clientopedia?.foundingYear}
        userValue={foundingYear}
        type={CompanyExternalSourceType.CLIENTOPEDIA}
      />
    </>
  )
}

export default InDepthCompanyResearchFoundingYear
