import MockDate from 'mockdate'
import { noop } from '@toptal/picasso/utils'
import React from 'react'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import AddModalFormContentFieldArray from '.'

const render = installments =>
  renderComponent(
    <Form
      initialValues={{
        installments
      }}
      mutators={{ ...arrayMutators }}
      onSubmit={noop}
    >
      <AddModalFormContentFieldArray autoFocusDatepicker={false} />
    </Form>
  )

describe('AddModalFormContentFieldArray', () => {
  beforeAll(() => MockDate.set('2015/05/05 19:00'))

  afterAll(MockDate.reset)

  describe('when installments length === 1', () => {
    it('check minimum date', () => {
      const { getByTestId } = render([
        {
          amount: '',
          dueDate: '2015-05-05'
        }
      ])

      const field = getByTestId('installments[0].dueDate')

      expect(field).toHaveTextContent('2015-05-05')
    })
  })

  describe('when installments length is not 0', () => {
    it('check minimum dates', () => {
      const { getByTestId } = render([
        {
          amount: 1000,
          dueDate: '2015-05-05'
        },
        {
          amount: 1500,
          dueDate: '2015-06-05'
        }
      ])

      const field = getByTestId('installments[0].dueDate')
      const field1 = getByTestId('installments[1].dueDate')

      expect(field).toHaveTextContent('2015-05-05')
      expect(field1).toHaveTextContent('2015-05-05')
    })
  })
})
