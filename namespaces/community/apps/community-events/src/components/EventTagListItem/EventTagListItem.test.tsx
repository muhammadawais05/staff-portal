import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import EventTagListItem from './EventTagListItem'
import { useRemoveEventTag } from '../../data/remove-event-tag/remove-event-tag.staff.gql'
import { FAKE_EVENT_TAGS } from '../../mocks'
import { useUpdateEventTag } from '../../data/update-event-tag/update-event-tag.staff.gql'

jest.mock('../../data/update-event-tag/update-event-tag.staff.gql')
const useUpdateEventTagMock = useUpdateEventTag as jest.Mock

jest.mock('../../data/remove-event-tag/remove-event-tag.staff.gql')

const useRemoveEventTagMock = useRemoveEventTag as jest.Mock

describe('EventTagListItem', () => {
  const [pythonTag, financeTag] = FAKE_EVENT_TAGS

  beforeEach(() => {
    useRemoveEventTagMock.mockReturnValue([jest.fn()])
    useUpdateEventTagMock.mockReturnValue([jest.fn(), { loading: false }])
  })

  it('renders active item tag properly', () => {
    render(
      <TestWrapper>
        <EventTagListItem eventTag={pythonTag} />
      </TestWrapper>
    )

    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Disable' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument()
  })

  it('renders inactive item tag properly', () => {
    render(
      <TestWrapper>
        <EventTagListItem eventTag={financeTag} />
      </TestWrapper>
    )

    expect(screen.getByText('Finance')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Enable' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument()
  })
})
