import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import AddModal from '.'
import adjustValues from './adjustValues'

jest.mock('../AddModalForm')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

jest.mock('../../../../engagement/data/getEngagement.graphql.types', () => ({
  useGetEngagementQuery: jest.fn(() => ({
    data: null,
    loading: false,
    initialLoading: false
  }))
}))

jest.mock('../../data/setCreateEngagementPlacementFee.graphql.types', () => ({
  useSetCreateEngagementPlacementFeeMutation: jest.fn(() => [
    'useSetCreateEngagementPlacementFeeMutation'
  ])
}))

const render = (props: ComponentProps<typeof AddModal>) =>
  renderComponent(<AddModal {...props} />)

describe('AddModal', () => {
  beforeEach(() => MockDate.set('2019/12/04'))

  afterEach(() => MockDate.reset())

  it('default render', () => {
    const { getByTestId } = render({
      options: {
        engagementId: fixtures.MockEngagement.id
      } as Required<ModalData>
    })

    expect(getByTestId('AddModalForm')).toBeInTheDocument()
  })

  describe.each([
    [
      {
        engagementId: 'abc123',
        installments: undefined,
        purchaseOrderId: undefined
      },
      { engagementId: 'abc123', installments: [] }
    ],

    [
      { engagementId: 'abc123', installments: [], purchaseOrderId: undefined },
      { engagementId: 'abc123', installments: [] }
    ],
    [
      {
        engagementId: 'abc124',
        installments: [{ amount: 400 }, { amount: 200 }],
        purchaseOrderId: undefined
      },
      {
        engagementId: 'abc124',
        installments: [{ amount: 400 }, { amount: 200 }]
      }
    ],
    [
      {
        engagementId: 'abc124',
        installments: [{ amount: 400 }, { amount: 200 }],
        purchaseOrderId: 'examplePOId',
        purchaseOrderLineId: 'examplePOLineId'
      },
      {
        engagementId: 'abc124',
        installments: [
          {
            amount: 400,
            purchaseOrderId: 'examplePOId',
            purchaseOrderLineId: 'examplePOLineId'
          },
          {
            amount: 200,
            purchaseOrderId: 'examplePOId',
            purchaseOrderLineId: 'examplePOLineId'
          }
        ]
      }
    ]
  ])('#adjustValues', (changes, payload) => {
    describe(`when value is ${JSON.stringify(changes)}`, () => {
      it('return the proper payload', () => {
        expect(adjustValues(changes)).toEqual(payload)
      })
    })
  })
})
