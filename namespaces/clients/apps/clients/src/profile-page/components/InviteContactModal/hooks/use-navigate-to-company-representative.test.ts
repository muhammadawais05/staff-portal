import { renderHook } from '@testing-library/react-hooks'
import { useNavigate } from '@staff-portal/navigation'
import { decodeId } from '@staff-portal/billing'

import useNavigateToCompanyRepresentative from './use-navigate-to-company-representative'

jest.mock('@staff-portal/navigation', () => ({
  useNavigate: jest.fn()
}))
jest.mock('@staff-portal/billing', () => ({
  decodeId: jest.fn()
}))

const mockedUseNavigate = useNavigate as jest.Mock
const mockedDecodeId = decodeId as jest.Mock

describe('useNavigateToCompanyRepresentative', () => {
  describe('when navigate to company representative', () => {
    it('executes all the functions respectively', () => {
      const navigateMock = jest.fn()
      const id = 'id'

      mockedDecodeId.mockReturnValueOnce(id)
      mockedUseNavigate.mockReturnValueOnce(navigateMock)
      const companyRepresentative = {
        id
      }

      const {
        result: { current }
      } = renderHook(() => useNavigateToCompanyRepresentative())

      current.navigateToCompanyRepresentative({
        companyRepresentative
      })

      expect(mockedDecodeId).toHaveBeenCalledTimes(1)
      expect(mockedDecodeId).toHaveBeenCalledWith({ id, type: 'companyRep' })
      expect(navigateMock).toHaveBeenCalledTimes(1)
      expect(navigateMock).toHaveBeenCalledWith(
        `/company_representatives/${id}`
      )
    })
  })
})
