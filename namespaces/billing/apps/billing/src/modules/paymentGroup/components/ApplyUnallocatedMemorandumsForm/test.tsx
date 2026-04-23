import { FinalForm, FormRenderProps } from '@toptal/picasso-forms'
import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ApplyUnallocatedMemorandumsForm from '.'
import { ApplyUnallocatedMemorandumsFormValues } from '../../modals/Pay/components/PaymentGroupApplyUnallocatedMemos/PaymentGroupApplyUnallocatedMemos'

jest.mock('../../../commercialDocument/components/MemosListWithHeader')
jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (props, initialValues = {}) =>
  renderComponent(
    <FinalForm
      render={(
        formProps: FormRenderProps<ApplyUnallocatedMemorandumsFormValues>
      ) => <ApplyUnallocatedMemorandumsForm formProps={formProps} {...props} />}
      initialValues={{
        ...initialValues,
        creditMemorandums: [],
        debitMemorandums: [],
        paymentGroupId: props.paymentGroupId,
        memorandumIdsToAllocate: []
      }}
      onSubmit={jest.fn()}
    />
  )

describe('ApplyUnallocatedMemorandumsForm', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      nodeId: 'VjEtUGF5bWVudEdyb3VwLTE4NjM0NA',
      unallocatedMemorandums: [fixtures.MockMemorandum]
    })

    expect(
      queryByTestId('ApplyUnallocatedMemorandumsForm-intro')
    ).toHaveTextContent(
      `Select one or more unallocated memorandums from the user's local account to add to the documents in the payment group before paying.`
    )
    expect(
      queryByTestId('ApplyUnallocatedMemorandumsForm-secondaryIntro')
    ).toHaveTextContent(
      `Leave all of the checkboxes empty to skip this action and proceed to payment.`
    )
  })
})
