import { useMemo } from 'react'
import {
  useLocation,
  useRouteMatch,
  RouteProps,
  queryStringToObject
} from '@staff-portal/navigation'
import { RoutePath } from '@staff-portal/routes'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { useGetMatchedJobId } from './use-get-matched-job-id'

jest.mock('react')
jest.mock('@staff-portal/routes', () => ({
  RoutePath: {
    Job: '/jobs/:id(\\d+)',
    Talents: '/talents'
  }
}))
jest.mock('@staff-portal/navigation', () => ({
  useLocation: jest.fn(),
  useRouteMatch: jest.fn(),
  queryStringToObject: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service', () => ({
  encodeEntityId: jest.fn()
}))

const useRouteMatchMock = useRouteMatch as jest.Mock
const useLocationMock = useLocation as jest.Mock
const useMemoMock = useMemo as jest.Mock
const encodeEntityIdMock = encodeEntityId as jest.Mock
const queryStringToObjectMock = queryStringToObject as jest.Mock

describe('useGetMatchedJobId', () => {
  beforeEach(() => {
    useMemoMock.mockImplementation(fn => fn())
    useLocationMock.mockReturnValue({})
  })

  it('should try to match any sub page of job profile and only the talent list', () => {
    useGetMatchedJobId()

    expect(useRouteMatchMock.mock.calls[0][0]).toBe(RoutePath.Job)
    expect(useRouteMatchMock.mock.calls[1][0]).toEqual({
      path: RoutePath.Talents,
      exact: true
    })
  })

  it('should call useMemo and return its value', () => {
    const search = 'search'
    const matchValue = 'matchValue'
    const returnValue = 'returnValue'

    useRouteMatchMock.mockReturnValue(matchValue)
    useLocationMock.mockReturnValue({ search })
    useMemoMock.mockReturnValue(returnValue)

    const result = useGetMatchedJobId()

    expect(useMemoMock).toHaveBeenCalledWith(expect.any(Function), [
      matchValue,
      matchValue,
      search
    ])
    expect(result).toBe(returnValue)
  })

  it('should return matched id of the job route', () => {
    const TEST_ID = 'TEST_ID'
    const ENCODED_ID = 'ENCODED_ID'

    useRouteMatchMock.mockImplementation((path: string | RouteProps) =>
      path === RoutePath.Job ? { params: { id: TEST_ID } } : null
    )
    encodeEntityIdMock.mockReturnValue(ENCODED_ID)

    const result = useGetMatchedJobId()

    expect(queryStringToObjectMock).not.toHaveBeenCalled()
    expect(encodeEntityIdMock).toHaveBeenCalledWith(TEST_ID, 'Job')
    expect(result).toBe(ENCODED_ID)
  })

  it('should return matched job id of the talent route if present in query params', () => {
    const TEST_ID = 'TEST_ID'
    const ENCODED_ID = 'ENCODED_ID'

    useRouteMatchMock.mockImplementation((path: string | RouteProps) =>
      typeof path === 'object' && path.path === RoutePath.Talents
        ? { params: {} }
        : null
    )
    useLocationMock.mockReturnValue({ search: TEST_ID })
    queryStringToObjectMock.mockReturnValue({ job_id: TEST_ID })
    encodeEntityIdMock.mockReturnValue(ENCODED_ID)

    const result = useGetMatchedJobId()

    expect(queryStringToObjectMock).toHaveBeenCalledWith(TEST_ID)
    expect(encodeEntityIdMock).toHaveBeenCalledWith(TEST_ID, 'Job')
    expect(result).toBe(ENCODED_ID)
  })

  it('should not match any job id of the talent route if not present in query params', () => {
    useRouteMatchMock.mockImplementation((path: string | RouteProps) =>
      typeof path === 'object' && path.path === RoutePath.Talents
        ? { params: {} }
        : null
    )
    queryStringToObjectMock.mockReturnValue({})

    const result = useGetMatchedJobId()

    expect(queryStringToObjectMock).toHaveBeenCalledWith(undefined)
    expect(encodeEntityIdMock).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })

  it('should not match any job id for unknown paths', () => {
    useRouteMatchMock.mockReturnValue(null)

    const result = useGetMatchedJobId()

    expect(queryStringToObjectMock).not.toHaveBeenCalled()
    expect(encodeEntityIdMock).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })
})
