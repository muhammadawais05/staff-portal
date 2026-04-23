import { renderHook } from '@testing-library/react-hooks'
import { ApolloError } from '@staff-portal/data-layer-service'

import usePrevious from './use-previous'
import useGetQueryErrors from './use-get-query-errors'

const mockShowError = jest.fn((message: string) => message)
const mockUsePrevious = usePrevious as jest.Mock

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({ showError: mockShowError })
}))

jest.mock('./use-previous', () => ({
  __esModule: true,
  default: jest.fn()
}))

let isToggled: boolean

const arrangeTest = () => {
  const apolloError = { message: 'basic error' } as ApolloError

  const setIsToggled = (value: boolean) => {
    isToggled = value
  }

  const { rerender } = renderHook<{ error: ApolloError | undefined }, unknown>(
    ({ error }) =>
      useGetQueryErrors([error], {
        isToggled,
        setIsToggled: (state: boolean) => (isToggled = state)
      }),
    { initialProps: { error: undefined } }
  )

  return { error: apolloError, rerender, setIsToggled }
}

describe('#useGetQueryErrors', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    isToggled = false
  })

  describe('when there are no errors passed', () => {
    it('does not show error', () => {
      const { rerender, setIsToggled } = arrangeTest()

      setIsToggled(true)
      rerender({ error: undefined })

      expect(isToggled).toBe(true)
      expect(mockShowError).not.toHaveBeenCalled()
    })
  })

  describe('when there are no previous errors and there is a current error', () => {
    it('shows error', () => {
      const { error, rerender, setIsToggled } = arrangeTest()

      mockUsePrevious.mockReturnValue(undefined)

      setIsToggled(true)
      rerender({ error })

      expect(isToggled).toBe(false)
      expect(mockShowError).toHaveBeenCalledWith(error.message)
    })
  })

  describe('when there are previous errors and there is no current error', () => {
    it('does not show error', () => {
      const { error, rerender, setIsToggled } = arrangeTest()

      mockUsePrevious.mockReturnValue({})

      setIsToggled(true)
      rerender({ error })

      expect(isToggled).toBe(true)
      expect(mockShowError).toHaveBeenCalledTimes(0)
    })
  })

  describe('when editable field is in view mode', () => {
    it('does not show error', () => {
      const { error, rerender, setIsToggled } = arrangeTest()

      setIsToggled(false)
      rerender({ error })

      expect(isToggled).toBe(false)
      expect(mockShowError).toHaveBeenCalledTimes(0)
    })
  })

  describe('when error occurs while trying toggle edit mode', () => {
    it.each([
      {
        title: 'default error',
        error: {} as ApolloError,
        expected: 'Fetch failed for editable field'
      },
      {
        title: 'basic error',
        error: { message: 'basic error' } as ApolloError,
        expected: 'basic error'
      }
    ])('shows error for $title', ({ error, expected }) => {
      const { rerender, setIsToggled } = arrangeTest()

      setIsToggled(true)
      rerender({ error })

      expect(isToggled).toBe(false)
      expect(mockShowError).toHaveBeenCalledWith(expected)
    })
  })
})
