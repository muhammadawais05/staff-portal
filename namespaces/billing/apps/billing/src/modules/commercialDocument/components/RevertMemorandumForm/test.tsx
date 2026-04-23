import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import RevertMemorandumForm from '.'

const render = (props: ComponentProps<typeof RevertMemorandumForm>) =>
  renderComponent(<RevertMemorandumForm {...props} />)

describe('RevertMemorandumForm', () => {
  it('default render', () => {
    const { container } = render({
      handleOnSubmit: jest.fn(),
      number: 123456,
      amount: '123.00'
    })

    expect(container).toMatchSnapshot()
  })

  it('render with specific receiver name', () => {
    const { queryByTestId } = render({
      handleOnSubmit: jest.fn(),
      number: 123456,
      amount: '123.00',
      receiverName: 'Samella Smitham'
    })

    expect(queryByTestId('notifyReceiver')).toHaveTextContent(
      `Send the notification to Samella Smitham`
    )
  })
})
