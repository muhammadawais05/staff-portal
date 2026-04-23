import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import AddModalForm from '.'
import getInstallmentsTotal from './getInstallmentsTotal'

jest.mock('../AddModalFormConfirm')
jest.mock('../AddModalFormContent')
jest.mock('../AddModalFormContentFieldArray')
jest.mock(
  '@staff-portal/billing/src/data/getExperiments.graphql.types',
  () => ({
    useGetExperimentsQuery: () => [jest.fn()]
  })
)

const render = (props: ComponentProps<typeof AddModalForm>) =>
  renderComponent(
    <Form>
      <AddModalForm {...props} />
    </Form>
  )

describe('AddModalForm', () => {
  beforeEach(() => MockDate.set('2019/12/04'))

  afterEach(() => MockDate.reset())

  it('default render', () => {
    const { getByTestId } = render({
      purchaseOrders: [],
      purchaseOrderLines: {},
      setConfirmStep: () => {},
      isConfirmStep: false
    })

    expect(getByTestId('AddModalFormConfirm')).toBeInTheDocument()
    expect(getByTestId('AddModalFormContent')).toBeInTheDocument()
    expect(getByTestId('ModalFooter')).toBeInTheDocument()
  })
  describe('when inline is `true`', () => {
    it('will render subtitle', () => {
      const { getByTestId, queryByTestId } = render({
        setConfirmStep: jest.fn(),
        purchaseOrders: [],
        purchaseOrderLines: {},
        isConfirmStep: false,
        isInline: true
      })

      expect(queryByTestId('AddModalFormContent-title')).not.toBeInTheDocument()
      expect(getByTestId('inline-title')).toBeInTheDocument()
    })
  })
})

describe('#getInstallmentsTotal', () => {
  it('return total amount of installments', () => {
    expect(
      getInstallmentsTotal({
        installments: [
          { amount: '1000', dueDate: '2015-05-15' },
          { amount: '500', dueDate: '2015-06-15' },
          { amount: '666', dueDate: '2015-07-15' },
          { amount: undefined, dueDate: '2015-08-15' }
        ]
      })
    ).toBe('2166.00')
  })
})
