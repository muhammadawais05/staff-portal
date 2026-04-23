import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { formatAmount } from '@toptal/picasso/utils'
import { amountCleanNumberValue } from '@staff-portal/filters'
import { zeroOrGreaterOrEmpty } from '@staff-portal/validators'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { CompanyFinancialInformationFragment } from '../../data'
import CompanyExternalSourceInfo, {
  CompanyExternalSourceType
} from '../../../CompanyExternalSourceInfo'
import { adjustTotalFunding } from '../../utils/adjust-values'
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
  const {
    id: clientId,
    totalFunding,
    buyingSignalsService,
    clientopedia
  } = company

  return (
    <>
      <EditableField<PatchClientProfileInput>
        name='totalFunding'
        disabled={disabled}
        value={totalFunding ?? undefined}
        updateOnBlur
        onChange={onChange}
        adjustValues={adjustTotalFunding}
        queryValue={getCompanyFinancialInformationValueHook(
          clientId,
          'totalFunding'
        )}
        viewer={
          totalFunding
            ? formatAmount({
                amount: totalFunding
              })
            : NO_VALUE
        }
        editor={props => (
          <Form.Input
            {...props}
            autoFocus
            size='small'
            width='full'
            parse={amountCleanNumberValue}
            validate={zeroOrGreaterOrEmpty}
          />
        )}
      />
      <CompanyExternalSourceInfo
        type={CompanyExternalSourceType.BSS}
        userValue={totalFunding}
        value={buyingSignalsService?.totalFunding}
        formattedValue={formatAmount({
          amount: Number(buyingSignalsService?.totalFunding)
        })}
      />
      <CompanyExternalSourceInfo
        type={CompanyExternalSourceType.CLIENTOPEDIA}
        userValue={totalFunding}
        value={clientopedia?.totalFundingAmount}
        formattedValue={formatAmount({
          amount: Number(clientopedia?.totalFundingAmount)
        })}
      />
    </>
  )
}

export default CompanyFinancialInformationTotalFunding
