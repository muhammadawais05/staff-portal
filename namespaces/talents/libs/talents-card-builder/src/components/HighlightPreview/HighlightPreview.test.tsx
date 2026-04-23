import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import { HighlightType, PreviewHighlightType } from '../../types'
import CertificationPreview from '../CertificationPreview/CertificationPreview'
import EducationPreview from '../EducationPreview/EducationPreview'
import EmploymentPreview from '../EmploymentPreview/EmploymentPreview'
import MentorshipPreview from '../MentorshipPreview/MentorshipPreview'
import PortfolioPreview from '../PortfolioPreview/PortfolioPreview'
import PublicationPreview from '../PublicationPreview/PublicationPreview'
import HighlightPreview from './HighlightPreview'

jest.mock('../CertificationPreview/CertificationPreview')
jest.mock('../EducationPreview/EducationPreview')
jest.mock('../EmploymentPreview/EmploymentPreview')
jest.mock('../MentorshipPreview/MentorshipPreview')
jest.mock('../PortfolioPreview/PortfolioPreview')
jest.mock('../PublicationPreview/PublicationPreview')

const mockCertificationPreview = CertificationPreview as jest.Mock
const mockEducationPreview = EducationPreview as jest.Mock
const mockEmploymentPreview = EmploymentPreview as jest.Mock
const mockMentorshipPreview = MentorshipPreview as jest.Mock
const mockPortfolioPreview = PortfolioPreview as jest.Mock
const mockPublicationPreview = PublicationPreview as jest.Mock

const renderComponent = (type: HighlightType) => {
  mockCertificationPreview.mockImplementation(() => null)
  mockEducationPreview.mockImplementation(() => null)
  mockEmploymentPreview.mockImplementation(() => null)
  mockMentorshipPreview.mockImplementation(() => null)
  mockPortfolioPreview.mockImplementation(() => null)
  mockPublicationPreview.mockImplementation(() => null)

  return render(
    <TestWrapper>
      <HighlightPreview
        fullName='Talent Name'
        highlight={{ id: '1', type } as PreviewHighlightType}
      />
    </TestWrapper>
  )
}

describe('HighlightPreview', () => {
  describe('when type is wrong', () => {
    it('returns null', () => {
      renderComponent('test' as HighlightType)

      expect(CertificationPreview).not.toHaveBeenCalled()
      expect(EducationPreview).not.toHaveBeenCalled()
      expect(EmploymentPreview).not.toHaveBeenCalled()
      expect(MentorshipPreview).not.toHaveBeenCalled()
      expect(PortfolioPreview).not.toHaveBeenCalled()
      expect(PublicationPreview).not.toHaveBeenCalled()
    })
  })

  describe('when type is certification', () => {
    it('returns certification preview', () => {
      renderComponent('certification')

      expect(CertificationPreview).toHaveBeenCalledWith(
        { data: { id: '1', type: 'certification' } },
        expect.anything()
      )
      expect(EducationPreview).not.toHaveBeenCalled()
      expect(EmploymentPreview).not.toHaveBeenCalled()
      expect(MentorshipPreview).not.toHaveBeenCalled()
      expect(PortfolioPreview).not.toHaveBeenCalled()
      expect(PublicationPreview).not.toHaveBeenCalled()
    })
  })

  describe('when type is education', () => {
    it('returns education preview', () => {
      renderComponent('education')

      expect(CertificationPreview).not.toHaveBeenCalled()
      expect(EducationPreview).toHaveBeenCalledWith(
        { data: { id: '1', type: 'education' } },
        expect.anything()
      )
      expect(EmploymentPreview).not.toHaveBeenCalled()
      expect(MentorshipPreview).not.toHaveBeenCalled()
      expect(PortfolioPreview).not.toHaveBeenCalled()
      expect(PublicationPreview).not.toHaveBeenCalled()
    })
  })

  describe('when type is employment', () => {
    it('returns employment preview', () => {
      renderComponent('employment')

      expect(CertificationPreview).not.toHaveBeenCalled()
      expect(EducationPreview).not.toHaveBeenCalled()
      expect(EmploymentPreview).toHaveBeenCalledWith(
        {
          sortable: undefined,
          data: { id: '1', type: 'employment' }
        },
        expect.anything()
      )
      expect(MentorshipPreview).not.toHaveBeenCalled()
      expect(PortfolioPreview).not.toHaveBeenCalled()
      expect(PublicationPreview).not.toHaveBeenCalled()
    })
  })

  describe('when type is mentorship', () => {
    it('returns mentorship preview', () => {
      renderComponent('mentorship')

      expect(CertificationPreview).not.toHaveBeenCalled()
      expect(EducationPreview).not.toHaveBeenCalled()
      expect(EmploymentPreview).not.toHaveBeenCalled()
      expect(MentorshipPreview).toHaveBeenCalledWith(
        { fullName: 'Talent Name' },
        expect.anything()
      )
      expect(PortfolioPreview).not.toHaveBeenCalled()
      expect(PublicationPreview).not.toHaveBeenCalled()
    })
  })

  describe('when type is portfolio', () => {
    it('returns portfolio preview', () => {
      renderComponent('portfolio')

      expect(CertificationPreview).not.toHaveBeenCalled()
      expect(EducationPreview).not.toHaveBeenCalled()
      expect(EmploymentPreview).not.toHaveBeenCalled()
      expect(MentorshipPreview).not.toHaveBeenCalled()
      expect(PortfolioPreview).toHaveBeenCalledWith(
        { data: { id: '1', type: 'portfolio' } },
        expect.anything()
      )
      expect(PublicationPreview).not.toHaveBeenCalled()
    })
  })

  describe('when type is publication', () => {
    it('returns publication preview', () => {
      renderComponent('publication')

      expect(CertificationPreview).not.toHaveBeenCalled()
      expect(EducationPreview).not.toHaveBeenCalled()
      expect(EmploymentPreview).not.toHaveBeenCalled()
      expect(MentorshipPreview).not.toHaveBeenCalled()
      expect(PortfolioPreview).not.toHaveBeenCalled()
      expect(PublicationPreview).toHaveBeenCalledWith(
        { data: { id: '1', type: 'publication' } },
        expect.anything()
      )
    })
  })
})
