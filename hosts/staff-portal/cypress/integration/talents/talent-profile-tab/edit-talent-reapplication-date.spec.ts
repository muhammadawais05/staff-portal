import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import { updateEditReapplicationDateStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'

describe('Talent Profile Tab > Reapplication Date', () => {
  const page = new TalentProfilePage()

  const {
    generalSection: { reapplicationDate }
  } = page

  beforeEach(() => {
    updateEditReapplicationDateStubs('2022-06-25')

    page.visit()
  })

  it('edits date', () => {
    reapplicationDate.editButton.click()

    const DATE = '2022-06-27'

    updateEditReapplicationDateStubs(DATE)

    reapplicationDate.nextDate.click()
    reapplicationDate.value.click()

    reapplicationDate.value.should('contain.text', parseAndFormatDate(DATE))
  })
})
