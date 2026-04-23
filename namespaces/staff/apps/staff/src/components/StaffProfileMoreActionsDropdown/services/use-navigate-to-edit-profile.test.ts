import { renderHook } from '@testing-library/react-hooks'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { useNavigate } from '@staff-portal/navigation'
import { getEditStaffProfilePath } from '@staff-portal/routes'

import useNavigateToEditProfile from './use-navigate-to-edit-profile'

jest.mock('@staff-portal/data-layer-service', () => ({
  decodeEntityId: jest.fn()
}))
jest.mock('@staff-portal/navigation', () => ({
  useNavigate: jest.fn()
}))
jest.mock('@staff-portal/routes', () => ({
  getEditStaffProfilePath: jest.fn()
}))

const mockDecodeEntityId = decodeEntityId as jest.Mock
const mockUseNavigate = useNavigate as jest.Mock
const mockGetEditStaffProfilePath = getEditStaffProfilePath as jest.Mock

describe('useNavigateToEditProfile', () => {
  it('executes all the required functions', () => {
    const staffId = {} as string
    const mockedNavigate = jest.fn()
    const id = {}
    const mockedGetEditStaffProfilePath = {}

    mockUseNavigate.mockReturnValueOnce(mockedNavigate)
    mockDecodeEntityId.mockReturnValueOnce({ id })
    mockGetEditStaffProfilePath.mockReturnValueOnce(
      mockedGetEditStaffProfilePath
    )

    const { result } = renderHook(() => useNavigateToEditProfile(staffId))

    result.current()

    expect(mockDecodeEntityId).toHaveBeenCalledTimes(1)
    expect(mockDecodeEntityId).toHaveBeenCalledWith(staffId)
    expect(mockGetEditStaffProfilePath).toHaveBeenCalledTimes(1)
    expect(mockGetEditStaffProfilePath).toHaveBeenCalledWith(id)
    expect(mockedNavigate).toHaveBeenCalledTimes(1)
    expect(mockedNavigate).toHaveBeenCalledWith(mockedGetEditStaffProfilePath)
  })
})
