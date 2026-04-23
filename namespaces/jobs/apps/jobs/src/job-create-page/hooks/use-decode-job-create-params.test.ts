import { renderHook } from '@testing-library/react-hooks'
import { queryStringToObject, useLocation } from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { getJobsPath } from '@staff-portal/routes'

import { useDecodeJobCreateParams } from './use-decode-job-create-params'

jest.mock('@staff-portal/navigation')
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/routes')

const useLocationMock = useLocation as jest.Mock
const queryStringToObjectMock = queryStringToObject as jest.Mock
const encodeEntityIdMock = encodeEntityId as jest.Mock
const getJobsPathMock = getJobsPath as jest.Mock

const arrangeTest = () => renderHook(() => useDecodeJobCreateParams())

describe('useDecodeJobCreateParams', () => {
  beforeEach(() => {
    useLocationMock.mockReturnValue({ search: '' })
    queryStringToObjectMock.mockReturnValue({})
  })

  it('calls `useLocation`', () => {
    arrangeTest()

    expect(useLocationMock).toHaveBeenCalled()
  })

  it('calls `queryStringToObject` with search string', () => {
    const search = 'search'

    useLocationMock.mockReturnValue({ search })
    arrangeTest()

    expect(queryStringToObjectMock).toHaveBeenCalledWith(search)
  })

  describe('when `company_id` params is present', () => {
    it('calls `encodeEntityId` with the right param', () => {
      const company_id = 'company_id'

      queryStringToObjectMock.mockReturnValue({ company_id })
      arrangeTest()

      expect(encodeEntityIdMock).toHaveBeenCalledWith(company_id, 'Role')
    })

    it('returns encoded `roleId`', () => {
      const roleId = 'roleId'

      queryStringToObjectMock.mockReturnValue({ company_id: 'test' })
      encodeEntityIdMock.mockReturnValue(roleId)

      expect(arrangeTest().result.current.roleId).toBe(roleId)
    })
  })

  describe('when `client_id` params is present', () => {
    it('calls `encodeEntityId` with the right param', () => {
      const client_id = 'client_id'

      queryStringToObjectMock.mockReturnValue({ client_id })
      arrangeTest()

      expect(encodeEntityIdMock).toHaveBeenCalledWith(client_id, 'Client')
    })

    it('returns encoded `clientId`', () => {
      const clientId = 'clientId'

      queryStringToObjectMock.mockReturnValue({ client_id: 'test' })
      encodeEntityIdMock.mockReturnValue(clientId)

      expect(arrangeTest().result.current.clientId).toBe(clientId)
    })
  })

  describe('when `opportunity_id` params is present', () => {
    it('calls `encodeEntityId` with the right param', () => {
      const opportunity_id = 'opportunity_id'

      queryStringToObjectMock.mockReturnValue({ opportunity_id })
      arrangeTest()

      expect(encodeEntityIdMock).toHaveBeenCalledWith(
        opportunity_id,
        'Opportunity'
      )
    })

    it('returns encoded `roleId`', () => {
      const opportunityId = 'opportunityId'

      queryStringToObjectMock.mockReturnValue({ opportunity_id: 'test' })
      encodeEntityIdMock.mockReturnValue(opportunityId)

      expect(arrangeTest().result.current.opportunityId).toBe(opportunityId)
    })
  })

  describe('when `cancel_path` params is present', () => {
    it('returns `cancelPath`', () => {
      const cancel_path = 'cancel_path'

      queryStringToObjectMock.mockReturnValue({ cancel_path })

      expect(arrangeTest().result.current.cancelPath).toBe(cancel_path)
    })
  })

  describe('when `cancel_path` params is not present', () => {
    it('returns `cancelPath` as job list path', () => {
      const cancelPath = '/jobs'

      queryStringToObjectMock.mockReturnValue({ cancel_path: undefined })
      getJobsPathMock.mockReturnValue(cancelPath)

      expect(arrangeTest().result.current.cancelPath).toBe(cancelPath)
      expect(getJobsPathMock).toHaveBeenCalled()
    })
  })
})
