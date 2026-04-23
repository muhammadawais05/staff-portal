import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { ApolloError } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import InternalTeamSection from '.'
import { useGetInternalTeam } from './data/get-internal-team-data.staff.gql'
import { internalTeamFragmentMock } from './data/internal-team-fragment.mock'

jest.mock('./data/get-internal-team-data.staff.gql')
jest.mock('@staff-portal/ui/src/components/Skeleton/TableSkeleton')
jest.mock('./components/InternalTeam')

const renderComponent = ({
  data,
  loading = false,
  error
}: {
  data?: object
  loading?: boolean
  error?: ApolloError | undefined
}) => {
  const mockedUseGetInternalTeam = useGetInternalTeam as jest.Mock

  mockedUseGetInternalTeam.mockReturnValue({
    data,
    loading,
    error
  })

  return render(
    <TestWrapper>
      <InternalTeamSection companyId='123' />
    </TestWrapper>
  )
}

describe('InternalTeamSection', () => {
  describe('when data is loaded', () => {
    it('renders internal team', () => {
      renderComponent({
        data: internalTeamFragmentMock
      })

      expect(screen.getByTestId('InternalTeam')).toBeInTheDocument()
      expect(
        screen.getByTestId('internal-team-section-title')
      ).toHaveTextContent('Internal Team')
    })
  })
})
