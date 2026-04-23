import { CurrencyInput, DecimalNumberInput } from '@staff-portal/forms'
import {
  EngagementCommitmentEnum,
  EngagementRateMethodEnum
} from '@staff-portal/graphql/staff'
import { Table, Container, Typography } from '@toptal/picasso'
import { useFormState } from '@toptal/picasso-forms'
import React from 'react'

import { CandidateSendingDetailsStepAttributes } from '../../../../types'
import { DetailsStepPaymentsTalentFragment } from '../../../../data/get-details-step-data'
import PaymentsRateTableHourlyTooltip from '../PaymentsRateTableHourlyTooltip'
import { getFieldNames } from './utils'
import * as S from '../PaymentsRateTable/styles'

export const labelMap: Record<EngagementCommitmentEnum, string> = {
  [EngagementCommitmentEnum.FULL_TIME]: 'Full-time per week',
  [EngagementCommitmentEnum.PART_TIME]: 'Part-time per week',
  [EngagementCommitmentEnum.HOURLY]: 'Hourly rate'
}

type Props = {
  type: EngagementCommitmentEnum
  discountMultiplier: string
  canBeDiscounted?: boolean
  mostRecentEngageableApplication?: {
    baseHourlyRate?: string | null
    requestedHourlyRate?: string | null
  }
  talent: DetailsStepPaymentsTalentFragment
}

const PaymentsRateTableRow = ({
  type,
  discountMultiplier,
  canBeDiscounted,
  mostRecentEngageableApplication,
  talent
}: Props) => {
  const { values } = useFormState<CandidateSendingDetailsStepAttributes>()
  const { rateMethod } = values
  const { discountFieldName, talentFieldName, companyFieldName } =
    getFieldNames(type)
  const companyFieldValue = Number(
    values[companyFieldName as keyof CandidateSendingDetailsStepAttributes]
  )
  const discountedValue = Number(
    companyFieldValue * Number(discountMultiplier)
  ).toFixed(2)

  const isDiscountFieldDisabled =
    rateMethod === EngagementRateMethodEnum.DEFAULT

  return (
    <Table.Row>
      <Table.Cell css={S.labelColumn}>
        <Container flex alignItems='center'>
          {labelMap[type]}
          {type === EngagementCommitmentEnum.HOURLY && (
            <PaymentsRateTableHourlyTooltip
              mostRecentEngageableApplication={mostRecentEngageableApplication}
              talent={talent}
            />
          )}
        </Container>
      </Table.Cell>

      <Table.Cell css={S.discountColumn}>
        {type !== EngagementCommitmentEnum.HOURLY && (
          <DecimalNumberInput
            data-testid='payments-rate-table-row-discount-field'
            name={discountFieldName}
            disabled={isDiscountFieldDisabled}
            icon={<>%</>}
            autoComplete='off'
            width='full'
          />
        )}
      </Table.Cell>

      <Table.Cell css={S.ratesColumn}>
        <CurrencyInput
          name={talentFieldName}
          placeholder='0.00'
          width='full'
          autoComplete='off'
          allowDecimals
        />
      </Table.Cell>

      <Table.Cell css={S.ratesColumn}>
        <CurrencyInput
          name={companyFieldName}
          placeholder='0.00'
          width='full'
          autoComplete='off'
          allowDecimals
        />
      </Table.Cell>

      {canBeDiscounted && (
        <Table.Cell data-testid='payments-rate-table-row-discounted-value'>
          <Typography as='div' weight='semibold' size='medium'>
            ${discountedValue}
          </Typography>
        </Table.Cell>
      )}
    </Table.Row>
  )
}

export default PaymentsRateTableRow
