import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { JobListItemFragment } from '../JobListItem/data/job-list-item-fragment'
import ClientLinkField from './ClientLinkField'

// TODO avoid using non-mocked component https://toptal-core.atlassian.net/browse/SPB-2314
jest.mock('@toptal/picasso/TypographyOverflow', () =>
  jest.requireActual('@toptal/picasso/TypographyOverflow')
)

const arrangeTest = (client: JobListItemFragment['client']) =>
  render(
    <TestWrapper>
      <ClientLinkField client={client} />
    </TestWrapper>
  )

const CLIENT_URL = 'https://acme.com'
const CLIENT_NAME = 'ACME GmbH'

describe('ClientLinkField', () => {
  arrangeTest({
    id: '12234',
    enterprise: true,
    webResource: { text: CLIENT_NAME, url: CLIENT_URL }
  })

  it('renders link', () => {
    expect(screen.getByTestId('client-link')).toBeInTheDocument()
    expect(screen.getByTestId('client-link').getAttribute('href')).toEqual(
      CLIENT_URL
    )
    expect(screen.getByTestId('client-link')).toHaveTextContent(CLIENT_NAME)
  })

  describe('without url', () => {
    it('renders just the full name', () => {
      arrangeTest({
        id: '12234',
        enterprise: true,
        webResource: { text: CLIENT_NAME, url: null }
      })
      expect(screen.queryByTestId('client-link')).toBeNull()
      expect(screen.getByText(CLIENT_NAME)).toBeInTheDocument()
    })
  })
})
