import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import DisputeResolveModal from '.'
import { useGetDisputeResolveQuery } from '../../data'

jest.mock('../DisputeResolveModalForm')
jest.mock('../../data', () => ({
  ...jest.requireActual('../../data'),
  useSetResolveDisputeResolutionMutation: jest.fn(() => [
    'useSetResolveDisputeResolutionMutation'
  ]),
  useGetDisputeResolveQuery: jest.fn()
}))
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

const render = (props: ComponentProps<typeof DisputeResolveModal>) =>
  renderComponent(<DisputeResolveModal {...props} />)

const mockGetDisputeResolveQuery = useGetDisputeResolveQuery as jest.Mock

describe('DisputeResolveModal', () => {
  it('default render', () => {
    mockGetDisputeResolveQuery.mockReturnValue({
      data: {
        node: fixtures.MockInvoice
      },
      error: undefined,
      loading: false
    })

    const { container } = render({
      options: { nodeId: '123', nodeType: 'invoice' }
    })

    expect(container).toMatchSnapshot()
  })

  it('loading render', () => {
    mockGetDisputeResolveQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      loading: true
    })

    const { container } = render({
      options: { nodeId: '123', nodeType: 'invoice' }
    })

    expect(container).toMatchSnapshot()
  })
})
