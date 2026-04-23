import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TableRowActions from '.'

const render = (props: ComponentProps<typeof TableRowActions>) =>
  renderComponent(<TableRowActions {...props} />)

describe('TableRowActions', () => {
  it('default render', () => {
    const { getByTestId } = render({
      operations: fixtures.MockTransfer.operations,
      id: fixtures.MockTransfer.id,
      onTransferActionClick: jest.fn()
    })

    expect(getByTestId('pay-transfer')).toBeInTheDocument()
    expect(getByTestId('pay-transfer')).toContainHTML('Paid')

    expect(getByTestId('mark-failed-transfer')).toBeInTheDocument()
    expect(getByTestId('mark-failed-transfer')).toContainHTML('Failed')

    expect(getByTestId('claim-transfer-refund')).toBeInTheDocument()
    expect(getByTestId('claim-transfer-refund')).toContainHTML('Refund')

    expect(getByTestId('transfer-cancel')).toBeInTheDocument()
    expect(getByTestId('transfer-cancel')).toContainHTML('Cancel')

    expect(getByTestId('transfer-postpone')).toBeInTheDocument()
    expect(getByTestId('transfer-postpone')).toContainHTML('Postpone')

    expect(getByTestId('rollback-transfer')).toBeInTheDocument()
    expect(getByTestId('rollback-transfer')).toContainHTML('Revert')
  })
})
