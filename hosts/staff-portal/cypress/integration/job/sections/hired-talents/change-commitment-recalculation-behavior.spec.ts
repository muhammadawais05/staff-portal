import { EngagementRateMethodEnum } from '@staff-portal/graphql/staff'

import { JobPage } from '~integration/modules/pages/jobs'
import { CommitmentChangeModal } from '~integration/modules/pages/engagements/components'
import updateChangeEngagementCommitmentStubs from '~integration/mocks/schema-updates/job/change-engagement-commitment-stubs-update'

const page = new JobPage()
const { hiredTalentSection } = page
const commitmentChangeModal = new CommitmentChangeModal()

const updateStubs = (rateMethod: EngagementRateMethodEnum) => {
  updateChangeEngagementCommitmentStubs({
    engagement: {
      rateMethod: rateMethod
    }
  })
}

const checkValues = (values: string[], includeDiscountFields = true) => {
  commitmentChangeModal.companyHourlyRateField.should('have.value', values[0])
  commitmentChangeModal.companyPartTimeRateField.should('have.value', values[1])
  commitmentChangeModal.companyFullTimeRateField.should('have.value', values[2])
  commitmentChangeModal.talentHourlyRateField.should('have.value', values[3])
  commitmentChangeModal.talentPartTimeRateField.should('have.value', values[4])
  commitmentChangeModal.talentFullTimeRateField.should('have.value', values[5])

  if (includeDiscountFields) {
    commitmentChangeModal.partTimeDiscountField.should('have.value', values[6])
    commitmentChangeModal.fullTimeDiscountField.should('have.value', values[7])
  }
}

const openChangeCommitmentModal = () => {
  hiredTalentSection.getFirstHiredTalentMoreButton().click()
  page.moreDropdown.contains('Change Commitment').click()
}

const closeChangeCommitmentModal = () => {
  commitmentChangeModal.cancelButton.click()
}

