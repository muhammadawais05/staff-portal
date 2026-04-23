import React from 'react'
import { useGetNode, useQuery } from '@staff-portal/data-layer-service'
import {
  BasicInfo,
  getTalentCardContent,
  Preview,
  PreviewTalentCardLoader
} from '@staff-portal/talents-card-builder'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'

import PreviewTalentCard from './PreviewTalentCard'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/talents-card-builder', () => ({
  ...jest.requireActual('@staff-portal/talents-card-builder'),
  BasicInfo: jest.fn(),
  Preview: jest.fn(),
  PreviewTalentCardLoader: jest.fn(),
  getProfilePitch: jest.fn(),
  getTalentCardContent: jest.fn()
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseGetNode = useGetNode as jest.Mock
const mockBasicInfo = BasicInfo as jest.Mock
const mockPreview = Preview as jest.Mock
const mockPreviewTalentCardLoader = PreviewTalentCardLoader as jest.Mock
const mockGetTalentCardContent = getTalentCardContent as jest.Mock

const renderComponent = ({
  pitchData,
  pitchLoading = false,
  profileData,
  profileLoading = false,
  withFormWrapper
}: {
  pitchData?: object
  pitchLoading?: boolean
  profileData?: object
  profileLoading?: boolean
  withFormWrapper?: boolean
} = {}) => {
  mockBasicInfo.mockImplementation(() => null)
  mockPreview.mockImplementation(() => null)
  mockPreviewTalentCardLoader.mockImplementation(() => null)
  mockGetTalentCardContent.mockImplementation(() => ({}))

  mockUseQuery.mockImplementation(() => ({
    data: pitchData,
    loading: pitchLoading
  }))

  mockUseGetNode.mockImplementation(() => () => ({
    data: profileData,
    loading: profileLoading
  }))

  return render(
    <TestWrapper>
      <PreviewTalentCard
        talentId='1'
        jobId='1'
        withFormWrapper={withFormWrapper}
      />
    </TestWrapper>
  )
}

describe('PreviewTalentCard', () => {
  describe('when loading profile', () => {
    it('shows the loader', () => {
      renderComponent({ profileLoading: true })

      expect(mockPreviewTalentCardLoader).toHaveBeenCalled()
      expect(
        screen.queryByTestId('preview-talent-card')
      ).not.toBeInTheDocument()
    })
  })

  describe('when loading pitch', () => {
    it('shows the loader', () => {
      renderComponent({ pitchLoading: true })

      expect(mockPreviewTalentCardLoader).toHaveBeenCalled()
      expect(
        screen.queryByTestId('preview-talent-card')
      ).not.toBeInTheDocument()
    })
  })

  describe('when loading pitch and profile', () => {
    it('shows the loader', () => {
      renderComponent({ pitchLoading: true })

      expect(mockPreviewTalentCardLoader).toHaveBeenCalled()
      expect(
        screen.queryByTestId('preview-talent-card')
      ).not.toBeInTheDocument()
    })
  })

  describe('when pitch and profile are missing', () => {
    it('returns null', () => {
      renderComponent()

      expect(mockPreviewTalentCardLoader).not.toHaveBeenCalled()
      expect(
        screen.queryByTestId('preview-talent-card')
      ).not.toBeInTheDocument()
    })
  })

  describe('when profile is missing', () => {
    it('returns null', () => {
      renderComponent({ pitchData: {} })

      expect(mockPreviewTalentCardLoader).not.toHaveBeenCalled()
      expect(
        screen.queryByTestId('preview-talent-card')
      ).not.toBeInTheDocument()
    })
  })

  describe('when pith is missing', () => {
    it('returns null', () => {
      renderComponent({ profileData: { profileV2: { profileV2: {} } } })

      expect(mockPreviewTalentCardLoader).not.toHaveBeenCalled()
      expect(
        screen.queryByTestId('preview-talent-card')
      ).not.toBeInTheDocument()
    })
  })

  describe('when pitch and profile are available', () => {
    it('shows the preview', () => {
      renderComponent({ profileData: { profileV2: {} }, pitchData: {} })

      expect(mockPreviewTalentCardLoader).not.toHaveBeenCalled()
      expect(screen.getByTestId('preview-talent-card')).toBeInTheDocument()
    })
  })

  describe('when `withFormWrapper` is false', () => {
    it('renders Preview without Form', () => {
      renderComponent({
        profileData: { profileV2: {} },
        pitchData: {},
        withFormWrapper: false
      })

      expect(mockPreviewTalentCardLoader).not.toHaveBeenCalled()
      expect(
        screen.queryByTestId('preview-talent-card-form')
      ).not.toBeInTheDocument()
      expect(screen.getByTestId('preview-talent-card')).toBeInTheDocument()
    })
  })

  describe('when `withFormWrapper` is true', () => {
    it('renders Form with Preview', () => {
      renderComponent({
        profileData: { profileV2: {} },
        pitchData: {},
        withFormWrapper: true
      })

      expect(mockPreviewTalentCardLoader).not.toHaveBeenCalled()
      expect(screen.getByTestId('preview-talent-card-form')).toBeInTheDocument()
      expect(screen.getByTestId('preview-talent-card')).toBeInTheDocument()
    })
  })
})
