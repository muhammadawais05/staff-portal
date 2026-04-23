import { render, screen } from '@testing-library/react'
import React, { ComponentProps } from 'react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import { createHiredTalentEngagementFragmentMock } from './data/get-hired-talent/mocks'
import HiredTalentSection from './HiredTalentSection'

jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  __esModule: true,
  useMessageListener: jest.fn()
}))

jest.mock('@staff-portal/data-layer-service')
jest.mock('./components/HiredTalentRow/HiredTalentRow', () => ({
  __esModule: true,
  default: () => (
    <tr data-testid='HiredTalentRow'>
      <td>cell</td>
    </tr>
  )
}))
jest.mock('@staff-portal/ui/src/components/ContainerLoader')

const mockUseGetCode = useGetNode as jest.Mock

const arrangeTest = (props: ComponentProps<typeof HiredTalentSection>) =>
  render(
    <TestWrapper>
      <HiredTalentSection {...props} />
    </TestWrapper>
  )

describe('HiredTalentSection', () => {
  describe('when data provided', () => {
    it('default render', () => {
      mockUseGetCode.mockImplementationOnce(() => () => ({
        data: {
          id: '1',
          engagements: {
            nodes: [createHiredTalentEngagementFragmentMock()]
          }
        },
        loading: false
      }))

      arrangeTest({
        jobId: '123'
      })

      expect(screen.getByTestId('ContainerLoader-loading')).toHaveTextContent(
        'false'
      )
      expect(screen.getByTestId('HiredTalentSection-table')).toBeInTheDocument()
      expect(screen.getByTestId('HiredTalentRow')).toBeInTheDocument()
    })
  })

  describe('when no data provided', () => {
    it('displays nothing', () => {
      mockUseGetCode.mockImplementationOnce(() => () => ({
        data: undefined,
        loading: false
      }))

      arrangeTest({
        jobId: '123'
      })

      expect(screen.getByTestId('ContainerLoader-loading')).toHaveTextContent(
        'false'
      )
      expect(
        screen.queryByTestId('HiredTalentSection-table')
      ).not.toBeInTheDocument()
      expect(screen.queryByTestId('HiredTalentRow')).not.toBeInTheDocument()
    })
  })

  describe('when data is loading', () => {
    it('displays nothing except loader', () => {
      mockUseGetCode.mockImplementationOnce(() => () => ({
        data: undefined,
        loading: true
      }))

      arrangeTest({
        jobId: '123'
      })

      expect(screen.getByTestId('ContainerLoader-loading')).toHaveTextContent(
        'true'
      )
      expect(
        screen.queryByTestId('HiredTalentSection-table')
      ).not.toBeInTheDocument()
      expect(screen.queryByTestId('HiredTalentRow')).not.toBeInTheDocument()
    })
  })

  describe('when engagement updated event is triggered', () => {
    describe('when containing the engagement ID', () => {
      it('calls the refetch function', () => {
        const refetch = jest.fn()
        const mockUseMessageListener = useMessageListener as jest.Mock

        mockUseMessageListener.mockImplementation(
          (_, callback: (props: { engagementId: string }) => void) => {
            callback({ engagementId: '1' })
          }
        )

        mockUseGetCode.mockImplementationOnce(() => () => ({
          data: {
            id: '1',
            engagements: {
              nodes: [createHiredTalentEngagementFragmentMock()]
            }
          },
          loading: false,
          refetch
        }))

        arrangeTest({
          jobId: '123'
        })

        expect(refetch).toHaveBeenCalled()
      })
    })
  })
})
