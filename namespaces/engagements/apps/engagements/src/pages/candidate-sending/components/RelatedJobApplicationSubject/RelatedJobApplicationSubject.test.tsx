import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@testing-library/react'
import { useGetCurrentUser } from '@staff-portal/current-user'

import { RelatedJobApplicationFragment } from '../../data/related-job-application-fragment'
import RelatedJobApplicationSubject from './RelatedJobApplicationSubject'

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useGetCurrentUser: jest.fn()
}))

const useGetCurrentUserMock = useGetCurrentUser as jest.Mock

const renderComponent = (
  relatedJobApplication: RelatedJobApplicationFragment,
  currentUser: { id: string } | null
) => {
  useGetCurrentUserMock.mockImplementation(() => currentUser)

  return render(
    <TestWrapper>
      <RelatedJobApplicationSubject
        relatedJobApplication={relatedJobApplication}
      />
    </TestWrapper>
  )
}

describe('RelatedJobApplicationSubject', () => {
  describe('when there is no `currentUser`', () => {
    it('renders nothing', () => {
      const { container } = renderComponent(
        {
          id: 'id'
        } as unknown as RelatedJobApplicationFragment,
        null
      )

      expect(container.innerHTML).toContain('')
    })
  })

  describe('when `peformer` is `currentUser`', () => {
    it('renders proper text', () => {
      const { container } = renderComponent(
        {
          performer: {
            __typename: 'Talent',
            id: '123',
            webResource: {
              text: 'Victorina McGlynn',
              url: 'https://staging.toptal.net/platform/staff/talents/123',
              __typename: 'Link'
            }
          }
        } as unknown as RelatedJobApplicationFragment,
        { id: '123' }
      )

      expect(container.innerHTML).toContain('You have')
    })
  })

  describe('when `peformer` is not `currentUser` & `webResource` exists', () => {
    it('renders proper text', () => {
      const { container } = renderComponent(
        {
          performer: {
            __typename: 'Talent',
            id: '123',
            webResource: {
              text: 'Victorina McGlynn',
              url: 'https://staging.toptal.net/platform/staff/talents/123',
              __typename: 'Link'
            }
          }
        } as unknown as RelatedJobApplicationFragment,
        { id: '456' }
      )

      expect(container.innerHTML).toContain('Victorina McGlynn')
    })
  })

  describe('when `peformer` is not `currentUser` & `webResource` does not exist', () => {
    it('renders proper text', () => {
      const { container } = renderComponent(
        {
          performer: {
            __typename: 'Talent',
            id: '123',
            webResource: null
          }
        } as unknown as RelatedJobApplicationFragment,
        { id: '456' }
      )

      expect(container.innerHTML).toContain('Someone')
    })
  })
})
