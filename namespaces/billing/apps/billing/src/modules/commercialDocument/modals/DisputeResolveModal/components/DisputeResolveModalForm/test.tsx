import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import DisputeResolveModalForm from '.'

jest.mock('@staff-portal/billing/src/store')
jest.mock('@staff-portal/billing/src/_lib/form/fieldValidators')
jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (
  props: Omit<
    ComponentProps<typeof DisputeResolveModalForm>,
    'handleOnSubmit' | 'initialValues'
  >
) =>
  renderComponent(
    <DisputeResolveModalForm
      initialValues={{ comment: '' }}
      handleOnSubmit={jest.fn()}
      {...props}
    />
  )

describe('DisputeResolveModalForm', () => {
  beforeAll(() => {
    MockDate.set('2019/06/15')
  })

  afterAll(MockDate.reset)

  describe('when type is "invoice"', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        type: 'invoice',
        documentNumber: 123456
      })

      expect(queryByTestId('resolveTalentPaymentDisputes')).not.toBeNull()
      expect(queryByTestId('comment')).not.toBeNull()
    })
  })

  describe('when type is "payment"', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        type: 'payment',
        documentNumber: 123456
      })

      expect(queryByTestId('resolveTalentPaymentDisputes')).toBeNull()
      expect(queryByTestId('comment')).not.toBeNull()
    })
  })
})
