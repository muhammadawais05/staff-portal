import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'

import EventTags from './EventTags'
import AddNewEventTag from '../../components/AddNewEventTag/AddNewEventTag'
import RemoveEventTagButton from '../../components/RemoveEventTagButton/RemoveEventTagButton'
import { useGetEventTags } from '../../data/get-event-tags/get-event-tags.staff.gql'
import { FAKE_EVENT_TAGS } from '../../mocks'
import UpdateEventTagButton from '../../components/UpdateEventTagButton/UpdateEventTagButton'
import ToggleEnabledEventTagButton from '../../components/ToggleEnabledEventTagButton/ToggleEnabledEventTagButton'

jest.mock('../../data/get-event-tags/get-event-tags.staff.gql')
jest.mock('../../components/AddNewEventTag/AddNewEventTag')
jest.mock('../../components/RemoveEventTagButton/RemoveEventTagButton')

jest.mock('../../components/UpdateEventTagButton/UpdateEventTagButton')
jest.mock(
  '../../components/ToggleEnabledEventTagButton/ToggleEnabledEventTagButton'
)
const useGetEventTagsMock = useGetEventTags as jest.Mock
const UpdateEventTagButtonMock = UpdateEventTagButton as jest.Mock
const AddNewEventTagMock = AddNewEventTag as jest.Mock
const RemoveEventTagButtonMock = RemoveEventTagButton as jest.Mock
const ToggleEnabledEventTagButtonMock = ToggleEnabledEventTagButton as jest.Mock

describe('EventTags', () => {
  beforeEach(() => {
    AddNewEventTagMock.mockReturnValue(<div />)
    RemoveEventTagButtonMock.mockReturnValue(<button>Remove</button>)
    UpdateEventTagButtonMock.mockReturnValue(<div />)
    ToggleEnabledEventTagButtonMock.mockReturnValue(<div />)
  })

  it('renders default', () => {
    useGetEventTagsMock.mockReturnValue({ loading: false, data: [] })

    render(
      <TestWrapper>
        <EventTags />
      </TestWrapper>
    )

    expect(screen.getByText(/Community Event Tags/)).toBeInTheDocument()
    expect(AddNewEventTagMock).toHaveBeenCalledTimes(1)
  })

  it('renders while fetching data', () => {
    useGetEventTagsMock.mockReturnValue({ loading: true, data: undefined })
    render(
      <TestWrapper>
        <EventTags />
      </TestWrapper>
    )

    expect(screen.getAllByTestId('event-tag-item-loader')).toHaveLength(3)
    expect(screen.queryByTestId('event-tag-list-item')).not.toBeInTheDocument()
  })

  it('renders after data is fetched', () => {
    useGetEventTagsMock.mockReturnValue({
      loading: false,
      data: FAKE_EVENT_TAGS
    })

    render(
      <TestWrapper>
        <EventTags />
      </TestWrapper>
    )

    expect(
      screen.queryByTestId('event-tag-item-loader')
    ).not.toBeInTheDocument()
    expect(screen.getAllByTestId('event-tag-list-item')).toHaveLength(3)
    expect(screen.getByText(/Python/)).toBeInTheDocument()
    expect(screen.getByText(/Finance/)).toBeInTheDocument()
  })
})
