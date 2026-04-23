import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'
import { useGetNode } from '@staff-portal/data-layer-service'

import JobPositionAnswersSection from './JobPositionAnswersSection'
import { GetPositionAnswersQuery } from './data/get-position-answers/get-position-answers.staff.gql.types'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useGetNode: jest.fn()
}))

jest.mock('@staff-portal/jobs', () => ({
  __esModule: true,
  JobPositionAnswers: () => <div data-testid='job-position-answers' />
}))
jest.mock('@staff-portal/ui', () => ({
  __esModule: true,
  NoteCardSkeletonLoader: () => <div data-testid='note-card-skeleton-loader' />
}))

const useGetNodeMock = useGetNode as jest.Mock

const renderComponent = ({
  data,
  loading
}: {
  data?: GetPositionAnswersQuery['node']
  loading?: boolean
}) => {
  useGetNodeMock.mockImplementation(() => () => ({
    loading,
    data
  }))

  return render(
    <TestWrapper>
      <JobPositionAnswersSection id='id' />
    </TestWrapper>
  )
}

describe('JobPositionAnswersSection', () => {
  describe('when hook returns `loading` equals `true`', () => {
    it('renders skeleton loader', () => {
      renderComponent({ loading: true })

      expect(
        screen.getByTestId('note-card-skeleton-loader')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('job-position-answers')
      ).not.toBeInTheDocument()
    })
  })

  describe('when hook returns no data', () => {
    it('renders nothing', () => {
      renderComponent({
        loading: false,
        data: undefined
      })

      expect(
        screen.queryByTestId('note-card-skeleton-loader')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('job-position-answers')
      ).not.toBeInTheDocument()
    })
  })

  describe('when hook returns data for job application', () => {
    it('renders section', () => {
      renderComponent({
        loading: false,
        data: {
          id: 'some-id',
          applicationComment: 'some comment',
          jobApplicationJobPositionAnswers: { nodes: [] }
        } as unknown as GetPositionAnswersQuery['node']
      })

      expect(
        screen.queryByTestId('note-card-skeleton-loader')
      ).not.toBeInTheDocument()
      expect(screen.getByTestId('job-position-answers')).toBeInTheDocument()
      expect(screen.getByText('some comment')).toBeInTheDocument()
    })
  })

  describe('when hook returns data for availability request', () => {
    it('renders section', () => {
      renderComponent({
        loading: false,
        data: {
          id: 'some-id',
          comment: 'some comment',
          availabilityRequestJobPositionAnswers: { nodes: [] }
        } as unknown as GetPositionAnswersQuery['node']
      })

      expect(
        screen.queryByTestId('note-card-skeleton-loader')
      ).not.toBeInTheDocument()
      expect(screen.getByTestId('job-position-answers')).toBeInTheDocument()
      expect(screen.getByText('some comment')).toBeInTheDocument()
    })
  })
})
