import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import JobNotesActions from '../JobNotesActions'
import JobNotesContent from '../JobNotesContent'
import NotesSection from './NotesSection'
import { useGetJobNotes } from './data'

jest.mock('@staff-portal/engagements')
jest.mock('./data')
jest.mock('../JobNotesActions')
jest.mock('../JobNotesContent')
jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  useMessageListener: jest.fn()
}))

const mockedJobNotesActions = JobNotesActions as jest.Mock
const mockedJobNotesContent = JobNotesContent as jest.Mock
const useGetJobNotesMock = useGetJobNotes as jest.Mock

const JOB_ID = 'JOB_ID'

const renderComponent = () =>
  render(
    <TestWrapper>
      <NotesSection jobId={JOB_ID} />
    </TestWrapper>
  )

describe('NotesSection', () => {
  describe('when data provided', () => {
    it('default render', () => {
      const data = {
        operations: {
          addJobMatchingNote: createOperationMock(),
          createActivity: createOperationMock()
        },
        nodes: [],
        matchingNoteQuestions: {
          nodes: []
        },
        client: {
          representatives: {
            nodes: []
          }
        }
      }

      mockedJobNotesActions.mockReturnValue(null)
      mockedJobNotesContent.mockReturnValue(null)
      useGetJobNotesMock.mockReturnValue({
        loading: false,
        data,
        error: null,
        notes: []
      })

      renderComponent()

      expect(useGetJobNotesMock).toHaveBeenCalledWith(JOB_ID)
      expect(mockedJobNotesContent).toHaveBeenCalledWith(
        expect.objectContaining({ notes: [] }),
        {}
      )
      expect(mockedJobNotesActions).toHaveBeenCalledWith(
        expect.objectContaining({ job: data }),
        {}
      )
    })
  })

  describe('when user does not have enough permissions', () => {
    it('does not renders the section', () => {
      useGetJobNotesMock.mockReturnValue({
        loading: false,
        data: null,
        error: {
          graphQLErrors: [
            {
              message: 'Not authorized (Job.notes)',
              path: ['node', 'notes'],
              extensions: {
                code: 'UNAUTHORIZED',
                serviceName: 'staff_schema'
              }
            }
          ]
        },
        notes: []
      })

      renderComponent()

      expect(mockedJobNotesContent).not.toHaveBeenCalled()
      expect(mockedJobNotesActions).not.toHaveBeenCalled()
    })
  })
})
