import { OnFocus, useForm } from '@toptal/picasso-forms'
import { Container, Helpbox, Table } from '@toptal/picasso'
import { camelCase } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import React, { Fragment, memo, useEffect, useState } from 'react'
import {
  shouldDisplayDiscountTierRateFields,
  RateMethodFieldOnChange,
  MarkupFieldOnChange,
  RateFieldOnChange,
  RatesCalculator,
  ratesFieldsNames,
  useLastField
} from '@staff-portal/billing'

const discountFieldsNames = ['partTimeDiscount', 'fullTimeDiscount']

import CommitmentChangeModalFormTableRow from '../CommitmentChangeModalFormTableRow'
import { CommitmentChangeModalFormValues } from '../CommitmentChangeModalForm/CommitmentChangeModalForm'
import { updateRateChangeWarning } from './utils/update-range-change-warning'

const displayName = 'CommitmentChangeModalFormTable'
const ratesCalculator = new RatesCalculator()

interface FormTableProps {
  rateMethodSelected?: string
  onRateMethodChange: () => void
}

export const CommitmentChangeModalFormTable = memo(
  ({ rateMethodSelected, onRateMethodChange }: FormTableProps) => {
    const { lastFocusedFieldName, updateField, setFields } = useLastField()
    const { t: translate } = useTranslation('commitment')
    const form = useForm<CommitmentChangeModalFormValues>()
    const { getState } = form
    const formState = getState()
    const { initialValues, values } = formState

    const { rateMethod } = initialValues
    const rateMethodChanged =
      camelCase(rateMethodSelected) !== camelCase(rateMethod)
    const showDiscountField =
      shouldDisplayDiscountTierRateFields(rateMethodSelected)

    const [rateValueChanged, setRateValueChanged] = useState(rateMethodChanged)

    useEffect(() => {
      updateRateChangeWarning(values, initialValues, setRateValueChanged)
    }, [values, initialValues])

    useEffect(() => {
      ratesCalculator.initialize(values, rateMethodSelected)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const rateMethodFieldOnChangeCallback = () => {
      onRateMethodChange()
    }

    return (
      <Container bottom={2}>
        <Table>
          <Table.Head data-testid={`${displayName}-head`}>
            <Table.Row>
              <Table.Cell />
              {showDiscountField && (
                <Table.Cell data-testid={`${displayName}-head-discount`}>
                  {translate(
                    `changeModal.form.fields.rateTable.header.discount`
                  )}
                </Table.Cell>
              )}
              <Table.Cell data-testid={`${displayName}-head-talent`}>
                {translate(`changeModal.form.fields.rateTable.header.talent`)}
              </Table.Cell>
              <Table.Cell data-testid={`${displayName}-head-company`}>
                {translate('changeModal.form.fields.rateTable.header.company')}
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <CommitmentChangeModalFormTableRow
              type='hourly'
              rateMethod={rateMethodSelected}
            />
            <CommitmentChangeModalFormTableRow
              type='partTime'
              rateMethod={rateMethodSelected}
            />
            <CommitmentChangeModalFormTableRow
              type='fullTime'
              rateMethod={rateMethodSelected}
            />
            {ratesFieldsNames.map(name => (
              <Fragment key={`custom-rates-listeners-${name}`}>
                {(name === lastFocusedFieldName ||
                  discountFieldsNames.includes(name)) && (
                  <RateFieldOnChange
                    name={name}
                    form={form}
                    calculator={ratesCalculator}
                    lastFocusedFieldName={lastFocusedFieldName}
                    setFields={setFields}
                    rateMethod={rateMethodSelected}
                  />
                )}
                <OnFocus name={name}>
                  {() => {
                    updateField('lastFocusedFieldName', name)
                  }}
                </OnFocus>
              </Fragment>
            ))}

            <MarkupFieldOnChange
              form={form}
              calculator={ratesCalculator}
              setFields={setFields}
              updateField={updateField}
              rateMethod={rateMethodSelected}
            />

            <RateMethodFieldOnChange
              form={form}
              calculator={ratesCalculator}
              setFields={setFields}
              lastFocusedFieldName={lastFocusedFieldName}
              callback={rateMethodFieldOnChangeCallback}
            />
          </Table.Body>
        </Table>
        {(rateMethodChanged || rateValueChanged) && (
          <Container top={1}>
            <Helpbox variant='yellow'>
              <Helpbox.Content data-testid={`${displayName}-rateChangeWarning`}>
                {translate(
                  'changeModal.form.fields.rateTable.rateChangeWarning.text'
                )}
                <ul>
                  <li>
                    {translate(
                      'changeModal.form.fields.rateTable.rateChangeWarning.previousTalentRates',
                      {
                        talentHourlyRate: initialValues.talentHourlyRate,
                        talentPartTimeRate: initialValues.talentPartTimeRate,
                        talentFullTimeRate: initialValues.talentFullTimeRate
                      }
                    )}
                  </li>
                  <li>
                    {translate(
                      'changeModal.form.fields.rateTable.rateChangeWarning.previousClientRates',
                      {
                        companyHourlyRate: initialValues.companyHourlyRate,
                        companyPartTimeRate: initialValues.companyPartTimeRate,
                        companyFullTimeRate: initialValues.companyFullTimeRate
                      }
                    )}
                  </li>
                </ul>
              </Helpbox.Content>
            </Helpbox>
          </Container>
        )}
        <Container top={1}>
          <Helpbox variant='yellow'>
            <Helpbox.Content data-testid={`${displayName}-warning`}>
              {translate('changeModal.form.fields.rateTable.warning')}
            </Helpbox.Content>
          </Helpbox>
        </Container>
      </Container>
    )
  }
)

CommitmentChangeModalFormTable.displayName = displayName
export default CommitmentChangeModalFormTable
