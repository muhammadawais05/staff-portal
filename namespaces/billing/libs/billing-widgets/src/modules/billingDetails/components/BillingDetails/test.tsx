import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import BillingDetails from './BillingDetails'
import { useGetClientBillingDetailsQuery } from '../../data/getClientBillingDetails.graphql.types'
import BillingDetailsContent from '../BillingDetailsContent'

jest.mock('../../data/getClientBillingDetails.graphql.types')
jest.mock('../BillingDetailsContent')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('@staff-portal/billing/src/utils/graphql')

const render = (props: ComponentProps<typeof BillingDetails>) =>
  renderComponent(
    <TestWrapper>
      <BillingDetails {...props} />
    </TestWrapper>
  )

const mockedRefetch = jest.fn()
const mockedUseQuery = useGetClientBillingDetailsQuery as jest.Mock

describe('BillingDetails', () => {
  it('renders content', () => {
    mockedUseQuery.mockReturnValueOnce({
      data: {
        node: fixtures.MockClient,
        viewer: { permits: { canManageBillingOptions: true } }
      },
      error: null,
      loading: false,
      refetch: mockedRefetch
    })

    render({
      companyId: 'VjEtQ29tcGFueS0xMjM0NQ'
    })

    expect(useRefetch).toHaveBeenCalledTimes(1)
    expect(useRefetch).toHaveBeenCalledWith(
      [
        { metaData: 'billingAddress:edit' },
        { metaData: 'billingDetails:billingOptionRemove' },
        { metaData: 'billingOption:update' },
        { metaData: 'billingDetails:jobCreateTemplate' },
        { metaData: 'billingDetails:jobDeleteTemplate' },
        { metaData: 'billingDetails:jobUpdateTemplate' },
        { metaData: 'billingDetails:reverifyCreditCardBillingOption' },
        { metaData: 'billingDetails:preferEnterpriseBillingOption' },
        { metaData: 'billingDetails:unsetPreferredBillingOption' },
        { metaData: 'billingDetails:wireVerification' }
      ],
      mockedRefetch
    )
    expect(BillingDetailsContent).toHaveBeenCalledWith(
      {
        client: fixtures.MockClient,
        viewer: { permits: { canManageBillingOptions: true } }
      },
      {}
    )
  })
})
