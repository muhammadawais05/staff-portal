import { renderHook } from '@testing-library/react-hooks'

import useGuidesAction from '../contexts/guides-context'
import useInitializePendoVisitor from './use-initialize-pendo-visitor'

jest.mock('../data/get-pendo-visitor', () => ({
  __esModule: true,
  useGetPendoVisitor: () => ({
    data: {
      me: {
        id: 'someId',
        teams: {
          nodes: [{
            name: 'team name #1'
          }, {
            name: 'team name #2'
          }]
        },
        createdAt: 'some date',
        fullName: 'Full Name',
        roleTitle: 'staff',
        jobTitle: 'Job Title',
        email: 'user@email.com'
      }
    }
  })
}))

jest.mock('../contexts/guides-context', () => jest.fn())

jest.mock('@staff-portal/config', () => ({
  ENVIRONMENT: 'test'
}))

const mockUseGuidesAction = useGuidesAction as jest.Mock

describe('useInitializePendoVisitor', () => {
  it('calls initialize eith visitor payload', () => {
    const initialize = jest.fn()

    mockUseGuidesAction.mockReturnValue({
      initialize
    })

    renderHook(() => useInitializePendoVisitor())

    expect(initialize).toHaveBeenCalledWith({
      visitor: {
        createdAt: 'some date',
        email: 'user@email.com',
        fullName: 'Full Name',
        id: 'staff-test-internal-someId',
        jobTitle: 'Job Title',
        roleTitle: 'staff',
        teams: 'team name #1, team name #2'
      }
    })
  })
})
