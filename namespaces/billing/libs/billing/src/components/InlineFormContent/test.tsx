import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import { fireEvent } from '@toptal/picasso/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import FormContent from '.'
import renderComponent from '../../utils/tests'

const noop = () => {}

const render = (
  props: ComponentProps<typeof FormContent> = {
    editComponent: <div data-testid='form' />,
    label: 'My form'
  }
) =>
  renderComponent(
    <Form onSubmit={noop}>
      <FormContent {...props} />
    </Form>
  )

describe('FormContent', () => {
  it('default render', () => {
    const { getByTestId, queryByTestId } = render()

    expect(getByTestId('edit')).toBeInTheDocument()
    expect(queryByTestId('form')).not.toBeInTheDocument()
  })

  it('disabled operation', () => {
    const { getByTestId } = render({
      label: '',
      editComponent: <></>,
      operation: { callable: OperationCallableTypes.DISABLED, messages: [''] }
    })

    expect(getByTestId('edit')).toHaveAttribute('aria-disabled', 'true')
  })

  it('render inline form', () => {
    const { getByTestId, queryByTestId } = render()

    fireEvent.click(getByTestId('edit'))
    expect(queryByTestId('form')).toBeInTheDocument()
  })

  it('uses onReset before closing', () => {
    const mock = jest.fn()
    const { getByTestId } = render({
      editComponent: <div data-testid='form' />,
      label: 'My form',
      onReset: mock
    })

    fireEvent.click(getByTestId('edit'))
    fireEvent.click(getByTestId('cancel'))
    expect(mock).toHaveBeenCalledTimes(1)
  })
})
