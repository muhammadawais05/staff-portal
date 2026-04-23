import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@testing-library/react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'

import TalentInfoSection from './TalentInfoSection'
import { useGetTalentInfoData } from '../../hooks/use-get-talent-info-data/use-get-talent-info-data'

const testTalent = {
  engagements: {
    counters: {
      acceptedInterviewsNumber: 5,
      approvedTrialsNumber: 0,
      clientsNumber: 0,
      interviewsNumber: 9,
      repeatedClientsNumber: 0,
      successRate: 0,
      trialsNumber: 0,
      workingNumber: 0
    }
  },
  fullName: 'Foster Crist',
  hourlyRate: '50.0',
  resumeUrl: 'https://test.resume',
  id: 'VjEtVGFsZW50LTI4NDY0Nzg',
  location: {
    country: {
      id: 'VjEtQ291bnRyeS0zMQ',
      name: 'Brazil'
    }
  },
  photo: null,
  talentPartner: null,
  timeZone: {
    name: '(UTC-03:00) America - Sao Paulo',
    value: 'America/Sao_Paulo'
  },
  emailMessaging: {
    id: 'VjEtRW1haWxNZXNzYWdpbmdSb2xlLTI4NDY0Nzg',
    operations: {
      sendEmailTo: {
        callable: 'ENABLED',
        messages: []
      } as unknown as OperationType
    }
  },
  webResource: {
    text: 'Foster Crist',
    url: 'https://platform-56528-gold-feeback-step-always-available.toptal.rocks/platform/staff/talents/2846478'
  }
}

jest.mock('@staff-portal/talents', () => ({
  __esModule: true,
  TalentAvatar: () => <>TalentAvatar</>,
  EngagementsRatesField: () => <>EngagementsRatesField</>
}))

jest.mock('../TalentInfoSectionActions/TalentInfoSectionActions', () => ({
  __esModule: true,
  default: () => <>TalentInfoSectionActions</>
}))

jest.mock(
  '../../hooks/use-get-talent-info-data/use-get-talent-info-data',
  () => ({
    useGetTalentInfoData: jest.fn()
  })
)

jest.mock(
  '../../components/TalentInfoSkeletonLoader/TalentInfoSkeletonLoader',
  () => ({
    __esModule: true,
    TalentInfoSkeletonLoader: () => <>TalentInfoSkeletonLoader</>
  })
)

const useGetTalentInfoDataMock = useGetTalentInfoData as jest.Mock

const arrangeTest = () => {
  const {
    container: { textContent }
  } = render(
    <TestWrapper>
      <TalentInfoSection talentId='talentId' />
    </TestWrapper>
  )

  return textContent
}

describe('TalentInfoSection', () => {
  describe('when data is being loaded', () => {
    it('renders a skeleton when talent is not presented yet', () => {
      useGetTalentInfoDataMock.mockImplementation(() => ({
        talent: undefined,
        loading: true
      }))

      const content = arrangeTest()

      expect(content).toContain('TalentInfoSkeletonLoader')
    })
  })

  describe('loading is finished', () => {
    it('does not render anything if talent is not presented', () => {
      useGetTalentInfoDataMock.mockImplementation(() => ({
        talent: undefined,
        loading: false
      }))

      const content = arrangeTest()

      expect(content).toBe('')
    })

    it('renders a talent data', () => {
      useGetTalentInfoDataMock.mockImplementation(() => ({
        talent: testTalent,
        loading: false
      }))

      const content = arrangeTest()

      expect(content).toContain('TalentAvatar')

      expect(content).toContain('Current country')
      expect(content).toContain('Brazil')

      expect(content).toContain('Time Zone')
      expect(content).toContain('(UTC-03:00) America - Sao Paulo')

      expect(content).toContain('Hourly rate')
      expect(content).toContain('$50.00/h')

      expect(content).toContain('Engagements rates')
      expect(content).toContain('EngagementsRatesField')
    })
  })
})
