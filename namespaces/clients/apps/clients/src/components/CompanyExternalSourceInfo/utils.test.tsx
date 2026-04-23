import { GetInDepthCompanyResearchClientFragment } from '../../web-and-social-tab/data'
import { CompanyFinancialInformationFragment } from '../CompanyFinancialInformation/data'
import { CompanyOverviewFragment } from '../../basic-info-tab/components/AccountOverviewSection/data'
import {
  getCompanyExternalSourceTotalEmployee,
  getCompanyExternalSourceTotalEmployeeViewer,
  getCompanyExternalSourceStage,
  getCompanyExternalSourceStageTooltip,
  getCompanyExternalSourceAcquiredBy,
  getCompanyExternalSourceAcquiredByTooltip,
  getCompanyExternalSourceAcquiredCompanies,
  getCompanyExternalSourceAcquiredCompaniesTooltip,
  getCompanyExternalSourceCompanyHqPhone
} from './utils'

describe('CompanyExternalSourceInfo utils', () => {
  describe('getCompanyExternalSourceCompanyHQPhone`', () => {
    it('returns internal value if exist', () => {
      const phone = '1234567890'

      const result = getCompanyExternalSourceCompanyHqPhone({
        companyHqPhone: phone
      } as CompanyOverviewFragment)

      expect(result).toBe(phone)
    })

    it('returns clientopedia value if exist', () => {
      const phone = '1234567890'

      const result = getCompanyExternalSourceCompanyHqPhone({
        clientopedia: {
          phone
        }
      } as CompanyOverviewFragment)

      expect(result).toBe(phone)
    })
  })

  describe('getCompanyExternalSourceTotalEmployee`', () => {
    it('returns internal value if exist', () => {
      const result = getCompanyExternalSourceTotalEmployee({
        internalEmployeeCount: 1,
        buyingSignalsService: {
          currentEmployeeCount: 2
        },
        clientopedia: {
          employeeCount: 3
        }
      } as GetInDepthCompanyResearchClientFragment)

      expect(result).toBe(1)
    })

    it('returns bss value if exist and no internal', () => {
      const result = getCompanyExternalSourceTotalEmployee({
        buyingSignalsService: {
          currentEmployeeCount: 2
        },
        clientopedia: {
          employeeCount: 3
        }
      } as GetInDepthCompanyResearchClientFragment)

      expect(result).toBe(2)
    })

    it('returns clientopedia value if exist and no internal and bss', () => {
      const result = getCompanyExternalSourceTotalEmployee({
        clientopedia: {
          employeeCount: 3
        }
      } as GetInDepthCompanyResearchClientFragment)

      expect(result).toBe(3)
    })
  })

  describe('getCompanyExternalSourceTotalEmployeeViewer`', () => {
    it('returns internal value if exist', () => {
      const result = getCompanyExternalSourceTotalEmployeeViewer({
        internalEmployeeCount: 1
      } as GetInDepthCompanyResearchClientFragment)

      expect(result).toBe(1)
    })

    it('returns giogio value if exist and no internal', () => {
      const result = getCompanyExternalSourceTotalEmployeeViewer({
        giorgioEmployeeRange: '12-34'
      } as GetInDepthCompanyResearchClientFragment)

      expect(result).toBe('12-34')
    })
  })

  describe('getCompanyExternalSourceStage`', () => {
    it('returns stage value if exist', () => {
      const result = getCompanyExternalSourceStage({
        stage: 'test',
        buyingSignalsService: {
          stage: 'test 2'
        }
      } as CompanyFinancialInformationFragment)

      expect(result).toBe('test')
    })

    it('returns bss value if exist and no stage', () => {
      const result = getCompanyExternalSourceStage({
        buyingSignalsService: {
          stage: 'test'
        }
      } as CompanyFinancialInformationFragment)

      expect(result).toBe('test')
    })
  })

  describe('getCompanyExternalSourceStageTooltip`', () => {
    it('do not returns tooltip if value not exist', () => {
      const result = getCompanyExternalSourceStageTooltip(
        {} as CompanyFinancialInformationFragment
      )

      expect(result).toBeNull()
    })

    it('returns tooltip if same value and bss', () => {
      const result = getCompanyExternalSourceStageTooltip({
        stage: 'test',
        buyingSignalsService: {
          stage: 'test'
        }
      } as CompanyFinancialInformationFragment)

      expect(result).not.toBeNull()
    })
  })

  describe('getCompanyExternalSourceAcquiredBy`', () => {
    it('returns acquiredBy value if exist', () => {
      const result = getCompanyExternalSourceAcquiredBy({
        acquiredBy: ['test 1', 'test 2'],
        buyingSignalsService: {
          acquiredBy: ['test 3', 'test 4']
        }
      } as CompanyFinancialInformationFragment)

      expect(result).toBe('test 1, test 2')
    })

    it('returns bss value if exist and no acquiredBy', () => {
      const result = getCompanyExternalSourceAcquiredBy({
        buyingSignalsService: {
          acquiredBy: ['test 3', 'test 4']
        }
      } as CompanyFinancialInformationFragment)

      expect(result).toBe('test 3, test 4')
    })
  })

  describe('getCompanyExternalSourceAcquiredByTooltip`', () => {
    it('do not returns tooltip if value not exist', () => {
      const result = getCompanyExternalSourceAcquiredByTooltip(
        {} as CompanyFinancialInformationFragment
      )

      expect(result).toBeNull()
    })

    it('returns tooltip if same value and bss', () => {
      const result = getCompanyExternalSourceAcquiredByTooltip({
        acquiredBy: ['test 3', 'test 4'],
        buyingSignalsService: {
          acquiredBy: ['test 3', 'test 4']
        }
      } as CompanyFinancialInformationFragment)

      expect(result).not.toBeNull()
    })
  })

  describe('getCompanyExternalSourceAcquiredCompanies`', () => {
    it('returns acquiredBy value if exist', () => {
      const result = getCompanyExternalSourceAcquiredCompanies({
        acquiredCompanies: ['test 1', 'test 2'],
        buyingSignalsService: {
          acquiredCompanies: ['test 3', 'test 4']
        }
      } as CompanyFinancialInformationFragment)

      expect(result).toBe('test 1, test 2')
    })

    it('returns bss value if exist and no acquiredCompanies', () => {
      const result = getCompanyExternalSourceAcquiredCompanies({
        buyingSignalsService: {
          acquiredCompanies: ['test 3', 'test 4']
        }
      } as CompanyFinancialInformationFragment)

      expect(result).toBe('test 3, test 4')
    })
  })

  describe('getCompanyExternalSourceAcquiredCompaniesTooltip`', () => {
    it('do not returns tooltip if value not exist', () => {
      const result = getCompanyExternalSourceAcquiredCompaniesTooltip(
        {} as CompanyFinancialInformationFragment
      )

      expect(result).toBeNull()
    })

    it('returns tooltip if same value and bss', () => {
      const result = getCompanyExternalSourceAcquiredCompaniesTooltip({
        acquiredCompanies: ['test 3', 'test 4'],
        buyingSignalsService: {
          acquiredCompanies: ['test 3', 'test 4']
        }
      } as CompanyFinancialInformationFragment)

      expect(result).not.toBeNull()
    })
  })
})
