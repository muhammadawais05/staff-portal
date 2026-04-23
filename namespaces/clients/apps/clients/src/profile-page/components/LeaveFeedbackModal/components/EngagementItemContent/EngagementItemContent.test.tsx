import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import EngagementItemContent from './EngagementItemContent'

describe('EngagementItemContent', () => {
  describe('when called with expected props', () => {
    it('renders expected string', () => {
      const talentLinkMock = {
        url: 'https://some.link.com',
        text: 'Talent Name'
      }
      const jobLinkMock = { url: 'https://some.link.com', text: 'Job Name' }
      const verticalName = 'verticalName'

      render(
        <TestWrapper>
          <p data-testid='EngagementItemContent'>
            <EngagementItemContent
              jobLink={jobLinkMock}
              verticalName={verticalName}
              prependContent='Comments for'
              talentLink={talentLinkMock}
            />
          </p>
        </TestWrapper>
      )

      expect(screen.getByTestId('EngagementItemContent')).toHaveTextContent(
        'Comments for ' +
          jobLinkMock.text +
          ' with ' +
          verticalName.toLowerCase() +
          ' ' +
          talentLinkMock.text
      )
    })
  })
})
