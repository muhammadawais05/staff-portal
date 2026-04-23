import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ClientClaimerUpdateModal from '.'
import {
  useGetClientClaimerUpdateQuery,
  useSetUpdateClientClaimerMutation
} from '../../data'

jest.mock('../ClientClaimerUpdateModalForm')
jest.mock('../../data')

const render = (props: ComponentProps<typeof ClientClaimerUpdateModal>) =>
  renderComponent(<ClientClaimerUpdateModal {...props} />)

const mockUseSetUpdateClientClaimerMutation =
  useSetUpdateClientClaimerMutation as jest.Mock
const mockUseGetClientClaimerUpdateQuery =
  useGetClientClaimerUpdateQuery as jest.Mock

describe('ClientClaimerUpdateModal', () => {
  beforeAll(() => {
    mockUseSetUpdateClientClaimerMutation.mockReturnValue([jest.fn()])
    mockUseGetClientClaimerUpdateQuery.mockReturnValue({
      data: fixtures.MockGetClientClaimerUpdate
    })
  })

  it('passes required data to the form', () => {
    const { getByTestId } = render({
      options: { nodeId: '491023', nodeType: 'client' }
    })

    expect(getByTestId('ClientClaimerUpdateModalForm-title')).toHaveTextContent(
      'Change Claimer'
    )
    expect(getByTestId('ClientClaimerUpdateModalForm-roles')).toHaveTextContent(
      JSON.stringify(fixtures.MockGetClientClaimerUpdate.roles.nodes)
    )
  })
})
