import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Notes } from '@staff-portal/notes'

import AddNoteButton from '../AddNoteButton'
import { useGetCommunityLeaderNotes } from '../../data/get-community-leader-notes/get-community-leader-notes.staff.gql'
import CommunityLeaderNotesTab from './CommunityLeaderNotesTab'
import { CommunityLeaderData } from '../../types'

jest.mock(
  '../../data/get-community-leader-notes/get-community-leader-notes.staff.gql'
)
jest.mock('@staff-portal/notes', () => ({
  ...jest.requireActual('@staff-portal/notes'),
  Notes: jest.fn()
}))
jest.mock('../AddNoteButton')

const useGetCommunityLeaderNotesMock = useGetCommunityLeaderNotes as jest.Mock
const NotesMock = Notes as jest.Mock
const AddNoteButtonMock = AddNoteButton as jest.Mock

const FAKE_COMMUNITY_LEADER: CommunityLeaderData = {
  id: '123456789',
  appliedStaffRole: {
    id: '123465789',
    fullName: 'Alex Casillas',
    email: 'alex.casillas@toptal.com',
    photo: {
      default: ''
    },
    webResource: {
      text: 'Staff Name',
      url: null
    },
    roleFlags: {
      nodes: [
        {
          flag: {
            id: '1',
            title: 'High Quality Headshot'
          }
        },
        {
          flag: {
            id: '2',
            title: 'Community Leader'
          }
        },
        {
          flag: {
            id: '3',
            title: 'Milestone box survey sent'
          }
        }
      ]
    }
  }
}

describe('CommunityLeaderNotesTab', () => {
  beforeEach(() => {
    NotesMock.mockImplementation(() => <div />)
    AddNoteButtonMock.mockImplementation(() => <button>Add Notes</button>)
  })

  it('renders Notes component with notes descending sorted', () => {
    useGetCommunityLeaderNotesMock.mockReturnValue({
      loading: false,
      data: {
        leaderNotes: {
          nodes: [
            {
              id: 'note-1',
              createdAt: '2019-01-04T22:23:26+03:00'
            },
            {
              id: 'note-2',
              createdAt: '2018-11-27T19:35:50+03:00'
            },
            {
              id: 'note-3',
              createdAt: '2020-01-30T14:16:29+03:00'
            }
          ]
        }
      }
    })

    render(
      <TestWrapper>
        <CommunityLeaderNotesTab
          communityLeaderId='1'
          communityLeader={FAKE_COMMUNITY_LEADER}
        />
      </TestWrapper>
    )

    expect(NotesMock).toHaveBeenCalledTimes(1)
    expect(NotesMock).toHaveBeenCalledWith(
      expect.objectContaining({
        notes: [
          {
            id: 'note-3',
            createdAt: '2020-01-30T14:16:29+03:00'
          },
          {
            id: 'note-1',
            createdAt: '2019-01-04T22:23:26+03:00'
          },
          {
            id: 'note-2',
            createdAt: '2018-11-27T19:35:50+03:00'
          }
        ]
      }),
      {}
    )
  })
})
