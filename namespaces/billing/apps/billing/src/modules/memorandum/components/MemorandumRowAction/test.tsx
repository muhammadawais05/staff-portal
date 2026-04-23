import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import MemorandumRowAction from '.'

jest.mock('@staff-portal/billing/src/components/OperationFetcherForActions')

const render = (props: ComponentProps<typeof MemorandumRowAction>) =>
  renderComponent(<MemorandumRowAction {...props} />)

describe('MemorandumRowAction', () => {
  it('default render', () => {
    const { getByTestId } = render({
      memorandum: fixtures.MockMemorandum
    })

    expect(getByTestId('more-actions-button')).toBeInTheDocument()
  })
})
