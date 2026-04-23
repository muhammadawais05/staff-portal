import React, { RefObject } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'

import AddNoteButton from './AddNoteButton'
import { CommunityLeaderData } from '../../types'

const mockLeader: CommunityLeaderData = {
  id: '123456789',
  appliedStaffRole: {
    id: '123465789',
    email: 'alex.casillas@toptal.com',
    fullName: 'Alex Casillas',
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

const arrangeTest = (
  communityLeader: CommunityLeaderData,
  onComplete: () => void,
  operation: Operation,
  formContainer: RefObject<HTMLDivElement>
  // eslint-disable-next-line max-params
) =>
  render(
    <TestWrapper>
      <AddNoteButton
        communityLeaderId='VjEtU3RhZmYtMzAxNDQ3'
        communityLeader={communityLeader}
        onComplete={onComplete}
        createNoteOperation={operation}
        formContainer={formContainer}
      />
    </TestWrapper>
  )

describe('AddNoteButton', () => {
  it('renders the component', () => {
    const formRef = document.createElement('div')

    arrangeTest(
      mockLeader,
      jest.fn(),
      {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      formRef as unknown as RefObject<HTMLDivElement>
    )

    expect(screen.getByText('Add Note')).toBeInTheDocument()
  })
})
