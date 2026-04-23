import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import AddModalFormContent from '.'

jest.mock('../AddModalFormContentFieldArray')
jest.mock('@staff-portal/billing/src/components/FormInputSelect')

const render = (props: ComponentProps<typeof AddModalFormContent>) =>
  renderComponent(
    <Form
      initialValues={{
        installments: [
          {
            amount: '100',
            dueDate: '2015-05-05'
          }
        ]
      }}
    >
      <AddModalFormContent {...props} />
    </Form>
  )

describe('AddModalFormContent', () => {
  beforeEach(() => MockDate.set('2019/12/04'))

  afterEach(() => MockDate.reset())

  it('default render', () => {
    const { getByTestId } = render({})

    expect(getByTestId('addInstallment')).toContainHTML('Add Installment')
  })
})
