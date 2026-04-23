import React from 'react'
import { screen, render } from '@testing-library/react'
import { Table } from '@toptal/picasso'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import Item from './Item'
import { createCandidateIntroDraftItem } from '../../../../data/get-candidate-intro-drafts/mocks'
import { CandidateIntroDraftItem } from '../../../../types'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements', () => ({
  EngagementCumulativeStatus: {}
}))
jest.mock('@staff-portal/engagements-interviews', () => ({
  EngagementStatus: {
    WithFeedback: () => <div data-testid='WithFeedback' />
  }
}))
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')
jest.mock('../../../../data')
jest.mock('./components', () => ({
  ...jest.requireActual('./components'),
  CandidateIntroDraftsMoreDropdown: () => (
    <div data-testid='MoreButton-dropdown' />
  ),
  EngagementPitchLink: () => <div data-testid='EngagementPitchLink' />
}))

const useMutationMock = useMutation as jest.Mock
const useHandleMutationResultMock = useHandleMutationResult as jest.Mock

const arrangeTest = (candidate: Partial<CandidateIntroDraftItem> = {}) => {
  render(
    <TestWrapper>
      <Table>
        <Table.Body>
          <Item
            candidate={createCandidateIntroDraftItem(candidate)}
            index={0}
          />
        </Table.Body>
      </Table>
    </TestWrapper>
  )
}

describe('Item', () => {
  beforeEach(() => {
    useMutationMock.mockReturnValue([jest.fn()])
    useHandleMutationResultMock.mockReturnValue({
      handleMutationResult: jest.fn()
    })
  })

  describe('Displaying', () => {
    describe('when talent exists', () => {
      it('renders the row', () => {
        arrangeTest()
        expect(
          screen.queryByTestId('CandidateIntroDraftsTable-row')
        ).toBeInTheDocument()
      })
    })

    describe('when talent is missing', () => {
      it("doesn't render the row", () => {
        arrangeTest({
          talent: undefined
        })
        expect(
          screen.queryByTestId('CandidateIntroDraftsTable-row')
        ).not.toBeInTheDocument()
      })
    })

    it('shows talent name', () => {
      arrangeTest()
      expect(screen.queryByTestId('talent')).toBeInTheDocument()
    })

    it('shows hourly rate', () => {
      arrangeTest()
      const rates = screen.queryAllByTestId('hourly-rate')

      expect(rates[0]).toBeInTheDocument()
      expect(rates).toHaveLength(2)
    })

    it('shows status', () => {
      arrangeTest()
      expect(screen.queryByTestId('WithFeedback')).toBeInTheDocument()
    })

    it('shows view engagement pitch button', () => {
      arrangeTest()
      expect(screen.queryByTestId('EngagementPitchLink')).toBeInTheDocument()
    })

    it('shows view engagement dropdown button', () => {
      arrangeTest()
      expect(screen.queryByTestId('MoreButton-dropdown')).toBeInTheDocument()
    })
  })
})
