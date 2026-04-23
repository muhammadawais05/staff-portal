import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ShowProjectionsModal from '.'
import { useGetProjectedCommissionsQuery } from '../../data/getProjectedCommissions.graphql.types'

jest.mock('../../data/getProjectedCommissions.graphql.types')

const MockUseGetProjectedCommissionsQuery =
  useGetProjectedCommissionsQuery as jest.Mock

const render = () => renderComponent(<ShowProjectionsModal />)

describe('ShowProjectionsModal', () => {
  it('default render', () => {
    MockUseGetProjectedCommissionsQuery.mockImplementation(() => {
      return {
        data: {
          viewer: {
            projectedCommissions: {
              rules: [
                { commission: '5%', description: 'Five percent' },
                { commission: '6%', description: 'Six percent' },
                { commission: '7%', description: 'Seven percent' }
              ],
              weekly: '20',
              monthly: '30',
              yearly: '40'
            }
          }
        }
      }
    })

    const { getByText, getByTestId } = render()

    expect(getByText('5%')).toBeInTheDocument()
    expect(getByText('6%')).toBeInTheDocument()
    expect(getByText('7%')).toBeInTheDocument()

    expect(getByText('Five percent')).toBeInTheDocument()
    expect(getByText('Six percent')).toBeInTheDocument()
    expect(getByText('Seven percent')).toBeInTheDocument()

    expect(getByTestId('weekly-projections')).toContainHTML('$20.00')
    expect(getByTestId('weekly-projections')).toContainHTML('*')

    expect(getByTestId('monthly-projections')).toContainHTML('$30.00')
    expect(getByTestId('monthly-projections')).toContainHTML('*')

    expect(getByTestId('yearly-projections')).toContainHTML('$40.00')
    expect(getByTestId('yearly-projections')).toContainHTML('*')
  })
})
