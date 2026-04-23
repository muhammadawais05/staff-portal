import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import UpdateIssueDateModal from '.'
import { useGetUpdateIssueDateQuery } from '../../data'
import adjustValues from './adjustValues'

jest.mock('../UpdateIssueDateModalForm')
jest.mock('../../data', () => ({
  ...jest.requireActual('../../data'),
  useSetUpdateIssueDateMutation: jest.fn(() => [
    'useSetUpdateIssueDateMutation'
  ])
}))
jest.mock('../../data/getUpdateIssueDate.graphql.types')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

const render = (props: ComponentProps<typeof UpdateIssueDateModal>) =>
  renderComponent(<UpdateIssueDateModal {...props} />)

const mockGetUpdateIssueDateQuery = useGetUpdateIssueDateQuery as jest.Mock

describe('UpdateIssueDateModal', () => {
  it('invoice render', () => {
    mockGetUpdateIssueDateQuery.mockReturnValue({
      data: { node: fixtures.MockInvoice },
      error: null,
      loading: false
    })

    const { getByTestId } = render({
      options: {
        nodeId: fixtures.MockInvoice.documentNumber.toString()
      }
    })

    expect(getByTestId('UpdateIssueDateModalForm')).toBeInTheDocument()
    expect(getByTestId('UpdateIssueDateModalForm').innerHTML).toBe(
      '{"documentNumber":"377249","initialValues":{"invoiceId":"VjEtSW52b2ljZS0zNzcyNDk","comment":"","issueDate":"2020-01-07T00:00:00.000Z"},"minValue":"2020-01-07"}'
    )
  })

  it('loading render', () => {
    mockGetUpdateIssueDateQuery.mockReturnValue({
      data: null,
      error: null,
      loading: true
    })

    const { getByTestId } = render({
      options: {
        nodeId: fixtures.MockInvoice.documentNumber.toString()
      }
    })

    expect(getByTestId('LoaderOverlay')).toBeInTheDocument()
  })
})

describe('#adjustValues', () => {
  beforeAll(() => MockDate.set('2020-06-11T00:00:00.000+00:00'))

  it('returns values with normalized date', () => {
    const actual = adjustValues({
      foo: 'bar',
      issueDate: new Date('2020-11-06T00:00:00.000Z')
    })

    const expected = { foo: 'bar', issueDate: '2020-11-06' }

    expect(actual).toEqual(expected)
  })
})
