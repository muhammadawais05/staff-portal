import { act, fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { TestWrapper } from '@staff-portal/test-utils'

import TooltipWrapper from './TooltipWrapper'
import TooltipContent from '../TooltipContent'

jest.mock('../TooltipContent', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('use-debounce', () => ({
  useDebouncedCallback: jest.fn()
}))

const mockUseFetchData = jest.fn()
const tooltipContentMock = jest.fn()
const TooltipContentComponentMock = TooltipContent as jest.Mock
const mockUseDebouncedCallback = useDebouncedCallback as jest.Mock

const mockFetchDataHookSuccessImplementation = () =>
  mockUseFetchData.mockReturnValue({
    data: [1, 2, 3]
  })

const mockFetchDataHookErrorImplementation = () =>
  mockUseFetchData.mockReturnValue({
    data: undefined,
    error: true
  })

const arrangeTest = ({
  useFetchData,
  ErrorComponent
}: Omit<ComponentProps<typeof TooltipWrapper>, 'tooltipContent'>) =>
  render(
    <TestWrapper>
      <TooltipWrapper
        useFetchData={useFetchData!}
        tooltipContent={tooltipContentMock}
        ErrorComponent={ErrorComponent}
      >
        <span data-testid='children' />
      </TooltipWrapper>
    </TestWrapper>
  )

describe('TooltipWrapper', () => {
  beforeEach(() => {
    TooltipContentComponentMock.mockClear()
    mockUseDebouncedCallback.mockClear()
    mockUseFetchData.mockClear()

    TooltipContentComponentMock.mockImplementation(() => null)
    mockUseDebouncedCallback.mockImplementation(
      (callback: (...args: unknown[]) => void) => {
        const debouncedCallback = (...args: unknown[]) => {
          callback(...args)
        }

        debouncedCallback.cancel = () => {}

        return debouncedCallback
      }
    )
  })

  describe('when custom data hook is used', () => {
    it('renders basis staff', () => {
      mockFetchDataHookSuccessImplementation()
      arrangeTest({
        useFetchData: mockUseFetchData
      })

      expect(screen.getByTestId('children')).toBeInTheDocument()

      expect(TooltipContentComponentMock).not.toHaveBeenCalled()
    })

    it('renders async tooltip', async () => {
      mockFetchDataHookSuccessImplementation()

      arrangeTest({
        useFetchData: mockUseFetchData
      })

      expect(screen.getByTestId('children')).toBeInTheDocument()

      await act(async () => {
        fireEvent.mouseOver(screen.getByTestId('children'))
      })

      expect(mockUseFetchData).toHaveBeenCalled()
      expect(TooltipContentComponentMock).toHaveBeenCalledWith(
        expect.objectContaining({
          data: [1, 2, 3],
          content: tooltipContentMock,
          error: undefined,
          ErrorComponent: undefined
        }),
        {}
      )
    })

    it('renders default error tooltip', async () => {
      mockFetchDataHookErrorImplementation()
      arrangeTest({
        useFetchData: mockUseFetchData
      })

      await act(async () => {
        fireEvent.mouseOver(screen.getByTestId('children'))
      })

      expect(mockUseFetchData).toHaveBeenCalled()
      expect(TooltipContentComponentMock).toHaveBeenCalledWith(
        expect.objectContaining({
          data: undefined,
          error: true,
          content: tooltipContentMock,
          ErrorComponent: undefined
        }),
        {}
      )
    })
  })
})
