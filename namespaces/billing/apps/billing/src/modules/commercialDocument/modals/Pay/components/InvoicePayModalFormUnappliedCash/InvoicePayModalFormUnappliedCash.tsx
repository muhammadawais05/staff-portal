import { Container } from '@toptal/picasso'
import { FinalField, OnChange, useForm } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo, useEffect } from 'react'
import { Maybe } from '@staff-portal/graphql/staff'
import {
  composeValidators,
  required
} from '@staff-portal/billing/src/_lib/form/fieldValidators'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import FormInputSelect from '@staff-portal/billing/src/components/FormInputSelect'
import FormInputDatePicker from '@staff-portal/billing/src/components/FormInputDatePicker'
import { useDatepickerTimezoneProps } from '@staff-portal/billing/src/_lib/form/helpers'
import { getMinimumInvoiceDateRange } from '@staff-portal/billing-widgets/src/modules/unappliedCash/modals/utils'

import * as S from './styles'
import {
  getUnappliedCashGroupsAsOptions,
  getHasSingleUnappliedCashEntry
} from '../../utils'
import { ClientWithUnappliedCashFragment } from '../../data/getPayModalInvoice.graphql.types'

const displayName = 'InvoicePayModalFormUnappliedCash'

interface Props {
  clients: ClientWithUnappliedCashFragment[]
  invoiceIssueDate?: Maybe<string>
}

const InvoicePayModalFormUnappliedCash: FC<Props> = memo<Props>(
  ({ clients, invoiceIssueDate }) => {
    const { t: translate } = useTranslation(['common', 'invoice'])
    const { modalContainer } = useExternalIntegratorContext()
    const form = useForm()
    const datepickerTimezoneProps = useDatepickerTimezoneProps()
    const options = getUnappliedCashGroupsAsOptions(clients)
    const hasSingleCompanyAndSingleUCEntry =
      getHasSingleUnappliedCashEntry(options)

    const datepickerProps = {
      ...datepickerTimezoneProps,
      ...getMinimumInvoiceDateRange(invoiceIssueDate ?? '')
    }

    useEffect(() => {
      if (hasSingleCompanyAndSingleUCEntry) {
        form.change(
          'unappliedCashAmount',
          clients[0]?.unappliedCashEntries?.nodes?.[0]?.availableAmount
        )
        form.change(
          'unappliedCashId',
          clients?.[0]?.unappliedCashEntries?.nodes[0].id
        )
      }
    }, [hasSingleCompanyAndSingleUCEntry])

    return (
      <Container data-testid={displayName} css={S.container}>
        {!hasSingleCompanyAndSingleUCEntry && (
          <FinalField
            component={FormInputSelect}
            validate={composeValidators(required)}
            required
            label={translate('invoice:payModal.fields.unappliedCash.cash')}
            inputProps={{
              options,
              popperContainer: modalContainer
            }}
            name='unappliedCashIdFake'
            testId='payment-unapplied-cash-client'
          />
        )}
        <FinalField
          component={FormInputDatePicker}
          validate={composeValidators(required)}
          required
          label={translate('invoice:payModal.fields.unappliedCash.date')}
          inputProps={{
            ...datepickerProps,
            popperContainer: modalContainer
          }}
          name='unappliedCashEffectiveDate'
          testId='payment-unapplied-cash-date'
        />
        <OnChange name='unappliedCashIdFake'>
          {(value: string) => {
            form.change('unappliedCashId', value.split(' ')[0])
            form.change('unappliedCashAmount', value.split(' ')[1])
          }}
        </OnChange>
      </Container>
    )
  }
)

InvoicePayModalFormUnappliedCash.displayName = displayName

export default InvoicePayModalFormUnappliedCash
