import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { AutocompleteModels } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { MemoryRouter } from '@staff-portal/navigation'
import { titleize } from '@staff-portal/string'
import { createGetUserSearchAutocompleteMock } from '@staff-portal/facilities/src/mocks'

import UserSearch, {
  USER_SEARCH_AUTOCOMPLETE_RESULTS_SIZE
} from '../UserSearch'

const arrangeTest = ({ mocks }: { mocks: MockedResponse[] }) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <MemoryRouter>
        <UserSearch />
      </MemoryRouter>
    </TestWrapperWithMocks>
  )

describe('UserSearch', () => {
  it('should handle not found case', async () => {
    const SEARCH_TERM = 'non-user'

    arrangeTest({
      mocks: [
        createGetUserSearchAutocompleteMock({
          model: AutocompleteModels.QUICK_SEARCH,
          limit: USER_SEARCH_AUTOCOMPLETE_RESULTS_SIZE,
          term: SEARCH_TERM,
          edges: []
        })
      ]
    })

    fireEvent.change(screen.getByPlaceholderText('Go to user'), {
      target: { value: SEARCH_TERM }
    })

    expect(await screen.findByText('No results')).toBeInTheDocument()
  })

  it('should show search result with link', async () => {
    const SEARCH_TERM = 'John'
    const USER_NAME = 'John Adams'
    const USER_TYPE = 'top_level_company'
    const USER_SUB_TITLE = `${titleize(USER_TYPE)}`
    const USER_ID = 'VjEtUm9sZS0xMTU0Mzg5'
    const USER_URL = `test url`

    arrangeTest({
      mocks: [
        createGetUserSearchAutocompleteMock({
          term: SEARCH_TERM,
          model: AutocompleteModels.QUICK_SEARCH,
          limit: USER_SEARCH_AUTOCOMPLETE_RESULTS_SIZE,
          edges: [
            {
              key: '123',
              node: {
                id: USER_ID,
                webResource: {
                  url: USER_URL,
                  __typename: 'Link'
                },
                status: 'active',
                __typename: 'Client'
              },
              label: USER_NAME,
              labelHighlight: '{{strong}}John{{/strong}} Adams',
              nodeTypes: [USER_TYPE],
              photo: null,
              __typename: 'AutocompleteEdge'
            }
          ]
        })
      ]
    })

    fireEvent.change(screen.getByPlaceholderText('Go to user'), {
      target: { value: SEARCH_TERM }
    })

    const userNameElement = await screen.findByText((_, node) => {
      const hasText = (element: Element | null | undefined) =>
        element?.textContent === USER_NAME

      return (
        hasText(node) &&
        Array.from(node?.children || []).every(child => !hasText(child))
      )
    })

    expect(userNameElement).toBeInTheDocument()

    expect(
      screen.getByText((_, element) => {
        if (!element?.textContent) {
          return false
        }

        return (
          element?.textContent.includes(USER_NAME) &&
          element?.textContent.includes(USER_SUB_TITLE) &&
          element?.tagName === 'A'
        )
      })
    ).toHaveAttribute('href', USER_URL)
  })

  it('shows search results with link and company status', async () => {
    const SEARCH_TERM = 'John'
    const USER_NAME = 'John Adams'
    const USER_TYPE = 'company'
    const USER_SUB_TITLE = `${titleize(USER_TYPE)} - ${titleize('bad_lead')}`
    const USER_ID = 'VjEtUm9sZS0xMTU0Mzg5'
    const USER_URL = `test url`

    arrangeTest({
      mocks: [
        createGetUserSearchAutocompleteMock({
          term: SEARCH_TERM,
          model: AutocompleteModels.QUICK_SEARCH,
          limit: USER_SEARCH_AUTOCOMPLETE_RESULTS_SIZE,
          edges: [
            {
              key: '123',
              node: {
                id: USER_ID,
                webResource: {
                  url: USER_URL,
                  __typename: 'Link'
                },
                status: 'bad_lead',
                __typename: 'Client'
              },
              label: USER_NAME,
              labelHighlight: '{{strong}}John{{/strong}} Adams',
              nodeTypes: [USER_TYPE],
              photo: null,
              __typename: 'AutocompleteEdge'
            }
          ]
        })
      ]
    })

    fireEvent.change(screen.getByPlaceholderText('Go to user'), {
      target: { value: SEARCH_TERM }
    })

    const userNameElement = await screen.findByText((_, node) => {
      const hasText = (element: Element | null | undefined) =>
        element?.textContent === USER_NAME

      return (
        hasText(node) &&
        Array.from(node?.children || []).every(child => !hasText(child))
      )
    })

    expect(userNameElement).toBeInTheDocument()

    expect(
      screen.getByText((_, element) => {
        if (!element?.textContent) {
          return false
        }

        return (
          element?.textContent.includes(USER_NAME) &&
          element?.textContent.includes(USER_SUB_TITLE) &&
          element?.tagName === 'A'
        )
      })
    ).toHaveAttribute('href', USER_URL)
  })
})
