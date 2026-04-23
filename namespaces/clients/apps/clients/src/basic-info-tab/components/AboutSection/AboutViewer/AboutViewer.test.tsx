import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { Tooltip } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import AboutViewer, { BSS_TITLE, CLIENTOPEDIA_TITLE } from './AboutViewer'

jest.mock('@toptal/picasso/Tooltip')
const TooltipMock = Tooltip as unknown as jest.Mock

const renderComponent = (props: ComponentProps<typeof AboutViewer>) =>
  render(
    <TestWrapper>
      <AboutViewer {...props} />
    </TestWrapper>
  )

describe('AboutViewer', () => {
  beforeEach(() => {
    TooltipMock.mockImplementation(({ children }) => (
      <div data-testid='tooltip'>{children}</div>
    ))
  })

  describe('when bssAbout passed', () => {
    it('renders bssAbout text and tooltip', () => {
      const bssAboutText = 'bss-text'

      renderComponent({
        internalAbout: '',
        bssAbout: bssAboutText,
        clientopediaDescription: ''
      })

      expect(screen.getByText(BSS_TITLE)).toBeInTheDocument()
      expect(screen.getByTestId('AboutViewer-bss-text').textContent).toBe(
        bssAboutText
      )
    })
  })

  describe('when clientopediaDescription passed', () => {
    it('renders clientopediaDescription text and tooltip', () => {
      const clientopediaText = 'clientopedia-description'

      renderComponent({
        internalAbout: '',
        bssAbout: '',
        clientopediaDescription: clientopediaText
      })

      expect(screen.getByText(CLIENTOPEDIA_TITLE)).toBeInTheDocument()
      expect(
        screen.getByTestId('AboutViewer-clientopedia-text').textContent
      ).toBe(clientopediaText)
    })
  })
})
