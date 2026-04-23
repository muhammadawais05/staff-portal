import React from 'react'
import { Form } from '@toptal/picasso-forms'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import NextPurchaseOrderLineEditForm from '.'

jest.mock('../../data', () => ({
  useGetPurchaseOrdersOptions: jest.fn(() => jest.fn())
}))
jest.mock('../../utils', () => ({
  useGetPurchaseOrderFormState: jest.fn().mockReturnValue({})
}))

const noop = () => {}

type Props = {
  currentPOid?: string
  nextPOid?: string
}

const render = ({ currentPOid, nextPOid }: Props) =>
  renderComponent(
    <Form onSubmit={noop}>
      <NextPurchaseOrderLineEditForm
        jobId='123'
        currentPOid={currentPOid}
        nextPOid={nextPOid}
      />
    </Form>
  )

describe('NextPurchaseOrderEditModalForm', () => {
  afterAll(jest.resetAllMocks)
  it('calls options query with options based on current/next PO', () => {
    const { getByTestId } = render({
      currentPOid: 'foo',
      nextPOid: 'bar'
    })

    expect(getByTestId('autocomplete')).toHaveTextContent('Next Purchase Order')
  })
})
