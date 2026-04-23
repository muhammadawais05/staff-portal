import React, { ComponentProps } from 'react'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import Commission from '.'

jest.mock('../CommissionContent')
jest.mock('@staff-portal/billing/src/utils/graphql')

const render = (props: ComponentProps<typeof Commission>) =>
  renderComponent(<Commission {...props} />)

const data = fixtures.MockGetCommission

describe('Commission', () => {
  it('renders components properly', () => {
    ;(useGetNode as jest.Mock).mockReturnValue(() => ({
      error: null,
      loading: false,
      initialLoading: false,
      data
    }))
    const { getByTestId } = render({
      nodeId: 'VjEtQ29tcGFueS0xMjM0NQ'
    })

    expect(getByTestId('CommissionContent')).toBeInTheDocument()
    expect(getByTestId('CommissionContent-commissionData')).toHaveTextContent(
      JSON.stringify(data)
    )
  })
})
