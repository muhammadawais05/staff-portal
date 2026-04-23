import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'
import { Form, FieldWrapper } from '@toptal/picasso-forms'

import { useCandidateSendingContext, useGetRoleTitle } from '../../hooks'
import JobTalentsAutocompleteField from './JobTalentsAutocompleteField'

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn(),
  useGetRoleTitle: jest.fn()
}))

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  FieldWrapper: jest.fn()
}))

jest.mock('../FieldSkeleton/FieldSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid='field-skeleton' />
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock
const useGetRoleTitleMock = useGetRoleTitle as jest.Mock

const FieldWrapperMock = FieldWrapper as unknown as jest.Mock

const renderComponent = ({
  roleTitleData = {}
}: {
  roleTitleData?: { roleTitle?: string | null; loading?: boolean }
}) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    talentName: 'Andrei'
  }))
  useGetRoleTitleMock.mockImplementation(() => roleTitleData)

  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <JobTalentsAutocompleteField jobId='job-123' />
      </Form>
    </TestWrapper>
  )
}

describe('JobTalentsAutocompleteField', () => {
  describe('when the `roleTitleData` is loading', () => {
    it('renders the field skeleton', () => {
      renderComponent({
        roleTitleData: { roleTitle: 'Assembly Developer', loading: true }
      })

      expect(screen.getByTestId('field-skeleton')).toBeInTheDocument()
    })
  })

  describe('when data is available', () => {
    it('renders the proper content', () => {
      FieldWrapperMock.mockImplementation(() => null)

      renderComponent({
        roleTitleData: { roleTitle: 'Assembly Developer', loading: false }
      })

      expect(screen.getByTestId('Section-title')).toHaveTextContent(
        'Search Candidate'
      )
      expect(
        screen.getByText(
          'Select the Assembly Developer you want to send to this job:'
        )
      ).toBeInTheDocument()
      expect(screen.getByTestId('item-field-label')).toHaveTextContent(
        '*Assembly Developer'
      )

      expect(FieldWrapperMock).toHaveBeenCalledTimes(1)
      expect(FieldWrapperMock).toHaveBeenCalledWith(
        expect.objectContaining({
          children: expect.anything(),
          hint: "Start typing Assembly Developer's name",
          name: 'talentId'
        }),
        {}
      )
    })
  })
})
