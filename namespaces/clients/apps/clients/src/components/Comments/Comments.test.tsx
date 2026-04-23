import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { ContainerLoader } from '@staff-portal/ui'
import { usePerformedActionsQuery } from '@staff-portal/chronicles'

import { isCommentsSectionVisible } from './utils'
import Comments from '.'
import CommentsContent from './components/CommentsContent'
import CommentsSkeleton from './components/CommentsSkeleton'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/chronicles', () => ({
  ...jest.requireActual('@staff-portal/chronicles'),
  usePerformedActionsQuery: jest.fn()
}))
jest.mock('./components/CommentsSkeleton')
jest.mock('@staff-portal/ui/src/components/ContainerLoader', () => jest.fn())
jest.mock('./utils')

const arrangeTest = (props: ComponentProps<typeof Comments>) =>
  render(
    <TestWrapper>
      <Comments {...props} />
    </TestWrapper>
  )

const mockUseGetCode = useGetNode as jest.Mock
const mockIsCommentsSectionVisible = isCommentsSectionVisible as jest.Mock
const mockUsePerformedActionsQuery = usePerformedActionsQuery as jest.Mock
const ContainerLoaderMock = ContainerLoader as jest.Mock

describe('Comments', () => {
  beforeEach(() => {
    mockIsCommentsSectionVisible.mockReturnValue(true)
    ContainerLoaderMock.mockReturnValue(null)
  })

  describe('when loading comments info', () => {
    it('renders skeleton', () => {
      mockUseGetCode.mockReturnValue(() => ({
        data: {},
        loading: true
      }))

      mockUsePerformedActionsQuery.mockReturnValue({
        loading: false,
        intialDataLoading: false
      })

      arrangeTest({ companyId: '' })

      expect(ContainerLoader).toHaveBeenCalledTimes(1)
      expect(ContainerLoader).toHaveBeenCalledWith(
        expect.objectContaining({
          loading: false,
          showSkeleton: true,
          skeletonComponent: expect.objectContaining({
            type: CommentsSkeleton
          })
        }),
        {}
      )
    })
  })

  describe('when loading comments data', () => {
    it('renders skeleton', () => {
      mockUseGetCode.mockReturnValue(() => ({
        data: {},
        loading: false
      }))

      mockUsePerformedActionsQuery.mockReturnValue({
        loading: true,
        initialDataLoading: true
      })

      arrangeTest({ companyId: '' })

      expect(ContainerLoader).toHaveBeenCalledTimes(1)
      expect(ContainerLoader).toHaveBeenCalledWith(
        expect.objectContaining({
          showSkeleton: true,
          skeletonComponent: expect.objectContaining({
            type: CommentsSkeleton
          })
        }),
        {}
      )
    })
  })

  describe('when has no data or has no access', () => {
    it('displays nothing', () => {
      mockUseGetCode.mockReturnValue(() => ({}))
      mockUsePerformedActionsQuery.mockReturnValue({})
      mockIsCommentsSectionVisible.mockReturnValue(false)

      arrangeTest({ companyId: '' })

      expect(ContainerLoaderMock).not.toHaveBeenCalled()
    })
  })

  it('renders content with correct props', () => {
    mockUseGetCode.mockReturnValue(() => ({
      data: {
        commentsAccessible: 'commentsAccessible',
        cumulativeStatus: 'cumulativeStatus'
      },
      loading: false
    }))

    mockUsePerformedActionsQuery.mockReturnValue({
      loading: false,
      data: 'comments',
      error: 'error'
    })

    arrangeTest({ companyId: '' })

    expect(ContainerLoader).toHaveBeenCalledTimes(1)
    expect(ContainerLoader).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: false,
        showSkeleton: false,
        skeletonComponent: expect.objectContaining({
          type: CommentsSkeleton
        }),
        children: expect.objectContaining({
          type: CommentsContent,
          props: {
            cumulativeStatus: 'cumulativeStatus',
            comments: 'comments',
            error: 'error',
            sectionVariant: 'withHeaderBar'
          }
        })
      }),
      {}
    )
  })
})
