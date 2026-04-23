import { FinalForm, FormRenderProps } from '@toptal/picasso-forms'
import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { ApplyUnallocatedMemorandumsFormValues } from '../../modals/ApplyUnallocatedMemorandums/components/ApplyUnallocatedMemorandums/ApplyUnallocatedMemorandums'
import ApplyUnallocatedMemorandumsForm from '.'

jest.mock('../MemosListWithHeader')
jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (props, initialValues = {}) =>
  renderComponent(
    <FinalForm
      render={(
        formProps: FormRenderProps<ApplyUnallocatedMemorandumsFormValues>
      ) => <ApplyUnallocatedMemorandumsForm formProps={formProps} {...props} />}
      initialValues={{
        ...initialValues,
        applyPrepayments: false,
        creditMemorandums: [],
        debitMemorandums: [],
        nodeId: props.nodeId,
        memorandumIdsToAllocate: []
      }}
      onSubmit={jest.fn()}
    />
  )

describe('ApplyUnallocatedMemorandumsForm', () => {
  it('invoice render', () => {
    const { container, queryByTestId } = render(
      {
        availablePrepaymentBalance: '1267.89',
        nodeId: 'VjEtSW52b2ljZS0yODA3NTk=',
        unallocatedMemorandums: fixtures.MockClient.unallocatedMemorandums.nodes
      },
      {}
    )

    expect(container).toMatchSnapshot()
    expect(
      queryByTestId('ApplyUnallocatedMemorandumsForm-intro')
    ).toContainHTML(
      `Select available prepayment and/or one or more unallocated user's memorandums to apply to the invoice.`
    )
  })

  it('payment render', () => {
    const { container, queryByTestId } = render({
      availablePrepaymentBalance: '1267.89',
      nodeId: 'VjEtUGF5bWVudC0yODA3NTk=',
      unallocatedMemorandums: fixtures.MockClient.unallocatedMemorandums.nodes
    })

    expect(container).toMatchSnapshot()
    expect(
      queryByTestId('ApplyUnallocatedMemorandumsForm-intro')
    ).toContainHTML(
      `Select one or more unallocated memorandums from the user's local account to apply to the payment before paying.`
    )
  })
})
