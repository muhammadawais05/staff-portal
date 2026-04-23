import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobContactsField from './JobContactsField'
import { JobListItemFragment } from '../JobListItem/data'

// TODO avoid using non-mocked component https://toptal-core.atlassian.net/browse/SPB-2314
jest.mock('@toptal/picasso/TypographyOverflow', () =>
  jest.requireActual('@toptal/picasso/TypographyOverflow')
)

const arrangeTest = (
  contacts: NonNullable<JobListItemFragment['contacts']>['nodes']
) =>
  render(
    <TestWrapper>
      <JobContactsField contacts={contacts} />
    </TestWrapper>
  )

describe('JobContactsField', () => {
  describe('with one contact', () => {
    it('renders name with overflow', () => {
      arrangeTest([{ fullName: 'Dwight Schrute', id: 'fakeIdDs' }])

      expect(screen.getByTestId('job-contacts-field')).toBeInTheDocument()
      expect(screen.getByTestId('job-contacts-field')).toHaveTextContent(
        'Dwight Schrute'
      )
    })
  })

  describe('with some contacts', () => {
    it('renders names with overflow', () => {
      arrangeTest([
        { fullName: 'Dwight Schrute', id: 'fakeIdDs' },
        { fullName: 'Michael Scott', id: 'fakeIdMs' }
      ])

      expect(screen.getByTestId('job-contacts-field')).toBeInTheDocument()
      expect(screen.getByTestId('job-contacts-field')).toHaveTextContent(
        'Dwight Schrute, Michael Scott'
      )
    })
  })

  describe('without contacts', () => {
    it('renders a dash', () => {
      const { container, queryByTestId } = arrangeTest([])

      expect(queryByTestId('job-contacts-field')).not.toBeInTheDocument()
      expect(container).toHaveTextContent('—')
    })
  })
})
