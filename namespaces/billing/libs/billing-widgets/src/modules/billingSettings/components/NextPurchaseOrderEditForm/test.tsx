import React from 'react'
import { Form } from '@toptal/picasso-forms'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import NextPurchaseOrderEditForm from '.'
import * as dataHooks from '../../data'

jest.mock('../../data', () => ({
  useGetPurchaseOrdersOptions: jest.fn(() => jest.fn())
}))

const noop = () => {}

type Props = {
  currentPOid?: string
  nextPOid?: string
}

const render = ({ currentPOid, nextPOid }: Props) =>
  renderComponent(
    <Form onSubmit={noop}>
      <NextPurchaseOrderEditForm
        jobId='123'
        currentPOid={currentPOid}
        nextPOid={nextPOid}
      />
    </Form>
  )

describe('NextPurchaseOrderEditModalForm', () => {
  it('calls options query with options based on current/next PO', () => {
    const { getByTestId } = render({
      currentPOid: 'foo',
      nextPOid: 'bar'
    })

    const spy = jest.spyOn(dataHooks, 'useGetPurchaseOrdersOptions')

    expect(spy).toHaveBeenCalledWith('123', ['bar'], ['foo'])

    expect(
      getByTestId('NextPurchaseOrderEditForm-autocomplete')
    ).toHaveTextContent('Next Purchase Order')
  })
})
