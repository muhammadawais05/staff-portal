import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { TestWrapper } from '@staff-portal/test-utils'
import { ContainerLoader } from '@staff-portal/ui'
import { CLIENT_UPDATED } from '@staff-portal/clients'
import { AddRoleFlagButton } from '@staff-portal/role-flags'
import { OFAC_UPDATED } from '@staff-portal/ofac-compliance'

import AccountOverviewSection from '.'
import { useGetCompanyOverview } from './data'
import { AccountOverview, Skeleton, SectionContainer } from './components'
import { companyOverviewFragmentMock } from './data/company-overview-fragment.mock'

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  ContainerLoader: jest.fn()
}))

jest.mock('./data/get-company-overview-data.staff.gql')
jest.mock('./components', () => ({
  AccountOverview: () => null,
  SectionContainer: () => null,
  Skeleton: () => null
}))
jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  useMessageListener: jest.fn()
}))

const ContainerLoaderMock = ContainerLoader as jest.Mock

const mockedUseMessageListener = useMessageListener as jest.Mock
const mockedUseGetCompanyOverview = useGetCompanyOverview as jest.Mock

const renderComponent = () => {
  return render(
    <TestWrapper>
      <AccountOverviewSection companyId={companyOverviewFragmentMock.id} />
    </TestWrapper>
  )
}

describe('AccountOverviewSection', () => {
  beforeEach(() => {
    ContainerLoaderMock.mockImplementation(({ children }) => <>{children}</>)

    mockedUseGetCompanyOverview.mockReturnValue({
      loading: 'loading',
      initialLoading: 'initial-loading',
      error: 'error',
      company: companyOverviewFragmentMock
    })
  })

  it('renders inner components with correct props passed', () => {
    renderComponent()

    expect(mockedUseGetCompanyOverview).toHaveBeenCalledTimes(1)
    expect(mockedUseGetCompanyOverview).toHaveBeenCalledWith(
      companyOverviewFragmentMock.id
    )

    expect(mockedUseMessageListener).toHaveBeenCalledTimes(2)
    expect(mockedUseMessageListener).toHaveBeenNthCalledWith(
      1,
      CLIENT_UPDATED,
      expect.any(Function)
    )
    expect(mockedUseMessageListener).toHaveBeenNthCalledWith(
      2,
      OFAC_UPDATED,
      expect.any(Function)
    )

    expect(ContainerLoaderMock).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: 'loading',
        showSkeleton: 'initial-loading',
        skeletonComponent: expect.objectContaining({
          type: Skeleton
        }),
        children: expect.objectContaining({
          type: SectionContainer,
          props: expect.objectContaining({
            actions: expect.objectContaining({
              type: AddRoleFlagButton,
              props: {
                roleId: companyOverviewFragmentMock.id,
                fullName: companyOverviewFragmentMock.fullName,
                operation:
                  companyOverviewFragmentMock.operations.addClientRoleFlag
              }
            }),
            children: expect.objectContaining({
              type: AccountOverview,
              props: {
                company: companyOverviewFragmentMock,
                error: 'error'
              }
            })
          })
        })
      }),
      {}
    )
  })
})
