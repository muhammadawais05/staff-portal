import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { TALENT_UPDATED } from '@staff-portal/talents'

import TalentApplicantItem from './TalentApplicantItem'
import { useGetActivationStepsData } from '../TalentActivationSteps'
import { useGetScreeningStepsData } from '../TalentScreeningSteps'
import useGetTalentApplicantData from './hooks/use-get-talent-applicant-data'

const SKELETON_LOADER_ID = 'SKELETON_LOADER_ID'
const TITLE_ID = 'TITLE_ID'
const ACTIONS_ID = 'ACTIONS_ID'
const DETAILS_ID = 'DETAILS_ID'

jest.mock('@staff-portal/talents', () => ({
  TALENT_UPDATED: 'TALENT_UPDATED'
}))
jest.mock('@staff-portal/data-layer-service')
jest.mock('@toptal/staff-portal-message-bus')
jest.mock('@toptal/picasso', () => ({
  Section: ({
    title,
    actions,
    children
  }: {
    title: ReactNode
    actions: ReactNode
    children: ReactNode
  }) => (
    <>
      {title}
      {actions}
      {children}
    </>
  )
}))

jest.mock('../TalentApplicantItemSkeletonLoader', () => ({
  __esModule: true,
  default: () => <div data-testid={SKELETON_LOADER_ID} />
}))
jest.mock('./components', () => ({
  TalentApplicantItemActions: () => <div data-testid={ACTIONS_ID} />,
  TalentApplicantItemTitle: () => <div data-testid={TITLE_ID} />,
  TalentApplicantDetails: () => <div data-testid={DETAILS_ID} />
}))
jest.mock('../TalentActivationSteps', () => ({
  useGetActivationStepsData: jest.fn()
}))
jest.mock('../TalentScreeningSteps', () => ({
  useGetScreeningStepsData: jest.fn()
}))
jest.mock('./hooks/use-get-talent-applicant-data', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockUseMessageListener = useMessageListener as jest.Mock

const mockUserGetScreeningStepsData = useGetScreeningStepsData as jest.Mock
const mockUseGetActivationStepsData = useGetActivationStepsData as jest.Mock
const mockUseGetTalentApplicantData = useGetTalentApplicantData as jest.Mock

const arrangeTest = (talentId = '') =>
  render(<TalentApplicantItem talentId={talentId} itemIndex={0} />)

describe('TalentApplicantItem', () => {
  beforeEach(() => {
    mockUserGetScreeningStepsData.mockReturnValue({})
    mockUseGetActivationStepsData.mockReturnValue({})
    mockUseGetTalentApplicantData.mockReturnValue({})
  })

  it('calls `useGetNode` with the provided `talentId` from props', () => {
    const talentId = 'talentId'

    arrangeTest(talentId)

    expect(mockUseGetTalentApplicantData).toHaveBeenCalledWith(talentId)
  })

  it('listens for `TALENT_UPDATED` events', () => {
    arrangeTest()

    expect(mockUseMessageListener).toHaveBeenCalledWith(
      TALENT_UPDATED,
      expect.any(Function)
    )
  })

  describe('when data is loading', () => {
    describe('when talent is cached', () => {
      it('should not render skeleton loader', () => {
        mockUseGetTalentApplicantData.mockReturnValue({ loading: true, data: { node: {} } })

        const { queryByTestId } = arrangeTest()

        expect(queryByTestId(SKELETON_LOADER_ID)).not.toBeInTheDocument()
      })

      it('should render item content', () => {
        mockUseGetTalentApplicantData.mockReturnValue({ loading: true, data: { node: {}} })

        const { getByTestId } = arrangeTest()

        expect(getByTestId(TITLE_ID)).toBeInTheDocument()
        expect(getByTestId(ACTIONS_ID)).toBeInTheDocument()
        expect(getByTestId(DETAILS_ID)).toBeInTheDocument()
      })
    })

    describe('when talent is not cached', () => {
      it('should render skeleton loader', () => {
        mockUseGetTalentApplicantData.mockReturnValue({ loading: true, data: null })

        const { getByTestId } = arrangeTest()

        expect(getByTestId(SKELETON_LOADER_ID)).toBeInTheDocument()
      })

      it('should not render item content', () => {
        mockUseGetTalentApplicantData.mockReturnValue({ loading: true, data: null })

        const { queryByTestId } = arrangeTest()

        expect(queryByTestId(TITLE_ID)).not.toBeInTheDocument()
        expect(queryByTestId(ACTIONS_ID)).not.toBeInTheDocument()
        expect(queryByTestId(DETAILS_ID)).not.toBeInTheDocument()
      })
    })
  })

  describe('when data is not loading', () => {
    describe('when there is no talent', () => {
      it('should not render skeleton loader', () => {
        mockUseGetTalentApplicantData.mockReturnValue({ loading: false, data: null })

        const { queryByTestId } = arrangeTest()

        expect(queryByTestId(SKELETON_LOADER_ID)).not.toBeInTheDocument()
      })

      it('should not render item content', () => {
        mockUseGetTalentApplicantData.mockReturnValue({ loading: false, data: null })

        const { queryByTestId } = arrangeTest()

        expect(queryByTestId(TITLE_ID)).not.toBeInTheDocument()
        expect(queryByTestId(ACTIONS_ID)).not.toBeInTheDocument()
        expect(queryByTestId(DETAILS_ID)).not.toBeInTheDocument()
      })
    })

    describe('when there is a talent', () => {
      it('should not render skeleton loader', () => {
        mockUseGetTalentApplicantData.mockReturnValue({ loading: false, data: {} })

        const { queryByTestId } = arrangeTest()

        expect(queryByTestId(SKELETON_LOADER_ID)).not.toBeInTheDocument()
      })

      it('should render item content', () => {
        mockUseGetTalentApplicantData.mockReturnValue({ loading: false, data: { node: {}} })

        const { getByTestId } = arrangeTest()

        expect(getByTestId(TITLE_ID)).toBeInTheDocument()
        expect(getByTestId(ACTIONS_ID)).toBeInTheDocument()
        expect(getByTestId(DETAILS_ID)).toBeInTheDocument()
      })
    })
  })
})