describe('Job Page -> Hired Talent -> More -> Change Engagement Commitment', () => {
  describe('when the `Default` rate method is selected', () => {
    before(() => {
      updateStubs(EngagementRateMethodEnum.DEFAULT)
    })

    it('changes one commitment value action', () => {
      page.visit()

      // check if discount fields are disabled
      openChangeCommitmentModal()

      commitmentChangeModal.partTimeDiscountField.should('be.disabled')
      commitmentChangeModal.fullTimeDiscountField.should('be.disabled')

      // triggers recalculations for the other fields if companyHourlyRate is changed
      commitmentChangeModal.companyHourlyRateField.clear()
      commitmentChangeModal.companyHourlyRateField.type('180.00')

      checkValues([
        '180.00',
        '3600.00',
        '7200.00',
        '108.00',
        '2160.00',
        '4320.00',
        '0',
        '0'
      ])

      closeChangeCommitmentModal()

      // triggers recalculations for the other fields if companyPartTimeRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.companyPartTimeRateField.clear()
      commitmentChangeModal.companyPartTimeRateField.type('3600.00')

      checkValues([
        '180.00',
        '3600.00',
        '7200.00',
        '108.00',
        '2160.00',
        '4320.00',
        '0',
        '0'
      ])

      closeChangeCommitmentModal()

      // triggers recalculations for the other fields if companyFullTimeRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.companyFullTimeRateField.clear()
      commitmentChangeModal.companyFullTimeRateField.type('7200.00')

      checkValues([
        '180.00',
        '3600.00',
        '7200.00',
        '108.00',
        '2160.00',
        '4320.00',
        '0',
        '0'
      ])

      closeChangeCommitmentModal()

      // triggers recalculations for the other fields if talentHourlyRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.talentHourlyRateField.clear()
      commitmentChangeModal.talentHourlyRateField.type('108.00')

      checkValues([
        '180.00',
        '3600.00',
        '7200.00',
        '108.00',
        '2160.00',
        '4320.00',
        '0',
        '0'
      ])

      closeChangeCommitmentModal()

      // triggers recalculations for the other fields if talentPartTimeRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.talentPartTimeRateField.clear()
      commitmentChangeModal.talentPartTimeRateField.type('2160.00')

      checkValues([
        '180.00',
        '3600.00',
        '7200.00',
        '108.00',
        '2160.00',
        '4320.00',
        '0',
        '0'
      ])

      closeChangeCommitmentModal()

      // triggers recalculations for the other fields if talentFullTimeRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.talentFullTimeRateField.clear()
      commitmentChangeModal.talentFullTimeRateField.type('4320.00')

      checkValues([
        '180.00',
        '3600.00',
        '7200.00',
        '108.00',
        '2160.00',
        '4320.00',
        '0',
        '0'
      ])

      closeChangeCommitmentModal()
    })
  })

  describe('when the `Override using markup/discount values` rate method is selected', () => {
    before(() => {
      updateStubs(
        EngagementRateMethodEnum.OVERRIDE_USING_MARKUP_DISCOUNT_VALUES
      )
    })

    it('changes one commitment value action', () => {
      page.visit()

      // triggers recalculations for the companyPartTimeRate if partTimeDiscount is changed
      openChangeCommitmentModal()

      commitmentChangeModal.partTimeDiscountField.clear()
      commitmentChangeModal.partTimeDiscountField.type('20')

      checkValues([
        '172.00',
        '2752.00',
        '6880.00',
        '100.00',
        '2000.00',
        '4000.00',
        '20',
        '0'
      ])

      closeChangeCommitmentModal()

      // triggers recalculations for the companyFullTimeRate if fullTimeDiscount is changed
      openChangeCommitmentModal()

      commitmentChangeModal.fullTimeDiscountField.clear()
      commitmentChangeModal.fullTimeDiscountField.type('20')

      checkValues([
        '166.00',
        '3320.00',
        '5312.00',
        '100.00',
        '2000.00',
        '4000.00',
        '0',
        '20'
      ])

      closeChangeCommitmentModal()

      // triggers recalculations for the other fields if companyHourlyRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.companyHourlyRateField.clear()
      commitmentChangeModal.companyHourlyRateField.type('180.00')

      checkValues([
        '180.00',
        '3600.00',
        '7200.00',
        '108.00',
        '2160.00',
        '4320.00',
        '0',
        '0'
      ])

      closeChangeCommitmentModal()

      // triggers recalculations for the other fields if companyPartTimeRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.companyPartTimeRateField.clear()
      commitmentChangeModal.companyPartTimeRateField.type('3600.00')

      checkValues([
        '180.00',
        '3600.00',
        '7200.00',
        '108.00',
        '2160.00',
        '4320.00',
        '0',
        '0'
      ])

      closeChangeCommitmentModal()

      // triggers recalculations for the other fields if companyFullTimeRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.companyFullTimeRateField.clear()
      commitmentChangeModal.companyFullTimeRateField.type('7200.00')

      checkValues([
        '180.00',
        '3600.00',
        '7200.00',
        '108.00',
        '2160.00',
        '4320.00',
        '0',
        '0'
      ])

      closeChangeCommitmentModal()

      // triggers recalculations for the other fields if talentHourlyRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.talentHourlyRateField.clear()
      commitmentChangeModal.talentHourlyRateField.type('108.00')

      checkValues([
        '180.00',
        '3600.00',
        '7200.00',
        '108.00',
        '2160.00',
        '4320.00',
        '0',
        '0'
      ])

      closeChangeCommitmentModal()

      // triggers recalculations for the other fields if talentPartTimeRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.talentPartTimeRateField.clear()
      commitmentChangeModal.talentPartTimeRateField.type('2160.00')

      checkValues([
        '180.00',
        '3600.00',
        '7200.00',
        '108.00',
        '2160.00',
        '4320.00',
        '0',
        '0'
      ])

      closeChangeCommitmentModal()

      // triggers recalculations for the other fields if talentFullTimeRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.talentFullTimeRateField.clear()
      commitmentChangeModal.talentFullTimeRateField.type('4320.00')

      checkValues([
        '180.00',
        '3600.00',
        '7200.00',
        '108.00',
        '2160.00',
        '4320.00',
        '0',
        '0'
      ])

      closeChangeCommitmentModal()
    })
  })

  describe('when the `Override using custom values` rate method is selected', () => {
    before(() => {
      updateStubs(EngagementRateMethodEnum.OVERRIDE_USING_CUSTOM_VALUES)
    })

    it('changes one commitment value action', () => {
      page.visit()

      // does not renders discount fields
      openChangeCommitmentModal()

      commitmentChangeModal.partTimeDiscountField.should('not.exist')
      commitmentChangeModal.fullTimeDiscountField.should('not.exist')

      // does not trigger recalculations for the other fields if companyHourlyRate is changed
      commitmentChangeModal.companyHourlyRateField.clear()
      commitmentChangeModal.companyHourlyRateField.type('180.00')

      checkValues(
        ['180.00', '3320.00', '6640.00', '100.00', '2000.00', '4000.00'],
        false
      )

      closeChangeCommitmentModal()

      // does not trigger recalculations for the other fields if companyPartTimeRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.companyPartTimeRateField.clear()
      commitmentChangeModal.companyPartTimeRateField.type('3600.00')

      checkValues(
        ['166.00', '3600.00', '6640.00', '100.00', '2000.00', '4000.00'],
        false
      )

      closeChangeCommitmentModal()

      // does not trigger recalculations for the other fields if companyFullTimeRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.companyFullTimeRateField.clear()
      commitmentChangeModal.companyFullTimeRateField.type('7200.00')

      checkValues(
        ['166.00', '3320.00', '7200.00', '100.00', '2000.00', '4000.00'],
        false
      )

      closeChangeCommitmentModal()

      // does not trigger recalculations for the other fields if talentHourlyRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.talentHourlyRateField.clear()
      commitmentChangeModal.talentHourlyRateField.type('108.00')

      checkValues(
        ['166.00', '3320.00', '6640.00', '108.00', '2000.00', '4000.00'],
        false
      )

      closeChangeCommitmentModal()

      // does not trigger recalculations for the other fields if talentPartTimeRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.talentPartTimeRateField.clear()
      commitmentChangeModal.talentPartTimeRateField.type('2160.00')

      checkValues(
        ['166.00', '3320.00', '6640.00', '100.00', '2160.00', '4000.00'],
        false
      )

      closeChangeCommitmentModal()

      // does not trigger recalculations for the other fields if talentFullTimeRate is changed
      openChangeCommitmentModal()

      commitmentChangeModal.talentFullTimeRateField.clear()
      commitmentChangeModal.talentFullTimeRateField.type('4320.00')

      checkValues(
        ['166.00', '3320.00', '6640.00', '100.00', '2000.00', '4320.00'],
        false
      )
    })
  })
})
