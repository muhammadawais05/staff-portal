import React, { useMemo } from 'react'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import { required } from '@staff-portal/billing/src/_lib/form/fieldValidators'
import { ClientOption } from '@staff-portal/billing-widgets/src/modules/consolidationDefaults/modals/ConsolidationDefault/components/ClientMultiSelector/ClientMultiSelector'

const displayName = 'ConsolidatedInvoiceBillToSelector'

type Props = {
  clients: ClientOption[]
  popperContainer?: HTMLElement
}

const ConsolidatedInvoiceBillToSelector = ({
  clients,
  popperContainer
}: Props) => {
  const { t: translate } = useTranslation('invoiceList')
  const options = useMemo(
    () => clients.map(({ id, fullName }) => ({ value: id, text: fullName })),
    [clients]
  )

  return clients.length > 1 ? (
    <Form.Select
      name='billTo'
      label={translate('modals.createConsolidatedInvoice.fields.billTo')}
      required
      searchThreshold={4}
      validate={required}
      data-testid={displayName}
      popperContainer={popperContainer}
      options={options}
    />
  ) : null
}

ConsolidatedInvoiceBillToSelector.displayName = displayName

export default ConsolidatedInvoiceBillToSelector
