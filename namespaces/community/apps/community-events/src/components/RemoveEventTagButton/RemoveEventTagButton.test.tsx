import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { FAKE_EVENT_TAGS } from '../../mocks'
import { useRemoveEventTag } from '../../data/remove-event-tag/remove-event-tag.staff.gql'
import RemoveEventTagButton from './RemoveEventTagButton'

jest.mock('../../data/remove-event-tag/remove-event-tag.staff.gql')

const useRemoveEventTagMock = useRemoveEventTag as jest.Mock

describe('RemoveEventTagButton', () => {
  const [pythonTag] = FAKE_EVENT_TAGS

  beforeEach(() => {
    useRemoveEventTagMock.mockReturnValue([
      jest.fn(() =>
        Promise.resolve({
          data: { removeCommunityEventTag: { success: true } }
        })
      )
    ])
  })

  it('renders default button', () => {
    render(
      <TestWrapper>
        <RemoveEventTagButton eventTag={pythonTag} />
      </TestWrapper>
    )

    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument()
  })

  it('renders custom remove button', () => {
    render(
      <TestWrapper>
        <RemoveEventTagButton eventTag={pythonTag}>
          Remove Event Tag
        </RemoveEventTagButton>
      </TestWrapper>
    )

    expect(
      screen.getByRole('button', { name: 'Remove Event Tag' })
    ).toBeInTheDocument()
  })

  it('opens modal when clicking in the button', () => {
    render(
      <TestWrapper>
        <RemoveEventTagButton eventTag={pythonTag} />
      </TestWrapper>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Remove' }))

    expect(
      screen.getByText(
        `Are you sure you want to remove event tag ${pythonTag.title}?`
      )
    ).toBeInTheDocument()
  })

  it('no button in document if operation forbid it', () => {
    const tag = {
      ...pythonTag,
      operations: {
        updateCommunityEventTag: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        },
        removeCommunityEventTag: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      }
    }

    render(
      <TestWrapper>
        <RemoveEventTagButton eventTag={tag} />
      </TestWrapper>
    )

    expect(
      screen.queryByRole('button', { name: 'Remove' })
    ).not.toBeInTheDocument()
  })

  it('calls mutation after confirming removal', async () => {
    const removeMutation = jest.fn(() =>
      Promise.resolve({ data: { removeCommunityEventTag: { success: true } } })
    )

    useRemoveEventTagMock.mockReturnValue([removeMutation])

    render(
      <TestWrapper>
        <RemoveEventTagButton eventTag={pythonTag} />
      </TestWrapper>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Remove' }))

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
    })

    expect(removeMutation).toHaveBeenCalledTimes(1)
    expect(removeMutation).toHaveBeenCalledWith({
      variables: { input: { id: pythonTag.id } }
    })
  })
})
