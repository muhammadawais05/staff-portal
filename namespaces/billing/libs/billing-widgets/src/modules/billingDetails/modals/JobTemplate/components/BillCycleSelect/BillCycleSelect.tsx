import React, { FC, memo, useCallback, ChangeEvent } from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import { BillCycle } from '@staff-portal/graphql/staff'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import { getBillCycleOptions } from '@staff-portal/billing/src/utils'

const displayName = 'BillCycleSelect'

const BillCycleSelect: FC = memo(() => {
  const { change } = useForm()
  const { t: translate } = useTranslation('billingDetails')
  const { modalContainer } = useExternalIntegratorContext()

  const billCycleOptions = useCallback(
    () =>
      getBillCycleOptions([
        BillCycle.BI_WEEKLY,
        BillCycle.WEEKLY,
        BillCycle.SEMI_MONTHLY,
        BillCycle.MONTHLY
      ]),
    []
  )

  const resetBillDay = useCallback(() => change('billDay', undefined), [change])

  const handleOnChange = useCallback(
    ({
      target: { value: billCycle }
    }: ChangeEvent<{ name?: string | undefined; value: BillCycle }>) => {
      if (!billCycle) {
        resetBillDay()
      }
    },
    [resetBillDay]
  )

  return (
    <Form.Select
      data-testid={displayName}
      label={translate('modals.jobTemplate.fields.billCycle.label')}
      enableReset
      name='billCycle'
      options={billCycleOptions()}
      popperContainer={modalContainer}
      width='full'
      onChange={handleOnChange}
      testIds={{
        resetButton: 'reset-adornment'
      }}
    />
  )
})

BillCycleSelect.displayName = displayName

export default BillCycleSelect
