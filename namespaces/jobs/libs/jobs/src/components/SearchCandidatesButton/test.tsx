import React, { ComponentProps } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import SearchCandidatesButton from './SearchCandidatesButton'

const SEARCH_URL = 'searchUrl'
const APPLICANTS_URL = 'applicantsUrl'
const REJECTED_URL = 'rejectedUrl'

const arrangeTest = (props?: ComponentProps<typeof SearchCandidatesButton>) =>
  render(
    <TestWrapper>
      <SearchCandidatesButton {...props} />
    </TestWrapper>
  )

describe('SearchCandidatesButton', () => {
  it('does not render Search Candidates button', () => {
    arrangeTest()
    expect(
      screen.queryByTestId('search-candidates:link')
    ).not.toBeInTheDocument()
  })

  it('renders Search Candidates button', () => {
    arrangeTest({
      searchCandidatesUrl: SEARCH_URL
    })

    expect(screen.getByTestId('search-candidates:link')).toBeInTheDocument()
    expect(
      screen.getByTestId('search-candidates:link').getAttribute('href')
    ).toEqual(SEARCH_URL)
  })

  it('renders Search Candidates button with options', () => {
    arrangeTest({
      searchCandidatesUrl: SEARCH_URL,
      searchApplicantsUrl: APPLICANTS_URL,
      searchRejectedTalentsUrl: REJECTED_URL
    })

    fireEvent.click(screen.getByTestId('search-candidates:menu-button'))

    expect(
      screen.getByTestId('search-candidates:applicants-link')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('search-candidates:rejected-talents-link')
    ).toBeInTheDocument()
    expect(
      screen
        .getByTestId('search-candidates:applicants-link')
        .getAttribute('href')
    ).toEqual(APPLICANTS_URL)
    expect(
      screen
        .getByTestId('search-candidates:rejected-talents-link')
        .getAttribute('href')
    ).toEqual(REJECTED_URL)
  })
})
