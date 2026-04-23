import { renderHook } from '@testing-library/react-hooks'

import { useBillingBaseProps } from './use-billing-base-props'

jest.mock('@staff-portal/config', () => ({
  PLATFORM_API_URL: 'examplePlatformUrl',
  KIPPER_API_URL: 'exampleKipperUrl',
  WEEK_STARTS_ON: 0
}))
jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: () => 'mockedCurrentUser'
}))

describe('#useBillingBaseProps', () => {
  it('returns proper items', () => {
    const { result } = renderHook(() => useBillingBaseProps())

    expect(result.current).toEqual({
      currentUser: 'mockedCurrentUser',
      endpoints: {
        Gateway: 'examplePlatformUrl',
        Kipper: 'exampleKipperUrl',
        Platform: 'examplePlatformUrl'
      },
      isPicassoRendered: false,
      shouldInitSentry: false,
      throwBoundaryErrorsToHostApp: true,
      weekStartsOn: 0
    })
  })
})
