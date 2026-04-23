import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'

import BasicBillingInfo from './BasicBillingInfo'
import { useGetClientBasicBillingInfoQuery } from '../../data'
import BasicBillingInfoContent from './components/BasicBillingInfoContent'
import { basicBillingInfoUpdateDataEvents } from '../../utils'
import Skeleton from './Skeleton'

jest.mock('../../data', () => ({
  useGetClientBasicBillingInfoQuery: jest.fn()
}))
jest.mock('./components/BasicBillingInfoContent', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch', () => ({
  useRefetch: jest.fn()
}))
jest.mock('@staff-portal/billing/src/components/ContentLoader', () => ({
  __esModule: true,
  default: jest.fn()
}))

const renderComponent = (props: ComponentProps<typeof BasicBillingInfo>) =>
  render(<BasicBillingInfo {...props} />)

const mockedUseGetClientBasicBillingInfoQuery =
  useGetClientBasicBillingInfoQuery as jest.Mock
const mockedBasicBillingInfoContent =
  BasicBillingInfoContent as unknown as jest.Mock
const mockedUseRefetch = useRefetch as jest.Mock
const mockedContentLoader = ContentLoader as unknown as jest.Mock

describe('BasicBillingInfo', () => {
  const loading = {}
  const initialLoading = {}
  const refetch = () => null
  const companyId = 'companyId'

  beforeEach(() => {
    mockedContentLoader.mockImplementation(({ children }) => <>{children}</>)
    mockedBasicBillingInfoContent.mockReturnValue(null)
  })

  afterEach(() => {
    mockedContentLoader.mockRestore()
    mockedUseRefetch.mockRestore()
    mockedUseGetClientBasicBillingInfoQuery.mockRestore()
  })

  it.each([
    {
      billingInfoData: { node: 'node', viewer: 'viewer' },
      expectedContent: expect.objectContaining({
        type: BasicBillingInfoContent,
        props: {
          client: 'node',
          viewer: 'viewer'
        }
      })
    },
    { billingInfoData: null, expectedContent: undefined }
  ])(
    'renders inner components with correct props passed',
    ({ billingInfoData, expectedContent }) => {
      mockedUseGetClientBasicBillingInfoQuery.mockReturnValue({
        data: billingInfoData,
        loading,
        initialLoading,
        refetch
      })
      renderComponent({
        companyId
      })

      expect(mockedUseGetClientBasicBillingInfoQuery).toHaveBeenCalledTimes(1)
      expect(mockedUseGetClientBasicBillingInfoQuery).toHaveBeenCalledWith({
        variables: { clientId: companyId }
      })
      expect(mockedUseRefetch).toHaveBeenCalledTimes(1)
      expect(mockedUseRefetch).toHaveBeenCalledWith(
        basicBillingInfoUpdateDataEvents,
        refetch
      )
      expect(mockedContentLoader).toHaveBeenCalledTimes(1)
      expect(mockedContentLoader).toHaveBeenCalledWith(
        {
          loading,
          showSkeleton: initialLoading,
          skeletonComponent: expect.objectContaining({
            type: Skeleton,
            props: {}
          }),
          children: expectedContent
        },
        {}
      )
    }
  )
})
