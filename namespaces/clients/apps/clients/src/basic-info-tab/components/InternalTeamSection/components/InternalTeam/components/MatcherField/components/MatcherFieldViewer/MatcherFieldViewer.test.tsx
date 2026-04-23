import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import MatcherFieldViewer from './MatcherFieldViewer'

describe('MatcherFieldViewer', () => {
  describe('when client matcher is passed', () => {
    it('renders link', () => {
      const text = 'fullName'
      const url = 'https://some.cool/page'

      render(
        <TestWrapper>
          <MatcherFieldViewer
            value={{
              webResource: {
                text,
                url
              }
            }}
          />
        </TestWrapper>
      )

      expect(screen.getByTestId('MatcherFieldViewer-link')).toHaveTextContent(
        text
      )
      expect(screen.getByTestId('MatcherFieldViewer-link')).toHaveAttribute(
        'href',
        url
      )
    })
  })

  describe('when client matcher is undefined', () => {
    it('renders default message', () => {
      render(
        <TestWrapper>
          <MatcherFieldViewer value={undefined} />
        </TestWrapper>
      )

      expect(screen.getByTestId('MatcherFieldViewer')).toHaveTextContent(
        'Automatic'
      )
    })
  })
})
