import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import DisputeModal from '.'
import adjustValues from './adjustValues'
import { useGetDisputeCommercialDocumentQuery } from './data'

jest.mock('@staff-portal/billing/src/store', () => ({
  useStore: () => ({
    state: {
      modal: { modalName: 'test' }
    }
  })
}))

jest.mock('./data')
jest.mock('../../components/DisputeForm')
jest.mock('@staff-portal/billing/src/_lib/form/handlers', () => ({
  handleOnSubmissionError: jest.fn(),
  handleSubmit: jest.fn(() => jest.fn())
}))
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)
jest.mock('./data', () => ({
  ...(jest.requireActual('./data') as object),
  useGetDisputeCommercialDocumentQuery: jest.fn(),
  useSetDisputeMutation: jest.fn(() => ['useSetDisputeMutation']),
  useSetUpdateDisputeMutation: jest.fn(() => ['useSetUpdateDisputeMutation'])
}))

const render = (props: ComponentProps<typeof DisputeModal>) =>
  renderComponent(<DisputeModal {...props} />)

const mockGetDisputeCommercialDocumentQuery =
  useGetDisputeCommercialDocumentQuery as jest.Mock

describe('DisputeModal', () => {
  describe('when data is loading', () => {
    beforeEach(() => {
      mockGetDisputeCommercialDocumentQuery.mockReturnValue({
        data: undefined,
        error: null,
        loading: true
      })
    })

    it('renders a loader', () => {
      const { container } = render({
        options: {
          nodeId: '123456',
          nodeType: 'invoice'
        }
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when data is loaded', () => {
    beforeEach(() => {
      mockGetDisputeCommercialDocumentQuery.mockReturnValue({
        data: {
          node: {
            documentNumber: 12345,
            id: 'doc12345',
            pendingTalentPayments: true
          }
        },
        loading: false,
        initialLoading: false
      })
    })

    it('renders modal with form', () => {
      const { container } = render({
        options: {
          nodeId: '123456',
          nodeType: 'invoice'
        }
      })

      expect(container).toMatchSnapshot()
    })
  })
})

describe('#adjustValues', () => {
  beforeAll(() => MockDate.set('2020-06-11T00:00:00.000+00:00'))

  it('returns values with normalized date', () => {
    const actual = adjustValues({
      foo: 'bar',
      actionDueOn: new Date('2020-11-06T00:00:00.000Z')
    })

    const expected = { foo: 'bar', actionDueOn: '2020-11-06' }

    expect(actual).toEqual(expected)
  })
})
