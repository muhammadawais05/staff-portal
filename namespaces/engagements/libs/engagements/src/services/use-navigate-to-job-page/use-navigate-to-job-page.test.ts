import { renderHook, act } from '@testing-library/react-hooks'
import { useLocation } from '@staff-portal/navigation'

import { useNavigateToJobPage } from './use-navigate-to-job-page'

const mockNavigate = jest.fn()

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useNavigate: () => mockNavigate,
  useLocation: jest.fn()
}))

const mockUseLocation = useLocation as jest.Mock

describe('#useNavigateToJobPage', () => {
  describe('when there is jobId & current path is different than job page', () => {
    it('calls history push', async () => {
      mockUseLocation.mockReturnValue({ pathname: '/engagements/1' })
      const { result } = renderHook(() => useNavigateToJobPage())

      act(() => {
        result.current.navigateToJobPage('VjEtSm9iLTI0MDE0Mw')
      })

      expect(mockNavigate).toHaveBeenCalledTimes(1)
      expect(mockNavigate.mock.calls[0][0]).toBe('/jobs/240143')
    })

    describe('when there is jobId & current path is the same as destination job page', () => {
      it("doesn't call history push", async () => {
        mockUseLocation.mockReturnValue({ pathname: '/jobs/240143' })
        const { result } = renderHook(() => useNavigateToJobPage())

        act(() => {
          result.current.navigateToJobPage('VjEtSm9iLTI0MDE0Mw')
        })

        expect(mockNavigate).not.toHaveBeenCalled()
      })
    })

    describe('when there is no jobId', () => {
      it("doesn't call history push", async () => {
        mockUseLocation.mockReturnValue({ pathname: '/engagements/1' })
        const { result } = renderHook(() => useNavigateToJobPage())

        act(() => {
          result.current.navigateToJobPage()
        })

        expect(mockNavigate).not.toHaveBeenCalled()
      })
    })
  })
})
