import React, { ComponentProps, useCallback } from 'react'
import { render, screen } from '@testing-library/react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import Investigations from '.'
import { investigationsDataMock } from './data/get-investigations.mock'

jest.mock('@staff-portal/data-layer-service')
jest.mock('./components/InvestigationsContent')
jest.mock('./components/InvestigationsSkeleton')
jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  useMessageListener: jest.fn()
}))
jest.mock('@staff-portal/clients', () => ({
  REFRESH_INVESTIGATIONS: 'REFRESH_INVESTIGATIONS',
  UPDATE_INVESTIGATION: 'UPDATE_INVESTIGATION'
}))
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof Investigations>) =>
  render(
    <TestWrapper>
      <Investigations {...props} />
    </TestWrapper>
  )

const mockUseGetCode = useGetNode as jest.Mock
const mockedUseMessageListener = useMessageListener as jest.Mock
const mockUseCallBack = jest.fn()
const mockedUseCallback = useCallback as jest.Mock

describe('Investigations', () => {
  describe('when all necessary data to display a section is returned', () => {
    beforeEach(() => {
      mockUseGetCode.mockImplementationOnce(() => () => ({
        data: investigationsDataMock,
        loading: false,
        fetchMore: jest.fn(),
        initialLoading: false
      }))
      mockedUseCallback.mockReturnValueOnce(mockUseCallBack)

      arrangeTest({
        companyId: investigationsDataMock.id
      })
    })

    it('renders a section', () => {
      expect(
        screen.getByTestId('InvestigationsContent-totalCount')
      ).toHaveTextContent(
        investigationsDataMock.investigations.totalCount.toString()
      )
      expect(
        screen.getByTestId('InvestigationsContent-operations')
      ).toHaveTextContent(JSON.stringify(investigationsDataMock.operations))
      expect(
        screen.getByTestId('InvestigationsContent-companyId')
      ).toHaveTextContent(investigationsDataMock.id)
      expect(
        screen.queryByTestId('InvestigationsSkeleton')
      ).not.toBeInTheDocument()
      expect(mockedUseMessageListener).toHaveBeenCalledTimes(1)
      expect(mockedUseMessageListener).toHaveBeenLastCalledWith(
        ['REFRESH_INVESTIGATIONS', 'UPDATE_INVESTIGATION'],
        mockUseCallBack
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

      arrangeTest({
        companyId: investigationsDataMock.id
      })
    })

    it('displays skeleton', () => {
      expect(screen.queryByTestId('InvestigationsSkeleton')).toBeInTheDocument()
    })
  })
})
