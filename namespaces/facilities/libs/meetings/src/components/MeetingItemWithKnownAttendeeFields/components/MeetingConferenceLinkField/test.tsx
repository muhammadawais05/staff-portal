import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import MeetingConferenceLinkField from './MeetingConferenceLinkField'
import { MeetingFragment } from '../../../../data/meeting-fragment'

const arrangeTest = (
  conferenceLink?: MeetingFragment['conferenceLink'],
  moderationUrl?: string | null
) =>
  render(
    <TestWrapper>
      <MeetingConferenceLinkField
        conferenceLink={conferenceLink}
        moderationUrl={moderationUrl}
      />
    </TestWrapper>
  )

describe('MeetingConferenceLinkField', () => {
  describe('when `conferenceLink` is not set', () => {
    it("doesn't render component", () => {
      const { container } = arrangeTest(null)

      expect(container.firstChild).toBeEmptyDOMElement()
    })
  })

  describe('when `conferenceLink.url` is not set', () => {
    it("doesn't render component", () => {
      const conferenceLink: MeetingFragment['conferenceLink'] = {
        text: 'http://bluejeans.test/19730933/7347'
      }

      const { container } = arrangeTest(conferenceLink)

      expect(container.firstChild).toBeEmptyDOMElement()
    })
  })

  describe('when `conferenceLink.url` is set', () => {
    const conferenceLink: MeetingFragment['conferenceLink'] = {
      url: 'https://topt.al/VgckNv',
      text: 'http://bluejeans.test/19730933/7347'
    }

    it('renders proper conference link', () => {
      arrangeTest(conferenceLink)

      const link = screen.getByTestId('conference-url')

      expect(link).toBeInTheDocument()
      expect(link.textContent).toBe(conferenceLink.text)
      expect(link).toHaveAttribute('href', conferenceLink.url)
      expect(link).toHaveAttribute('target', '_blank')
    })

    describe('when moderation url is not set', () => {
      it("doesn't render moderation url", () => {
        arrangeTest(conferenceLink)

        expect(
          screen.queryByTestId('join-as-moderator')
        ).not.toBeInTheDocument()
      })
    })

    describe('when moderation url is set', () => {
      it('renders moderation url', () => {
        const moderationUrl = 'test url'

        arrangeTest(conferenceLink, moderationUrl)

        const link = screen.getByTestId('join-as-moderator')

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', moderationUrl)
        expect(link).toHaveAttribute('target', '_blank')
      })
    })
  })
})
