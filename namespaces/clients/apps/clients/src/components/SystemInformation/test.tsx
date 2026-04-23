import React, { ComponentProps, useCallback } from 'react'
import { render, screen } from '@testing-library/react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { ROLE_FLAGS_UPDATED } from '@staff-portal/role-flags'

import SystemInformation from '.'
import { systemInformationDataMock } from './data/system-information-fragment.mock'

jest.mock('@staff-portal/data-layer-service')
jest.mock('./components/SystemInformationContent')
jest.mock('./components/SystemInformationSkeleton')
jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  useMessageListener: jest.fn()
}))
jest.mock('@staff-portal/clients', () => ({
  REFRESH_SYSTEM_INFORMATION: 'REFRESH_SYSTEM_INFORMATION'
}))
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof SystemInformation>) =>
  render(
    <TestWrapper>
      <SystemInformation {...props} />
    </TestWrapper>
  )

const mockUseGetCode = useGetNode as jest.Mock
const mockedUseMessageListener = useMessageListener as jest.Mock
const mockUseCallback = jest.fn()
const mockedUseCallback = useCallback as jest.Mock

describe('SystemInformation', () => {
  describe('when all necessary data to display a section is returned', () => {
    const refetch = Symbol('refetch')

    beforeEach(() => {
      mockUseGetCode.mockImplementation(() => () => ({
        data: systemInformationDataMock,
        loading: false,
        fetchMore: jest.fn(),
        initialLoading: false,
        refetch
      }))

      mockedUseCallback.mockReturnValueOnce(mockUseCallback)
      arrangeTest({ companyId: systemInformationDataMock.id })
    })

    it('renders a section', () => {
      expect(
        screen.getByTestId('SystemInformationContent-systemInformation')
      ).toHaveTextContent(JSON.stringify(systemInformationDataMock))
      expect(
        screen.queryByTestId('SystemInformationSkeleton')
      ).not.toBeInTheDocument()
      expect(mockedUseMessageListener).toHaveBeenCalledTimes(2)
      expect(mockedUseMessageListener).toHaveBeenNthCalledWith(
        1,
        'REFRESH_SYSTEM_INFORMATION',
        mockUseCallback
      )
      expect(mockedUseMessageListener).toHaveBeenNthCalledWith(
        2,
        ROLE_FLAGS_UPDATED,
        refetch
      )
    })
  })

  describe("when it's initially loading", () => {
    beforeEach(() => {
      mockUseGetCode.mockImplementation(() => () => ({
        data: undefined,
        loading: false,
        fetchMore: jest.fn(),
        initialLoading: true
      }))

      arrangeTest({ companyId: systemInformationDataMock.id })
    })

    it('displays skeleton', () => {
      expect(
        screen.queryByTestId('SystemInformationSkeleton')
      ).toBeInTheDocument()
    })
  })
})
