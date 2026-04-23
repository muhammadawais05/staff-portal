import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { useGetEngagement } from '../../../engagement/data'
import BillingCycleSettingsModal from '.'

jest.mock('../BillingCycleSettingsModalForm')
jest.mock('@staff-portal/billing/src/components/AlertModal')
jest.mock('@staff-portal/billing/src/_lib/helpers/operations', () => ({
  isCallableEnabled: jest.fn().mockReturnValueOnce(true).mockReturnValue(false)
}))

jest.mock('../../data/setChangeProductBillingFrequency.graphql.types', () => ({
  ...(jest.requireActual(
    '../../data/setChangeProductBillingFrequency.graphql.types'
  ) as object),
  useSetChangeProductBillingFrequencyMutation: jest.fn(() => [
    'useSetChangeProductBillingFrequencyMutation'
  ])
}))

jest.mock('../../../engagement/data')
jest.mock('../../../billingCycles/data')

const render = (props: ComponentProps<typeof BillingCycleSettingsModal>) =>
  renderComponent(<BillingCycleSettingsModal {...props} />)

describe('BillingCycleSettingsModal', () => {
  beforeEach(() => {
    MockDate.set('2020-01-01T12:00:00.000+00:00')
  })

  afterEach(() => MockDate.reset())

  describe.each`
    callable                           | messages
    ${OperationCallableTypes.ENABLED}  | ${[]}
    ${OperationCallableTypes.DISABLED} | ${['Reason for operation being disabled']}
    ${OperationCallableTypes.HIDDEN}   | ${[]}
  `('when operation is `$operation.callable`', ({ callable, messages }) => {
    it('renders appropriate modal content', () => {
      const mockedUseGetEngagement = useGetEngagement as jest.Mock

      mockedUseGetEngagement.mockReturnValue({
        data: {
          operations: {
            changeProductBillingFrequency: {
              callable,
              messages
            }
          }
        }
      })

      const { container } = render({
        options: { engagementId: '265521' }
      })

      expect(container).toMatchSnapshot()
    })
  })
})
