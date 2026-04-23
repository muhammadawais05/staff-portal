import { renderHook } from '@testing-library/react-hooks'
import { RoleV2Scope } from '@staff-portal/graphql/staff'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { getStaffRolesHook } from './get-staff-roles-hook'

jest.mock('@staff-portal/data-layer-service')

const mockedUseLazyQuery = useLazyQuery as jest.Mock

describe('getStaffRolesHook', () => {
  it('returns proper data from the hook', async () => {
    const text = 'Label'
    const value = '123'

    mockedUseLazyQuery.mockImplementation(() => [
      jest.fn(),
      {
        data: {
          roles: {
            nodes: [
              {
                id: value,
                fullName: text
              }
            ]
          }
        }
      }
    ])

    const {
      result: { current: hook }
    } = renderHook(() => getStaffRolesHook(RoleV2Scope.ACCOUNT_OWNERS))

    await renderHook(async () => {
      const options = [{ text, value }]

      const result = hook()

      expect(result).toEqual(
        expect.objectContaining({
          data: options
        })
      )
    })
  })
})
