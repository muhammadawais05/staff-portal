import { Container } from '@toptal/picasso'
import { Form, useForm } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select/types'
import React, { FC, memo, useState } from 'react'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'

import * as S from './styles'

const displayName = 'PurchaseOrderAssignmentEditor'

interface Props {
  purchaseOrders: Option[]
  submitting?: boolean
}

const PurchaseOrderAssignmentEditor: FC<Props> = memo(
  ({ purchaseOrders, submitting }) => {
    const form = useForm()
    const { values } = form.getState()
    const { modalContainer } = useExternalIntegratorContext()
    const [currentValue, setCurrentValue] = useState(values.purchaseOrderId)

    return (
      <Container css={S.form} data-testid='purchaseOrderEditorForm'>
        <Form.Select
          autoFocus={false}
          data-testid='purchaseOrderIdSelect'
          disabled={submitting}
          enableReset
          loading={submitting}
          name='purchaseOrderId'
          onChange={({ target: { value } }) => {
            // prevents duplicate mutation submission when
            // value changes from an empty string to null
            if (value || currentValue) {
              form.submit()
            }

            setCurrentValue(value)
          }}
          options={purchaseOrders}
          popperContainer={modalContainer}
          searchThreshold={0}
          width='full'
          native
        />
      </Container>
    )
  }
)

PurchaseOrderAssignmentEditor.displayName = displayName

export default PurchaseOrderAssignmentEditor
