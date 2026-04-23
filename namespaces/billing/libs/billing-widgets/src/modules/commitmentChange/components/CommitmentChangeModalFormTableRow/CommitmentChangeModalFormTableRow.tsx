import { FinalField } from '@toptal/picasso-forms'
import { Table } from '@toptal/picasso'
import { upperFirst } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { onBlurToFloatNumber } from '@staff-portal/billing/src/_lib/form/handlers'
import FormInput from '@staff-portal/billing/src/components/FormInput'
import {
  isDefaultOrLegacyRateMethod,
  isLegacyRateMethod,
  shouldDisplayDiscountTierRateFields
} from '@staff-portal/billing/src/utils/discountTierUtils'

const displayName = 'CommitmentChangeModalFormTableRow'

interface Props {
  type: 'hourly' | 'partTime' | 'fullTime'
  rateMethod?: string
}

export const CommitmentChangeModalFormTableRow: FC<Props> = memo(
  ({ type, rateMethod }) => {
    const { t: translate } = useTranslation('commitment')
    const icon = <span>$</span>

    const discountFieldName = `${type}Discount`
    const talentFieldName = `talent${upperFirst(type)}Rate`
    const companyFieldName = `company${upperFirst(type)}Rate`

    const showDiscountField = shouldDisplayDiscountTierRateFields(rateMethod)

    const discount =
      type === 'partTime' ? '5' : type === 'fullTime' ? '10' : null

    return (
      <Table.Row>
        <Table.Cell css={{ minWidth: 140 }}>
          {translate(
            `changeModal.form.fields.rateTable.rowHeader.${type}` as const
          )}
        </Table.Cell>
        {showDiscountField && (
          <Table.Cell style={{ minWidth: 138 }}>
            {type !== 'hourly' && (
              <FinalField
                component={FormInput}
                inputProps={{
                  autoComplete: 'off',
                  icon: <span>%</span>,
                  placeholder: discount,
                  disabled: isDefaultOrLegacyRateMethod(rateMethod),
                  min: 0,
                  max: 100
                }}
                name={discountFieldName}
                required
                testId={`${type}-discount`}
              />
            )}
          </Table.Cell>
        )}
        <Table.Cell>
          <FinalField
            component={FormInput}
            inputProps={{
              autoComplete: 'off',
              disabled: isLegacyRateMethod(rateMethod),
              icon,
              placeholder: '0.00'
            }}
            name={talentFieldName}
            handleOnBlur={onBlurToFloatNumber}
            required
            testId={`talent-${type}-rate`}
          />
        </Table.Cell>
        <Table.Cell>
          <FinalField
            component={FormInput}
            inputProps={{
              autoComplete: 'off',
              disabled: isLegacyRateMethod(rateMethod),
              icon,
              placeholder: '0.00'
            }}
            name={companyFieldName}
            handleOnBlur={onBlurToFloatNumber}
            required
            testId={`company-${type}-rate`}
          />
        </Table.Cell>
      </Table.Row>
    )
  }
)

CommitmentChangeModalFormTableRow.displayName = displayName

export default CommitmentChangeModalFormTableRow
