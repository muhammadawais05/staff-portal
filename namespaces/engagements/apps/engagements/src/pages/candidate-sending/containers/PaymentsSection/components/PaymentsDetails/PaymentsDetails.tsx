import React from 'react'
import { DetailedList as DL, LinkWrapper } from '@staff-portal/ui'
import { TalentLink } from '@staff-portal/talents'
import { Form, useForm, OnChange, useFormState } from '@toptal/picasso-forms'
import { TypographyOverflow } from '@toptal/picasso'
import { EngagementRateMethodEnum } from '@staff-portal/graphql/staff'
import { CurrencyInput } from '@staff-portal/forms'
import { stripDecimalsIfInteger } from '@staff-portal/string'

import { LabelRequiredPrefix } from '../../../../components'
import { LABEL_COLUMN_WIDTH } from '../../../../config'
import { CandidateSendingDetailsStepAttributes } from '../../../../types'
import * as S from '../../../../styles'
import {
  DetailsStepPaymentsJobClientFragment,
  DetailsStepPaymentsTalentFragment
} from '../../../../data/get-details-step-data'
import { getRateMethodOptions } from './utils'

interface Props {
  client: DetailsStepPaymentsJobClientFragment
  talent: DetailsStepPaymentsTalentFragment
  defaultMarkup?: string | null
  defaultPartTimeDiscount?: string | null
  defaultFullTimeDiscount?: string | null
}

const PaymentsDetails = ({
  client,
  talent,
  defaultMarkup,
  defaultPartTimeDiscount,
  defaultFullTimeDiscount
}: Props) => {
  const { change } = useForm<CandidateSendingDetailsStepAttributes>()
  const {
    values: { rateMethod }
  } = useFormState<CandidateSendingDetailsStepAttributes>()
  const isRateOverrideFieldVisible =
    rateMethod !== EngagementRateMethodEnum.DEFAULT
  const isMarkupFieldVisible =
    rateMethod !== EngagementRateMethodEnum.OVERRIDE_USING_CUSTOM_VALUES

  return (
    <DL
      labelColumnWidth={LABEL_COLUMN_WIDTH}
      itemPadding='small'
      striped={false}
      divided={false}
    >
      <DL.Row>
        <DL.Item label='Company'>
          <LinkWrapper
            wrapWhen={Boolean(client.webResource.url)}
            href={client.webResource.url as string}
            noUnderline
          >
            <TypographyOverflow
              as='span'
              weight='semibold'
              size='medium'
              color='inherit'
            >
              {`${client.fullName} [${client.contact?.fullName}]`}
            </TypographyOverflow>
          </LinkWrapper>
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label={talent.type}>
          <TalentLink
            fullName={talent.fullName}
            weight='semibold'
            url={talent.profileLink?.url}
            target={talent.profileLink?.newTab ? '_blank' : '_self'}
          />
        </DL.Item>
      </DL.Row>

      <DL.Row css={S.centerItemAlign}>
        <DL.Item label='Rate Method'>
          <Form.Select
            name='rateMethod'
            options={getRateMethodOptions()}
            css={S.formFieldWidth}
          />
          <OnChange name='rateMethod'>
            {(value: CandidateSendingDetailsStepAttributes['rateMethod']) => {
              if (value === EngagementRateMethodEnum.DEFAULT) {
                change('markup', stripDecimalsIfInteger(defaultMarkup ?? 0))
                change(
                  'partTimeDiscount',
                  stripDecimalsIfInteger(defaultPartTimeDiscount ?? 0)
                )
                change(
                  'fullTimeDiscount',
                  stripDecimalsIfInteger(defaultFullTimeDiscount ?? 0)
                )
              }
            }}
          </OnChange>
        </DL.Item>
      </DL.Row>

      {isRateOverrideFieldVisible && (
        <DL.Row css={S.centerItemAlign}>
          <DL.Item
            label={
              <>
                {!client?.enterprise && <LabelRequiredPrefix />}
                {'Rate Override Reason'}
              </>
            }
          >
            <Form.Input
              name='rateOverrideReason'
              required={!client?.enterprise}
              css={S.formFieldWidth}
            />
          </DL.Item>
        </DL.Row>
      )}

      {isMarkupFieldVisible && (
        <DL.Row css={S.centerItemAlign}>
          <DL.Item label='Markup'>
            <CurrencyInput
              name='markup'
              disabled={rateMethod == EngagementRateMethodEnum.DEFAULT}
              css={S.formFieldWidth}
              allowDecimals={false}
              precision={0}
            />
          </DL.Item>
        </DL.Row>
      )}
    </DL>
  )
}

export default PaymentsDetails
