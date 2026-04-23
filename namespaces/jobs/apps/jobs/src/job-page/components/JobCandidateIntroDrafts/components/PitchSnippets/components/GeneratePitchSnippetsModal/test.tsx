import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetNodes } from '@staff-portal/data-layer-service'
import { useCopyRichTextToClipBoard } from '@staff-portal/clipboard'
import { EngagementPitchSnippetFragment } from '@staff-portal/engagements-candidate-sending'
import { createEngagementPitchSnippet } from '@staff-portal/engagements-candidate-sending/src/mocks'

import GeneratePitchSnippetsModal from './GeneratePitchSnippetsModal'

jest.mock('@staff-portal/clipboard', () => ({
  ...jest.requireActual('@staff-portal/clipboard'),
  useCopyRichTextToClipBoard: jest.fn()
}))
jest.mock('@staff-portal/engagements-candidate-sending', () => ({
  PitchSnippetItem: () => <div data-testid='pitch-snippet-item' />
}))

jest.mock('@staff-portal/data-layer-service')

const useCopyRichTextToClipBoardMock = useCopyRichTextToClipBoard as jest.Mock

const hideModal = jest.fn()
const copyRichTextToClipboard = jest.fn()
const arrangeTest = (engagements?: EngagementPitchSnippetFragment[]) => {
  const useGetNodesMock = useGetNodes as jest.Mock

  useGetNodesMock.mockImplementation(() => () => ({
    data: engagements,
    loading: false
  }))

  render(
    <TestWrapper>
      <GeneratePitchSnippetsModal engagementIds={[]} hideModal={hideModal} />
    </TestWrapper>
  )
}

describe('GeneratePitchSnippetsModal', () => {
  beforeEach(() => {
    useCopyRichTextToClipBoardMock.mockImplementation(() => ({
      copyRichTextToClipboard
    }))
  })

  describe('Content display', () => {
    describe('when engagements are not set', () => {
      beforeEach(() => {
        arrangeTest()
      })

      it('does not display modal content', () => {
        expect(
          screen.queryByTestId('GeneratePitchSnippetsModal')
        ).not.toBeInTheDocument()
      })
    })

    describe('when engagements are empty', () => {
      beforeEach(() => {
        arrangeTest([])
      })

      it('does not display modal content', () => {
        expect(
          screen.queryByTestId('GeneratePitchSnippetsModal')
        ).not.toBeInTheDocument()
      })
    })

    describe('when engagements are available', () => {
      describe('when a single engagement is displayed', () => {
        beforeEach(() => {
          arrangeTest([createEngagementPitchSnippet()])
        })

        it('displays modal content', () => {
          expect(
            screen.queryByTestId('GeneratePitchSnippetsModal')
          ).toBeInTheDocument()
        })

        it('displays engagement item', () => {
          expect(screen.queryByTestId('pitch-snippet-item')).toBeInTheDocument()
        })

        it('displays correct modal title', () => {
          expect(
            screen.queryByText('Generate Pitch Snippet')
          ).toBeInTheDocument()
        })
      })

      describe('when multiple engagements are displayed', () => {
        beforeEach(() => {
          arrangeTest([
            createEngagementPitchSnippet({ id: '1' }),
            createEngagementPitchSnippet({ id: '2' })
          ])
        })

        it('displays correct modal title', () => {
          expect(
            screen.queryByText('Generate Pitches Snippet')
          ).toBeInTheDocument()
        })
      })
    })
  })

  describe('When click on `Copy and Close` button', () => {
    beforeEach(async () => {
      arrangeTest([createEngagementPitchSnippet()])

      fireEvent.click(
        await screen.findByTestId('GeneratePitchSnippetsModal-submit-button')
      )
    })

    it('should copy snippets to the clipboard', async () => {
      expect(copyRichTextToClipboard).toHaveBeenCalledWith(
        expect.objectContaining({
          successMessage: 'Pitch snippet copied to clipboard.'
        })
      )
    })

    it('should hide modal', async () => {
      expect(hideModal).toHaveBeenCalledTimes(1)
    })
  })

  describe('When click on `Cancel` button', () => {
    beforeEach(async () => {
      arrangeTest([createEngagementPitchSnippet()])

      fireEvent.click(
        await screen.findByTestId('GeneratePitchSnippetsModal-cancel-button')
      )
    })

    it('should not copy snippets to the clipboard', async () => {
      expect(copyRichTextToClipboard).toHaveBeenCalledTimes(0)
    })

    it('should hide modal', async () => {
      expect(hideModal).toHaveBeenCalledTimes(1)
    })
  })
})
