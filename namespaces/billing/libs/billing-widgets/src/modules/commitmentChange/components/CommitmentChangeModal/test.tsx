import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CommitmentChangeModal from '.'
import { useGetEngagement } from '../../../engagement/data'

const mockedHandleOnRootLevelError = jest.fn()
const mockedHandleOnSuccess = jest.fn()

jest.mock('../CommitmentChangeModalForm')
jest.mock('@staff-portal/billing/src/components/AlertModal')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: mockedHandleOnRootLevelError,
    handleOnSuccess: mockedHandleOnSuccess
  })
)

jest.mock('../../data/setChangeCommitment.graphql.types', () => ({
  ...(jest.requireActual(
    '../../data/setChangeCommitment.graphql.types'
  ) as object),
  useSetChangeCommitmentMutation: jest.fn(() => [
    'useSetChangeCommitmentMutation'
  ])
}))

jest.mock('@staff-portal/billing-widgets/src/modules/engagement/data')
jest.mock('@staff-portal/billing/src/data', () => ({
  useGetExperiments: jest.fn(() => ({}))
}))

const render = (props: ComponentProps<typeof CommitmentChangeModal>) =>
  renderComponent(<CommitmentChangeModal {...props} />)

describe('CommitmentChangeModal', () => {
  let spy: jest.SpyInstance

  beforeEach(() => {
    MockDate.set('2019-01-01T19:00:00.000+00:00')
  })

  afterEach(() => {
    MockDate.reset()
    spy?.mockRestore()
  })

  describe.each([
    [
      'operations',
      undefined,
      queryByTestId => {
        expect(queryByTestId('AlertModal')).toContainHTML(
          'This action is not available.'
        )
        expect(
          queryByTestId('CommitmentChangeModalForm')
        ).not.toBeInTheDocument()
      }
    ],
    [
      'operations',
      {
        callable: OperationCallableTypes.ENABLED,
        key: 'ENABLED',
        messages: ''
      },
      queryByTestId => {
        expect(queryByTestId('AlertModal')).not.toBeInTheDocument()
        expect(queryByTestId('CommitmentChangeModalForm')).toBeInTheDocument()
      }
    ],
    [
      'operations',
      { key: 'DISABLED', messages: ['Reason for operation being disabled'] },
      queryByTestId => {
        expect(queryByTestId('AlertModal')).toContainHTML(
          'Reason for operation being disabled'
        )
        expect(
          queryByTestId('CommitmentChangeModalForm')
        ).not.toBeInTheDocument()
      }
    ],
    [
      'operations',
      { key: 'HIDDEN', messages: '' },
      queryByTestId => {
        expect(queryByTestId('AlertModal')).toContainHTML(
          'This action is not available.'
        )
        expect(
          queryByTestId('CommitmentChangeModalForm')
        ).not.toBeInTheDocument()
      }
    ]
  ])('when operation is', (_, value, expect) => {
    it(`in case of ${JSON.stringify(
      value
    )} return the proper value`, async () => {
      const mockedUseGetEngagement = useGetEngagement as jest.Mock

      mockedUseGetEngagement.mockReturnValueOnce({
        data: {
          operations: {
            changeEngagementCommitment: value
          }
        }
      })

      const { queryByTestId } = render({
        options: { engagementId: '265521' }
      } as unknown as ComponentProps<typeof CommitmentChangeModal>)

      // eslint-disable-next-line
      expect(queryByTestId)
    })
  })
})
