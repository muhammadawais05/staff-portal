import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import ModalFormWarningText from '.'

const render = (props: ComponentProps<typeof ModalFormWarningText> = {}) =>
  renderComponent(<ModalFormWarningText {...props} />)

describe('render', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      document: fixtures.MockInvoice
    })

    expect(queryByTestId('ModalFormWarningText')).toBeInTheDocument()
  })

  it('no warning render', () => {
    const { queryByTestId } = render()

    expect(queryByTestId('ModalFormWarningText')).not.toBeInTheDocument()
  })
})
