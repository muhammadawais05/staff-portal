import { encodeEntityId } from '@staff-portal/data-layer-service'

import CompanyProfilePage from '~integration/modules/pages/companies'
import { updateClientMatcherMocks } from '~integration/mocks/schema-updates/companies'

// TODO: override the test with the usage of the new mocks
// https://toptal-core.atlassian.net/browse/SPB-3259
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('Matcher', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    internalTeamSection: { matcher }
  } = basicInfoTab

  it('saves successfully and updates the field', () => {
    updateClientMatcherMocks()

    basicInfoTab.visitTab()

    matcher.toggleMatcher()
    matcher.selectMatcher(encodeEntityId('3', 'Staff'))
    matcher.getMatcher().should('have.text', 'Charles Boyle')
  })
})
