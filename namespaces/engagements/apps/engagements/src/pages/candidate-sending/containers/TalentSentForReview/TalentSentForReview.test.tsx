import { useCopyRichTextToClipBoard } from '@staff-portal/clipboard'
import { useGetNode } from '@staff-portal/data-layer-service'
import { PitchSnippetItem } from '@staff-portal/engagements-candidate-sending'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'

import { TalentSentForReviewLoader } from '../../components'
import TalentSentForReview from './TalentSentForReview'

jest.mock('@staff-portal/clipboard')
jest.mock('../../components')
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements-candidate-sending')

const mockUseCopyRichTextToClipBoard = useCopyRichTextToClipBoard as jest.Mock
const mockUseGetNode = useGetNode as jest.Mock
const mockTalentSentForReviewLoader = TalentSentForReviewLoader as jest.Mock
const mockPitchSnippetItem = PitchSnippetItem as jest.Mock

const renderComponent = ({
  data,
  loading,
  copyRichTextToClipboard = () => {}
}: {
  data?: object
  loading?: boolean
  copyRichTextToClipboard?: () => void
} = {}) => {
  mockTalentSentForReviewLoader.mockImplementation(() => null)
  mockPitchSnippetItem.mockImplementation(() => null)
  mockUseGetNode.mockImplementation(() => () => ({ data, loading }))
  mockUseCopyRichTextToClipBoard.mockImplementation(() => ({
    copyRichTextToClipboard
  }))

  return render(
    <TestWrapper>
      <TalentSentForReview engagementId='123' talentType='developer' />
    </TestWrapper>
  )
}

describe('TalentSentForReview', () => {
  describe('when data is missing', () => {
    it('returns null', () => {
      renderComponent()

      expect(
        screen.queryByTestId('talent-sent-for-review')
      ).not.toBeInTheDocument()
    })
  })

  describe('when is loading', () => {
    it('shows the loading', () => {
      renderComponent({ loading: true })

      expect(
        screen.queryByTestId('talent-sent-for-review')
      ).not.toBeInTheDocument()

      expect(mockTalentSentForReviewLoader).toHaveBeenCalled()
    })
  })

  describe('when receive data', () => {
    it('shows the talent sent for review content', () => {
      renderComponent({ data: { talent: { id: '123' }, talentHourlyRate: 40 } })

      expect(screen.getByTestId('talent-sent-for-review')).toBeInTheDocument()
      expect(
        screen.getByTestId('talent-sent-for-review-header')
      ).toHaveTextContent(
        'A developer has been successfully sent for internal review!'
      )
      expect(
        screen.getByTestId('talent-sent-for-review-content')
      ).toHaveTextContent(
        'Here is a text snippet that you can share with internal reviewers:'
      )

      expect(mockPitchSnippetItem).toHaveBeenCalledWith(
        {
          hideAllocatedHours: true,
          hideRole: true,
          hourlyRate: 40,
          mode: 'default',
          size: 'small',
          talent: {
            id: '123'
          }
        },
        expect.anything()
      )
    })
  })

  describe('when clicking the copy snippet button', () => {
    it('triggers the copy to clipboard function', () => {
      const copyToClipboard = jest.fn()

      renderComponent({
        copyRichTextToClipboard: copyToClipboard,
        data: { talent: { id: '123' }, talentHourlyRate: 40 }
      })

      fireEvent.click(
        screen.getByTestId('talent-sent-for-review-copy-snippet-button')
      )

      expect(copyToClipboard).toHaveBeenCalledWith({
        target: expect.anything(),
        successMessage: 'Pitch snippet copied to clipboard.'
      })
    })
  })
})
