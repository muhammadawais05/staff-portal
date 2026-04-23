import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { Table } from '@toptal/picasso'
import { useForm, useFormState, OnFocus } from '@toptal/picasso-forms'
import React, { Fragment } from 'react'
import {
  RatesCalculator,
  useLastField,
  ratesFieldsNames,
  RateFieldOnChange,
  MarkupFieldOnChange,
  RateMethodFieldOnChange
} from '@staff-portal/billing'

import { DetailsStepPaymentsTalentFragment } from '../../../../data/get-details-step-data'
import { CandidateSendingDetailsStepAttributes } from '../../../../types'
import PaymentsRateTableRow from '../PaymentsRateTableRow'
import { getDiscountedValue } from './utils'
import * as S from './styles'

const ratesCalculator = new RatesCalculator()

interface Props {
  canBeDiscounted?: boolean
  commitment?: EngagementCommitmentEnum | null
  discountMultiplier: string
  defaultUpcharge?: string | null
  mostRecentEngageableApplication?: {
    baseHourlyRate?: string | null
    requestedHourlyRate?: string | null
  }
  talent: DetailsStepPaymentsTalentFragment
}

const PaymentsRateTable = ({
  canBeDiscounted,
  commitment,
  discountMultiplier,
  defaultUpcharge,
  mostRecentEngageableApplication,
  talent
}: Props) => {
  const { lastFocusedFieldName, setFields, updateField } = useLastField()
  const form = useForm<CandidateSendingDetailsStepAttributes>()
  const { values } = useFormState<CandidateSendingDetailsStepAttributes>()
  const { rateMethod } = values
  const discountedValue = getDiscountedValue(discountMultiplier)

  ratesCalculator.initialize(
    {
      ...values,
      partTimeDiscount: values.partTimeDiscount ?? undefined,
      fullTimeDiscount: values.fullTimeDiscount ?? undefined,
      markup: values.markup ?? undefined,
      commitment: commitment ?? undefined,
      discountMultiplier,
      defaultUpcharge: defaultUpcharge ?? undefined,
      canBeDiscounted
    },
    rateMethod ?? undefined
  )

  const sharedRowProps = {
    canBeDiscounted,
    discountMultiplier,
    mostRecentEngageableApplication,
    talent
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell css={S.labelColumn}>Engagement Type</Table.Cell>

          <Table.Cell css={S.discountColumn}>Discount</Table.Cell>

          <Table.Cell css={S.ratesColumn}>Talent</Table.Cell>

          <Table.Cell css={S.ratesColumn}>
            {canBeDiscounted ? 'Company (Credit Card / Paypal)' : 'Company'}
          </Table.Cell>

          {canBeDiscounted && (
            <Table.Cell>
              Company ({discountedValue}% off for ACH/Wire)
            </Table.Cell>
          )}
        </Table.Row>
      </Table.Head>

      <Table.Body>
        <PaymentsRateTableRow
          type={EngagementCommitmentEnum.HOURLY}
          {...sharedRowProps}
        />
        <PaymentsRateTableRow
          type={EngagementCommitmentEnum.PART_TIME}
          {...sharedRowProps}
        />
        <PaymentsRateTableRow
          type={EngagementCommitmentEnum.FULL_TIME}
          {...sharedRowProps}
        />

        {ratesFieldsNames.map(name => (
          <Fragment key={`custom-rates-listeners-${name}`}>
            <RateFieldOnChange
              name={name}
              form={form}
              calculator={ratesCalculator}
              rateMethod={rateMethod ?? undefined}
              lastFocusedFieldName={lastFocusedFieldName}
              setFields={setFields}
            />

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
          rateMethod={rateMethod ?? undefined}
        />

        <RateMethodFieldOnChange
          form={form}
          calculator={ratesCalculator}
          setFields={setFields}
          lastFocusedFieldName={lastFocusedFieldName}
        />
      </Table.Body>
    </Table>
  )
}

export default PaymentsRateTable
