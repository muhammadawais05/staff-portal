import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CommercialDocumentUpdateDueDateModal from '.'
import { useGetCommercialDocumentUpdateDueDateQuery } from '../../data'
import adjustValues from './adjustValues'

jest.mock('../CommercialDocumentUpdateDueDateModalForm')
jest.mock('../../data', () => ({
  ...jest.requireActual('../../data'),
  useSetUpdateCommercialDocumentDueDateMutation: jest.fn(() => [
    'useSetUpdateCommercialDocumentDueDateMutation'
  ])
}))
jest.mock('../../data/getCommercialDocumentUpdateDueDate.graphql.types')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

const render = (
  props: ComponentProps<typeof CommercialDocumentUpdateDueDateModal>
) => renderComponent(<CommercialDocumentUpdateDueDateModal {...props} />)

const mockGetCommercialDocumentUpdateDueDateQuery =
  useGetCommercialDocumentUpdateDueDateQuery as jest.Mock

describe('CommercialDocumentUpdateDueDateModal', () => {
  it('invoice render', () => {
    mockGetCommercialDocumentUpdateDueDateQuery.mockReturnValue({
      data: { node: fixtures.MockInvoice },
      error: null,
      loading: false
    })

    const { container } = render({
      options: {
        nodeId: fixtures.MockInvoice.documentNumber.toString(),
        nodeType: 'invoice'
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('payment render', () => {
    mockGetCommercialDocumentUpdateDueDateQuery.mockReturnValue({
      data: { node: fixtures.MockPayment },
      error: null,
      loading: false
    })

    const { container } = render({
      options: {
        nodeId: fixtures.MockPayment.documentNumber.toString(),
        nodeType: 'payment'
      }
    })

    expect(container).toMatchSnapshot()
  })

  it('loading render', () => {
    mockGetCommercialDocumentUpdateDueDateQuery.mockReturnValue({
      data: null,
      error: null,
      loading: true
    })

    const { container } = render({
      options: {
        nodeId: fixtures.MockInvoice.documentNumber.toString(),
        nodeType: 'invoice'
      }
    })

    expect(container).toMatchSnapshot()
  })
})

describe('#adjustValues', () => {
  beforeAll(() => MockDate.set('2020-06-11T00:00:00.000+00:00'))

  it('returns values with normalized date', () => {
    const actual = adjustValues({
      foo: 'bar',
      dueDate: new Date('2020-11-06T00:00:00.000Z')
    })

    const expected = { foo: 'bar', dueDate: '2020-11-06' }

    expect(actual).toEqual(expected)
  })
})
