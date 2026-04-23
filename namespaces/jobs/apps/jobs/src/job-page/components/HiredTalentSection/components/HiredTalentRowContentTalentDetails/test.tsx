import { render, screen } from '@testing-library/react'
import { when } from 'jest-when'
import React, { ComponentProps } from 'react'
import { useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import { createEngagementHiredTalentMock } from '../../data/get-hired-talent-content/mocks'
import { GetHiredTalentContentDocument } from '../../data'
import HiredTalentRowContentTalentDetails from './HiredTalentRowContentTalentDetails'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements')
jest.mock('@staff-portal/ui/src/components/ContainerLoader')
jest.mock('./components/HiredTalentDetailedList', () => ({
  __esModule: true,
  default: () => <div data-testid='HiredTalentDetailedList' />
}))

const mockUseQuery = useQuery as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof HiredTalentRowContentTalentDetails>
) =>
  render(
    <TestWrapper>
      <HiredTalentRowContentTalentDetails {...props} />
    </TestWrapper>
  )

describe('HiredTalentRowContentTalentDetails', () => {
  describe('when data provided', () => {
    it('default render', () => {
      const mock = createEngagementHiredTalentMock()

      when(mockUseQuery)
        .calledWith(GetHiredTalentContentDocument, expect.anything())
        .mockImplementation(() => ({
          data: { node: mock.node },
          loading: false
        }))

      arrangeTest({
        engagementId: '123'
      })

      expect(screen.getByTestId('ContainerLoader-loading')).toHaveTextContent(
        'false'
      )
      expect(screen.getByTestId('hired-talent-row-content')).toBeInTheDocument()
      expect(screen.getByTestId('HiredTalentDetailedList')).toBeInTheDocument()
    })

    describe('when no data provided', () => {
      it('displays nothing', () => {
        when(mockUseQuery)
          .calledWith(GetHiredTalentContentDocument, expect.anything())
          .mockImplementation(() => ({
            data: { node: null },
            loading: false
          }))

        arrangeTest({
          engagementId: '123'
        })

        expect(screen.getByTestId('ContainerLoader-loading')).toHaveTextContent(
          'false'
        )
        expect(
          screen.queryByTestId('hired-talent-row-content')
        ).not.toBeInTheDocument()
      })
    })

    describe('when data is loading', () => {
      it('displays nothing except loader', () => {
        when(mockUseQuery)
          .calledWith(GetHiredTalentContentDocument, expect.anything())
          .mockImplementation(() => ({
            data: undefined,
            loading: true
          }))

        arrangeTest({
          engagementId: '123'
        })

        expect(screen.getByTestId('ContainerLoader-loading')).toHaveTextContent(
          'true'
        )
        expect(
          screen.queryByTestId('hired-talent-row-content')
        ).not.toBeInTheDocument()
      })
    })

    describe('when the new resume page is enabled for client', () => {
      it('displays the view resume button', () => {
        const mock = createEngagementHiredTalentMock({
          engagement: {
            resumeUrl: 'http://new.resume.url'
          }
        })

        when(mockUseQuery)
          .calledWith(GetHiredTalentContentDocument, expect.anything())
          .mockImplementation(() => ({
            data: { node: mock.node },
            loading: false
          }))

        arrangeTest({
          engagementId: '123'
        })

        expect(screen.getByTestId('public-resume-button')).toBeInTheDocument()
      })
    })

    describe('when a new resume page url equals to a public profile url', () => {
      it('displays the public profile button', () => {
        const mock = createEngagementHiredTalentMock({
          engagement: { resumeUrl: 'www.resume.com' }
        })

        when(mockUseQuery)
          .calledWith(GetHiredTalentContentDocument, expect.anything())
          .mockImplementation(() => ({
            data: { node: mock.node },
            loading: false
          }))

        arrangeTest({
          engagementId: '123'
        })

        expect(screen.getByTestId('public-profile-button')).toBeInTheDocument()
      })
    })
  })
})
