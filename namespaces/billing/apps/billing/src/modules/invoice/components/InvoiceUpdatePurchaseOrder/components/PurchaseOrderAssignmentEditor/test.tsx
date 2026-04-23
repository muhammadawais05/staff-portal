import { Form } from '@toptal/picasso-forms'
import { merge } from 'lodash-es'
import React from 'react'
import { Option } from '@staff-portal/billing/src/@types/types'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrderAssignmentEditor from './PurchaseOrderAssignmentEditor'

jest.mock('@staff-portal/billing/src/components/FormInputSelect')

interface Props {
  purchaseOrders?: Option[]
  submitting?: boolean
}

const defaults = {
  purchaseOrders: [],
  submitting: false
}

const render = (vars?: Partial<Props>) => {
  const props = merge({}, defaults, vars)

  return renderComponent(
    <Form data-testid='purchaseOrderEditorForm' onSubmit={jest.fn()}>
      <PurchaseOrderAssignmentEditor {...props} />
    </Form>
  )
}

describe('PurchaseOrderAssignmentEditor', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('purchaseOrderIdSelect')).toBeInTheDocument()
  })

  it('displays loader and disables the field when submitting', () => {
    const { getByRole, getByTestId } = render({ submitting: true })

    expect(
      getByTestId('purchaseOrderIdSelect').querySelector('#purchaseOrderId')
    ).toBeDisabled()
    expect(getByRole('progressbar')).toBeInTheDocument()
  })
})
